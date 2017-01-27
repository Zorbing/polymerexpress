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

const categoryModeMap = new WeakMap();
Polymer({
	is: 'pe-category-item'

	, properties: {
		category: {
			type: Object
			, observer: 'categoryChanged'
		}

		, configMode: {
			type: Boolean
			, value: false
			, observer: 'modeChanged'
		}
		, enableFilter: {
			type: Boolean
			, value: true
			, observer: 'filterChanged'
		}
	}
	, observe: {
		'category.color': 'computeColor'
	}


	, handleSendGroupMail: function ()
	{
		this.fire('send-group-mail', this.category);
	}
	, handleDelete: function ()
	{
		this.$.restCategory.delete(this.category.id)
			.then(() => this.fire('delete', this.category))
			.catch((error) =>
			{
				if (error.status == 404)
				{
					this.fire('delete', this.category);
				}
				else
				{
					console.error('error while deleting category %d:', this.category.id, error);
				}
			})
		;
	}
	, handleConfig: function ()
	{
		this.set('configMode', !this.configMode);
		this.computeColor();

		if (!this.configMode)
		{
			this.$.restCategory.edit(this.category.id, this.category.name, this.category.color)
				.then(() => this.fire('edit', this.category))
				// >>> TEST
				.catch(() => this.fire('edit', this.category))
				// <<< TEST
			;
		}
	}

	, ready: function ()
	{
		this.computeColor('initial coloring');
	}
	, computeColor: function(event)
	{
		this.customStyle['--category-color'] = this.category.color;
		this.updateStyles();
	}
	, translateActionButton: function (mode)
	{
		return mode ? 'Save' : 'Edit';
	}
	, filterChanged: function (newValue, oldValue)
	{
		if (oldValue !== undefined)
		{
			this.fire((this.enableFilter ? 'add' : 'remove') + '-filter', this.category);
		}
	}
	, categoryChanged: function (newCategory, oldCategory)
	{
		if (!categoryModeMap.has(this.category))
		{
			this.modeChanged();
		}
		if (oldCategory !== undefined)
		{
			if (newCategory.color !== oldCategory.color)
			{
				this.computeColor('changed category color');
			}
			const modeObj = categoryModeMap.get(this.category);
			this.configMode = modeObj.config;
		}
	}
	, modeChanged: function (newMode, oldMode)
	{
		if (!this.category)
		{
			return;
		}

		categoryModeMap.set(this.category, {
			config: this.configMode
		});
	}


});
