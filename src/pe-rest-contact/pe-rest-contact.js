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

const stubContactList = [
	{}
];

Polymer({
	is: 'pe-rest-contact'

	, properties: {}

	, create: function (name, dateOfBirth, company, adresses, phoneNumbers, emailAdresses)
	{
		return this.$.rest.create({
			name: name
			, dateOfBirth: dateOfBirth
			, company: company
			, adresses: adresses
			, phoneNumbers: phoneNumbers
			, emailAdresses: emailAdresses
		});
	}
	, delete: function (id)
	{
		return this.$.rest.sub(id).delete();
	}
	, edit: function (id, newName, newDateOfBirth, newCompany, newAdresses, newPhoneNumbers, newEmailAdresses)
	{
		return this.$.rest.sub(id).replace({
			name: newName
			, dateOfBirth: newDateOfBirth
			, company: newCompany
			, adresses: newAdresses
			, phoneNumbers: newPhoneNumbers
			, emailAdresses: newEmailAdresses
		});
	}
	, editAdresses: function (id, newAdresses)
	{
		return this.$.rest.sub(id).update({
			adresses: newAdresses
		});
	}
	, editCompany: function (id, newCompany)
	{
		return this.$.rest.sub(id).update({
			company: newCompany
		});
	}
	, editDateOfBirth: function (id, newDateOfBirth)
	{
		return this.$.rest.sub(id).update({
			dateOfBirth: newDateOfBirth
		});
	}
	, editEmailAdresses: function (id, newEmailAdresses)
	{
		return this.$.rest.sub(id).update({
			emailAdresses: newEmailAdresses
		});
	}
	, editName: function (id, newName)
	{
		return this.$.rest.sub(id).update({
			name: newName
		});
	}
	, editPhoneNumbers: function (id, newPhoneNumbers)
	{
		return this.$.rest.sub(id).update({
			phoneNumbers: newPhoneNumbers
		});
	}
	, list: function (testData = true)
	{
		if (testData)
		{
			return Promise.resolve(stubContactList);
		}
		return this.$.rest.read();
	}
});
