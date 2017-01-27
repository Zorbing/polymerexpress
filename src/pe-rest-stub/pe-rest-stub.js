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

const stubCategoryMap = new Map([
	[0, {
		id: 0
		, color: 'mintcream'
		, name: 'Test'
	}]
	, [1, {
		id: 1
		, color: 'deepskyblue'
		, name: 'Coole Leute'
	}]
	, [2, {
		id: 2
		, color: 'forestgreen'
		, name: 'Uncoole Leute'
	}]
	, [3, {
		id: 3
		, color: 'deeppink'
		, name: 'Wer ist das?'
	}]
	, [4, {
		id: 4
		, name: 'Supplier'
		, color: 'darkorange'
	}]
	, [5, {
		id: 5
		, name: 'Business'
		, color: 'dimgray'
	}]
	,  [6, {
		id: 6
		, name: 'Work'
		, color: 'skyblue'
	}]
]);
let stubContactMap = new Map([
	[0, {
		id: 0
		, name: 'Cond Uctor'
		, dateOfBirth: '1942-2-4'
		, company: 'Polybahn'
		, categoryId: 0
		, addresses: ['Expressweg 15, 4242 Polymer']
		, phoneNumbers: ['+49 41424344']
		, emailAddresses: ['fahr.gast@polymer-express.de']
	}]
	, [1, {
		id: 1
		, name: 'Bernd Schmidt'
		, dateOfBirth: '1991-12-21'
		, company: 'ynapmoC'
		, categoryId: 0
		, addresses: ['Some street 13, 1234 Exampletown']
		, phoneNumbers: ['+223 3223322']
		, emailAddresses: ['mr.smith@timbuktu.ml']
	}]
	, [2, {
		id: 2
		, name: 'Peter Pan'
		, dateOfBirth: '1970-2-6'
		, company: 'Polybahn'
		, categoryId: 1
		, addresses: ['Direkt, 999 HTML', 'A, 234 B']
		, phoneNumbers: ['345678', '98877665423']
		, emailAddresses: ['test@bla.dia', 'star@gate.atlantis']
	}]
	, [3, {
		id: 3
		, name: 'Bob Baumeister'
		, dateOfBirth: '1970-2-2'
		, company: 'Hot Animation Studios'
		, categoryId: 1
		, addresses: ['Am Bauhof, 3 Bobhausen']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
	, [4, {
		id: 4
		, name: 'Giesela Schmidt'
		, dateOfBirth: '1970-2-3'
		, company: 'ynapmoC'
		, categoryId: 1
		, addresses: ['']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
	, [5, {
		id: 5
		, name: 'Bernd Brot'
		, dateOfBirth: '1970-2-5'
		, company: 'KiKA-Lounge'
		, categoryId: 2
		, addresses: ['']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
	, [6, {
		id: 6
		, name: 'Bibi Range'
		, dateOfBirth: '1970-2-12'
		, company: 'TheirTube'
		, categoryId: 2
		, addresses: ['']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
	, [7, {
		id: 7
		, name: 'Wilmer Tinkler'
		, dateOfBirth: '1880-2-13'
		, company: 'SIMI'
		, categoryId: 3
		, addresses: ['']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
	, [8, {
		id: 8
		, name: 'Dieter Brooksdandern'
		, dateOfBirth: '1970-2-14'
		, company: 'SIMI'
		, categoryId: 3
		, addresses: ['']
		, phoneNumbers: ['']
		, emailAddresses: ['']
	}]
]);


Polymer({
	is: 'pe-rest-stub'

	, properties: {}

	, getCategoryList: function ()
	{
		return Promise.resolve(Array.from(stubCategoryMap.values()));
	}
	, getContactList: function ()
	{
		return Promise.resolve(
			Array.from(stubContactMap.values()).map((contact) =>
			{
				contact.category = JSON.parse(JSON.stringify(stubCategoryMap.get(contact.categoryId)));
				return contact;
			})
		);
	}
	, getCompanyList: function ()
	{
		const stubCompanyList = new Set();
		for (let contact of stubContactMap.values())
		{
			stubCompanyList.add(contact.company);
		}
		return Promise.resolve(Array.from(stubCompanyList));
	}
});
