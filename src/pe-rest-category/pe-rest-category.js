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

const categoryResource = 'category';
const colorKeywords = [
	'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue'
	, 'teal', 'aqua', 'orange', 'aliceblue', 'antiquewhite', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond'
	, 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk'
	, 'crimson', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki'
	, 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen'
	, 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue'
	, 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'gainsboro', 'ghostwhite', 'gold'
	, 'goldenrod', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender'
	, 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow'
	, 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue'
	, 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'limegreen', 'linen', 'mediumaquamarine'
	, 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen'
	, 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite'
	, 'oldlace', 'olivedrab', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred'
	, 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon'
	, 'sandybrown', 'seagreen', 'seashell', 'sienna', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow'
	, 'springgreen', 'steelblue', 'tan', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'whitesmoke'
	, 'yellowgreen', 'rebeccapurple'
];
const stubCategoryList = [
	{
		id: 1
		, name: 'Friend'
		, color: 'floralwhite'
	}
	, {
		id: 2
		, name: 'Acquaintances'
		, color: 'lightgoldenrodyellow'
	}
	, {
		id: 3
		, name: 'Family'
		, color: 'ghostwhite'
	}
	, {
		id: 4
		, name: 'Enemies'
		, color: 'darkmagenta'
	}
	, {
		id: 5
		, name: 'School'
		, color: 'darkolivegreen'
	}
	, {
		id: 6
		, name: 'Supplier'
		, color: 'darkorange'
	}
	, {
		id: 7
		, name: 'Business'
		, color: 'dimgray'
	}
	, {
		id: 8
		, name: 'Work'
		, color: 'skyblue'
	}
	, {
		id: 9
		, name: 'Customer'
		, color: 'brown'
	}
	, {
		id: 10
		, name: 'VIP'
		, color: 'darkblue'
	}
];

Polymer({
	is: 'pe-rest-category'

	, properties: {}

	, create: function (name, color)
	{
		const rest = this.$.rest;
		rest.resource = categoryResource;
		return rest.create({
			name: name
			, color: color
		});
	}
	, delete: function (id)
	{
		const rest = this.$.rest;
		rest.resource = categoryResource + '/' + id;
		return rest.delete();
	}
	, edit: function (id, name, color)
	{
		const rest = this.$.rest;
		rest.resource = categoryResource + '/' + id;
		return rest.update({
			name: name
			, color: color
		});
	}
	, getColorKeywords: function ()
	{
		return colorKeywords;
	}
	, list: function (testData = true)
	{
		if (testData)
		{
			return Promise.resolve(stubCategoryList);
		}
		const rest = this.$.rest;
		rest.resource = categoryResource;
		return rest.read();
	}
});
