/**
 * The MIT License (MIT)
 *
 * Copyright 2017 Martin Boekhoff
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

Polymer({
	is: 'pe-contact-list'

	, properties: {
		birthdayFilter: {
			type: Boolean
		}
		, birthdayFilterDays: {
			type: Number
			, value: 10
			, readOnly: true
		}
		, filterCategories: {
			type: Array
		}
		, searchString: {
			type: String
		}
	}
	, listeners: {
		'update': 'handleUpdate'
	}
	, list: []

	, computeFilter: function (str, categoryList, birthday)
	{
		if (birthday)
		{
			return (contact) =>
			{
				const now = new Date();
				const dt = new Date();
				const split = contact.dateOfBirth.split('-');
				if (split.length !== 3)
				{
					return false;
				}
				dt.setDate(parseInt(split[2], 10));
				dt.setMonth(parseInt(split[1], 10) - 1);
				if (dt.getTime() < now.getTime())
				{
					dt.setFullYear(dt.getFullYear()+1);
				}
				return Math.floor((dt.getTime() - now.getTime()) / 1000 / 60 / 60 / 24) <= this.birthdayFilterDays;
			};
		}

		let textSearch = () => true;
		let categoryFilter = () => true;

		if (str)
		{
			// return a filter function for the current search string
			str = str.trim().toLowerCase();
			textSearch = (contact) =>
			{
				return contact.name.toLowerCase().indexOf(str) !== -1 ||
					contact.dateOfBirth.toLowerCase().indexOf(str) !== -1 ||
					contact.company.toLowerCase().indexOf(str) !== -1 ||
					contact.category.color.toLowerCase().indexOf(str) !== -1 ||
					contact.category.name.toLowerCase().indexOf(str) !== -1 ||
					contact.addresses.some(a => a.toLowerCase().indexOf(str) !== -1) ||
					contact.phoneNumbers.some(p => p.toLowerCase().indexOf(str) !== -1) ||
					contact.emailAddresses.some(e => e.toLowerCase().indexOf(str) !== -1)
				;
			};
		}
		if (categoryList.length > 0)
		{
			categoryList = categoryList.map(s => s.name.toLowerCase());
			categoryFilter = (contact) =>
			{
				return categoryList.indexOf(contact.category.name.toLowerCase()) === -1;
			};
		}

		return (contact) => textSearch(contact) && categoryFilter(contact);
	}
	, handleNew: function (event)
	{
		// add new element to list
		this.$.restContact.add('new contact', '1970-2-3', 'ynapmoC', [''], [''], [''])
			.then(() => this.$.restContact.list())
			.then(list => this.set('list', list))
			// >>> TEST
			.catch((error) =>
			{
				if (error.status == 404)
				{
					this.push('list', {
						id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
						, name: 'new contact'
						, dateOfBirth: '1970-2-3'
						, company: 'ynapmoC'
						, category: {
							id: 0
							, color: 'mintcream'
							, name: 'Test'
						}
						, addresses: ['']
						, phoneNumbers: ['']
						, emailAddresses: ['']
					});
				}
			})
			// <<< TEST
		;
	}
	, handleDelete: function (event, contact)
	{
		// remove element from list
		const index = this.list.indexOf(contact);
		if (index !== -1)
		{
			this.splice('list', index, 1);
		}
	}
	, handleEdit: function (event, contact)
	{
		// update some sort filter
		const string = this.get('searchString');
		this.set('searchString', '');
		this.set('searchString', string);
	}
	, handleUpdate: function (event)
	{
		this.$.restContact.list()
			.then(list => this.set('list', list))
		;
	}
	, ready: function ()
	{
		this.handleUpdate();
	}
});
