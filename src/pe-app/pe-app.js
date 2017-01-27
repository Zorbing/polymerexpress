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
	is: 'pe-app'

	, properties: {
		filterCategories: {
			type: Array
			, value: []
		}
		, searchString: {
			type: String
			, value: ''
		}
		, enableBirthdayFilter: {
			type: Boolean
			, value: false
		}
	}

	, handleSendGroupMail: function (event, category)
	{
		console.error('To-do: Send group mail to category "' + category.name + '"', category);
		const yourMessage = 'Hello there! I hope you like the color ' + category.color + ".";
		const subject = 'Hello ' + category.name + ' person!';
		document.location.href = "mailto:bastianschmeier@gmail.com?subject="
		+ encodeURIComponent(subject)
		+ "&body=" + encodeURIComponent(yourMessage);
	}
	, handleReceiveCategories: function (event, categoriesList)
	{
		this.set('filterCategories', this.get('filterCategories').concat(categoriesList));
	}
	, handleAddFilter: function (event, category)
	{
		const index = this.filterCategories.indexOf(category);
		if (index === -1)
		{
			// set the whole array to trigger the observer
			this.set('filterCategories', this.get('filterCategories').concat([category]));
			console.log(category);
		}
	}
	, handleRemoveFilter: function (event, category)
	{
		const index = this.filterCategories.indexOf(category);
		if (index !== -1)
		{
			// set the whole array to trigger the observer
			const arr = this.get('filterCategories').slice(0);
			arr.splice(index, 1);
			this.set('filterCategories', arr);
		}
	}
});
