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
	is: 'pe-contact-card'

	, properties: {
		contact: {
			type: Object
		}
	}
	, restContact: null

	, computeDateOfBirth: function (dateOfBirth)
	{
		const dt = new Date(dateOfBirth * 1e5);
		return dt.toLocaleDateString('en');
	}
	, handleDelete: function ()
	{
		this._showProgressNotifier();
		this.restContact.delete()
			.then(() =>
			{
				this.fire('delete', this.contact);
				this._hideProgressNotifier();
			})
			.catch((error) =>
			{
				if (error.status == 404)
				{
					this.fire('delete', this.contact);
				}
				else
				{
					console.error('error while deleting contact %d:', this.contact.id, error);
				}
				this._hideProgressNotifier();
			})
		;
	}
	, handleEdit: function ()
	{
		this._showProgressNotifier();
		this.restContact.edit(this.contact)
			.then(() =>
			{
				this.fire('edit', this.contact);
				this._hideProgressNotifier();
			})
			.catch((error) =>
			{
				console.error('error while editing contact %d:', this.contact.id, error);
				this._hideProgressNotifier();
			})
		;
	}
	, ready: function ()
	{
		this.restContact = this.$.restContact.id(this.contact.id);
	}



	/**
	 * private functions
	 */

	, _hideProgressNotifier: function ()
	{
		// TODO
		console.warn('TODO: hide progress notifier');
	}
	, _showProgressNotifier: function ()
	{
		// TODO
		console.warn('TODO: show progress notifier');
	}
});
