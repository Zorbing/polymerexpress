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
	{
		id: 0
		, categoryId: 0
		, name: 'Cond Uctor'
		, dateOfBirth: -8757576
		, company: 'Polybahn'
		, addresses: [
			{
				street: 'Expressweg 15'
				, zip: 4242
				, city: 'Polymer'
			}
		]
		, phoneNumbers: ['+49 41424344']
		, emailAddresses: ['fahr.gast@polymer-express.de']
	}
	, {
		id: 1
		, categoryId: 0
		, name: 'Bernd Schmidt'
		, dateOfBirth: 6932700
		, company: 'ynapmoC'
		, addresses: [
			{
				street: 'Some street 13'
				, zip: 1234
				, city: 'Exampletown'
			}
		]
		, phoneNumbers: ['+223 3223322']
		, emailAddresses: ['mr.smith@timbuktu.ml']
	}
	, {
		id: 2
		, categoryId: 1
		, name: 'Peter Pan'
		, dateOfBirth: 0
		, company: 'Polybahn'
		, addresses: [
			{
				street: 'Direkt'
				, zip: 999
				, city: 'HTML'
			}
			, {
				street: 'A'
				, zip: 234
				, city: 'B'
			}
		]
		, phoneNumbers: ['345678', '98877665423']
		, emailAddresses: ['test@bla.dia', 'star@gate.atlantis']
	}
	, {
		id: 3
		, categoryId: 1
		, name: 'Bob Baumeister'
		, dateOfBirth: 0
		, company: 'Hot Animation Studios'
		, addresses: [
			{
				street: 'Am Bauhof'
				, zip: 3
				, city: 'Bobhausen'
			}
		]
		, phoneNumbers: []
		, emailAddresses: []
	}
	, {
		id: 4
		, categoryId: 1
		, name: 'Giesela Schmidt'
		, dateOfBirth: 0
		, company: 'ynapmoC'
		, addresses: []
		, phoneNumbers: []
		, emailAddresses: []
	}
	, {
		id: 5
		, categoryId: 2
		, name: 'Bernd Brot'
		, dateOfBirth: 0
		, company: 'KiKA-Lounge'
		, addresses: []
		, phoneNumbers: []
		, emailAddresses: []
	}
	, {
		id: 6
		, categoryId: 2
		, name: 'Bibi Range'
		, dateOfBirth: 0
		, company: 'TheirTube'
		, addresses: []
		, phoneNumbers: []
		, emailAddresses: []
	}
	, {
		id: 7
		, categoryId: 3
		, name: 'Womas Tinkler'
		, dateOfBirth: -28382436
		, company: 'SIMI'
		, addresses: []
		, phoneNumbers: []
		, emailAddresses: []
	}
	, {
		id: 8
		, categoryId: 3
		, name: 'Dieter Brooksdandern'
		, dateOfBirth: 0
		, company: 'SIMI'
		, addresses: []
		, phoneNumbers: []
		, emailAddresses: []
	}
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
	editAddress(addressId, newAddress)
	{
		return this.rest.sub(addressSubPath).sub(addressId).update({
			address: newAddress
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
	editEmailAddress(emailAddressId, newEmailAddress)
	{
		return this.rest.sub(emailAdressSubPath).sub(emailAddressId).update({
			emailAddress: newEmailAddress
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
	editPhoneNumber(phoneNumberId, newPhoneNumber)
	{
		return this.rest.sub(phoneNumberSubPath).sub(phoneNumberId).update({
			phoneNumber: newPhoneNumber
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
