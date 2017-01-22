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

const addressSubPath = 'address';
const emailAdressSubPath = 'email-address';
const phoneNumberSubPath = 'phone-number';
const stubContactList = [
	{}
];



class Contact
{
	constructor(id, rest)
	{
		this.rest = rest.sub(id);
	}



	/**
	 * add
	 */

	addAddress(newAddress)
	{
		return this.rest.sub(addressSubPath).create({
			address: newAddress
		});
	}
	addEmailAddress(newEmailAddress)
	{
		return this.rest.sub(emailAdressSubPath).create({
			emailAddress: newEmailAddress
		});
	}
	addPhoneNumber(contactId, newPhoneNumber)
	{
		return this.rest.sub(phoneNumberSubPath).create({
			phoneNumber: newPhoneNumber
		});
	}



	/**
	 * delete
	 */

	delete()
	{
		return this.rest.delete();
	}
	deleteAddress(addressId)
	{
		return this.rest.sub(addressSubPath).sub(addressId).delete();
	}
	deleteEmailAddress(emailAddressId)
	{
		return this.rest.sub(emailAdressSubPath).sub(emailAddressId).delete();
	}
	deletePhoneNumber(phoneNumberId)
	{
		return this.rest.sub(phoneNumberSubPath).sub(phoneNumberId).delete();
	}



	/**
	 * edit
	 */

	edit(newName, newDateOfBirth, newCompany, newAddresses, newPhoneNumbers, newEmailAddresses)
	{
		return this.rest.replace({
			name: newName
			, dateOfBirth: newDateOfBirth
			, company: newCompany
			, addresses: newAddresses
			, phoneNumbers: newPhoneNumbers
			, emailAddresses: newEmailAddresses
		});
	}
	editAddresses(newAddresses)
	{
		return this.rest.update({
			addresses: newAddresses
		});
	}
	editCompany(newCompany)
	{
		return this.rest.update({
			company: newCompany
		});
	}
	editDateOfBirth(newDateOfBirth)
	{
		return this.rest.update({
			dateOfBirth: newDateOfBirth
		});
	}
	editEmailAddresses(newEmailAddresses)
	{
		return this.rest.update({
			emailAddresses: newEmailAddresses
		});
	}
	editName(newName)
	{
		return this.rest.update({
			name: newName
		});
	}
	editPhoneNumbers(newPhoneNumbers)
	{
		return this.rest.update({
			phoneNumbers: newPhoneNumbers
		});
	}



	/**
	 * get
	 */

	get()
	{
		return this.rest.read();
	}
}

Polymer({
	is: 'pe-rest-contact'

	, properties: {}

	, add: function (name, dateOfBirth, company, addresses = [], phoneNumbers = [], emailAddresses = [])
	{
		return this.$.rest.create({
			name: name
			, dateOfBirth: dateOfBirth
			, company: company
			, addresses: addresses
			, phoneNumbers: phoneNumbers
			, emailAddresses: emailAddresses
		});
	}
	, id: function (contactId)
	{
		return new Contact(contactId, this.$.rest);
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
