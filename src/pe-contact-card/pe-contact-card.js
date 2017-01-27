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

const contactModeMap = new WeakMap();
Polymer({
	is: 'pe-contact-card'

	, properties: {
		contact: {
			type: Object
			, observer: 'contactChanged'
		}
		, viewMode:
		{
			type: Boolean,
			value: false
			, observer: 'modeChanged'
		}
		, editMode:
		{
			type: Boolean,
			value: false
			, observer: 'modeChanged'
		}
	}
	, observe: {
		'contact.category.color': 'computeColor'
	}
	, restContact: null

	, handleDelete: function ()
	{
		this.restContact.delete()
			.then(() => this.fire('delete', this.contact))
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
			})
		;
	}
	, handleView: function ()
	{
		this.set('viewMode', !this.viewMode);
	}
	, handleEdit: function ()
	{
		this.set('editMode', !this.editMode);
		this.set('viewMode', true);

		if (!this.editMode)
		{
			this.restContact.edit(this.contact)
				.then(() => this.fire('edit', this.contact))
				// >>> TEST
				.catch(() => this.fire('edit', this.contact))
				// <<< TEST
			;
		}
	}
	, handleLineremove: function (event, whatAndWhere)
	{
		if (this.get(whatAndWhere.arrayName).length > 1)
		{
			this.splice(whatAndWhere.arrayName, whatAndWhere.id, 1);
		}
	}
	, handleNew: function (event)
	{
		let el = event.target;
		if (el.tagName == 'IRON-ICON')
		{
			el = el.parentNode;
		}

		this.push('contact.' + el.dataset.list, '');
		setTimeout(() =>
		{
			this.$$('.' + el.dataset.class + ' fields-phone-number:last-of-type').focus();
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
		this.customStyle['--category-color'] = this.contact.category.color;
		this.updateStyles();
	}
	, contactChanged: function (newContact, oldContact)
	{
		if (!contactModeMap.has(this.contact))
		{
			this.modeChanged();
		}
		if (oldContact !== undefined)
		{
			if (newContact.category.color !== oldContact.category.color)
			{
				this.computeColor('changed contact');
			}
			const modeObj = contactModeMap.get(this.contact);
			this.viewMode = modeObj.view;
			this.editMode = modeObj.edit;
		}
	}
	, modeChanged: function (newMode, oldMode)
	{
		if (!this.contact)
		{
			return;
		}

		contactModeMap.set(this.contact, {
			view: this.viewMode
			, edit: this.editMode
		});
	}
});
