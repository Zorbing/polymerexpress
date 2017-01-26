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
		, viewMode:
		{
			type: Boolean,
			value: false
		}
		, editMode:
		{
			type: Boolean,
			value: false
		}
	}
	, restContact: null

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
	, handleView: function ()
	{
		console.info('Switched View Mode');
		this.viewMode = !this.viewMode;
	}
	, handleEdit: function ()
	{
		console.info('Switched Edit Mode');
		this.editMode = !this.editMode;
		this.viewMode = true;

		if (!this.editMode)
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
	}
	, handleLineremove: function (event, whatAndWhere)
	{
		console.info('attempt to delete ID ' + whatAndWhere.id + ' in ' + this.get(whatAndWhere.arrayName).length + '-length array ' + whatAndWhere.arrayName);
		if (this.get(whatAndWhere.arrayName).length > 1)
		{
			this.splice(whatAndWhere.arrayName, whatAndWhere.id, 1);
			console.log('hopefully removed!')
		}
	}
	, handleNew: function (event)
	{
		console.log(event);
		let dataArgs;
		if (event.target.tagName == 'IRON-ICON')
		{
			dataArgs = event.target.parentNode.getAttribute('data-args').split(' ')
		}
		else
		{
			dataArgs = event.target.getAttribute('data-args').split(' ')
		}
		this.push('contact.' + dataArgs[0], '');
		setTimeout(() =>
		{
			this.$$('.' + dataArgs[1] + ' fields-phone-number:last-of-type').focus();
		});
	}
	, ready: function ()
	{
		this.restContact = this.$.restContact.id(this.contact.id);
		this.computeColor('initial coloring');
	}
	, computeClass: function (mode)
	{
		return mode ? 'big-card' : 'small-card';
	}
	, translateActionButton: function (button, mode)
	{
		if (button == 'view')
		{
			return mode ? 'Close' : 'Open';

		}
		else if (button == 'edit')
		{
			return mode ? 'Save' : 'Edit';

		}
		else
		{
			console.error('Translation not available for ' + button);
			return '???';
		}
	}
	, computeColor: function(event)
	{
		console.log(event, this.contact.category.color)
		this.customStyle['--category-color'] = this.contact.category.color;
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
