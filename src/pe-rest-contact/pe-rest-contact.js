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



class Contact
{
	constructor(id, rest)
	{
		this.rest = rest.sub(id);
		this.fromServer = this.rest.fromServer;
		this.toServer = this.rest.toServer;
	}



	/**
	 * add
	 */

	addAddress(newAddress)
	{
		return this.rest.sub(addressSubPath).create({
			address: this.toServer.address(newAddress)
		});
	}
	addEmailAddress(newEmailAddress)
	{
		return this.rest.sub(emailAdressSubPath).create({
			emailAddress: this.toServer.emailAddress(newEmailAddress)
		});
	}
	addPhoneNumber(contactId, newPhoneNumber)
	{
		return this.rest.sub(phoneNumberSubPath).create({
			phoneNumber: this.toServer.phoneNumber(newPhoneNumber)
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

	edit(newContact)
	{
		return this.rest.replace({
			name: newContact.name
			, dateOfBirth: newContact.dateOfBirth
			, company: this.toServer.company(newContact.company)
			, category: this.toServer.category(newContact.category.id)
			, addresses: this.toServer.addressList(newContact.addresses)
			, phoneNumbers: this.toServer.phoneNumberList(newContact.phoneNumbers)
			, emailAddresses: this.toServer.emailAddressList(newContact.emailAddresses)
		});
	}
	editAddress(addressId, newAddress)
	{
		return this.rest.sub(addressSubPath).sub(addressId).update({
			address: this.toServer.address(newAddress)
		});
	}
	editAddresses(newAddresses)
	{
		return this.rest.update({
			addresses: this.toServer.addressList(newAddresses)
		});
	}
	editCompany(newCompany)
	{
		return this.rest.update({
			company: this.toServer.company(newCompany)
		});
	}
	editDateOfBirth(newDateOfBirth)
	{
		return this.rest.update({
			dateOfBirth: newDateOfBirth
		});
	}
	editEmailAddress(emailAddressId, newEmailAddress)
	{
		return this.rest.sub(emailAdressSubPath).sub(emailAddressId).update({
			emailAddress: this.toServer.emailAddress(newEmailAddress)
		});
	}
	editEmailAddresses(newEmailAddresses)
	{
		return this.rest.update({
			emailAddresses: this.toServer.emailAddressList(newEmailAddresses)
		});
	}
	editName(newName)
	{
		return this.rest.update({
			name: newName
		});
	}
	editPhoneNumber(phoneNumberId, newPhoneNumber)
	{
		return this.rest.sub(phoneNumberSubPath).sub(phoneNumberId).update({
			phoneNumber: this.toServer.phoneNumber(newPhoneNumber)
		});
	}
	editPhoneNumbers(newPhoneNumbers)
	{
		return this.rest.update({
			phoneNumbers: this.toServer.phoneNumberList(newPhoneNumbers)
		});
	}



	/**
	 * get
	 */

	get()
	{
		return this.rest.read()
			.then((result) =>
			{
				result.company = this.fromServer.company(result.company);
				result.addresses = this.fromServer.addressList(result.addresses);
				result.phoneNumbers = this.fromServer.phoneNumberList(result.phoneNumbers);
				result.emailAddresses = this.fromServer.emailAddressList(result.emailAddresses);
				return result;
			})
		;
	}
}

Polymer({
	is: 'pe-rest-contact'

	, properties: {}

	, add: function (name, dateOfBirth, company, categoryId, addresses = [], phoneNumbers = [], emailAddresses = [])
	{
		return this.$.rest.create({
			name: name
			, dateOfBirth: dateOfBirth
			, company: this.$.rest.toServer.company(company)
			, category: this.$.rest.toServer.category(category.id)
			, addresses: this.$.rest.toServer.addressList(addresses)
			, phoneNumbers: this.$.rest.toServer.phoneNumberList(phoneNumbers)
			, emailAddresses: this.$.rest.toServer.emailAddressList(emailAddresses)
		});
	}
	, id: function (contactId)
	{
		return new Contact(contactId, this.$.rest);
	}
	, import: function (contactObject)
	{
		return this.$.rest.create({
			name: contactObject.name
			, dateOfBirth: contactObject.dateOfBirth
			, company: this.$.rest.toServer.company(contactObject.company)
			, category: this.$.rest.toServer.category(contactObject.category)
			, addresses: this.$.rest.toServer.addressList(contactObject.addresses)
			, phoneNumbers: this.$.rest.toServer.phoneNumberList(contactObject.phones)
			, emailAddresses: this.$.rest.toServer.emailAddressList(contactObject.emails)
		});
	}
	, list: function (testData = true)
	{
		if (testData)
		{
			return this.$.stub.getContactList();
		}
		return this.$.rest.read()
			.then(resultList => resultList.map(result => ({
				id: result.id
				, name: result.name
				, dateOfBirth: result.dateOfBirth
				, company: this.$.rest.fromServer.company(result.company)
				, category: result.category
				, addresses: this.$.rest.fromServer.addressList(result.addresses)
				, phoneNumbers: this.$.rest.fromServer.phoneNumberList(result.phoneNumbers)
				, emailAddresses: this.$.rest.fromServer.emailAddressList(result.emailAddresses)
			})))
		;
	}
});
