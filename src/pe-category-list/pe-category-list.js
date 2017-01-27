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
	is: 'pe-category-list'

	, properties: {
		list: {
			type: Array
			, value: []
		}
		, contactList: {
			type: Array
			, value: []
		}
	}

	, ready: function ()
	{
		this.$.restCategory.list()
			.then(list => this.set('list', list))
		;
		this.$.restContact.list()
			.then(list => this.set('contactList', list))
		;
	}

	, handleSendGroupMail: function (event, category)
	{
		console.log('dfdf');
		let mailAddresses = [];
		for (let contact of this.contactList)
		{
			if ( (contact.category.id == category.id) && (contact.emailAddresses[0] != '') )
			{
				mailAddresses.push(contact.emailAddresses[0]);
			}
		}
		const yourMessage = 'Hello there! I hope you like the color ' + category.color + ".";
		const subject = 'Hello ' + category.name + ' person!';
		if (mailAddresses.length>0) document.location.href = 'mailto:' + mailAddresses.join('j') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(yourMessage);
	}

	, handleNew: function (event)
	{
		this.$.restCategory.create('new category', 'yellow')
			.then(() => this.$.restCategory.list())
			.then((list) =>
			{
				this.set('list', list);
				this.fire('add', list[list.length - 1]);
			})
			// >>> TEST
			.catch((error) =>
			{
				if (error.status == 404)
				{
					this.push('list', {
						id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
						, name: 'new category'
						, color: 'yellow'
					});
					this.fire('add', this.list[this.list.length - 1]);
				}
			})
			// <<< TEST
		;
	}
	, handleDelete: function (event, category)
	{
		// remove element from list
		const index = this.list.indexOf(category);
		if (index !== -1)
		{
			this.splice('list', index, 1);
		}
	}
});
