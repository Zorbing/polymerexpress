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
	is: 'pe-category-item'

	, properties: {
		category: {
			type: Object
		}

		, configMode:
		{
			type: Boolean,
			value: false
		}
		, enableFilter:
		{
			type: Boolean,
			value: false,
			observer: 'filterChanged'
		}
	}


	, handleDelete: function ()
	{
		this.fire('delete', this.category);
	}

	, handleConfig: function ()
	{
		this.configMode = !this.configMode;
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


});
