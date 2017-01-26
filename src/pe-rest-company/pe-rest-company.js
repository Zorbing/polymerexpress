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

const stubCompanyList = [
	'Gleichner-Bins', 'Lakin and Sons', 'Schmidt Group', 'Quitzon Group', 'Homenick LLC'
	, 'Nikolaus, Shanahan and Kemmer', 'Wunsch-Berge', 'Kohler LLC', 'Yundt-Mohr', 'Hammes, Kreiger and Gorczany'
	, 'Rodriguez-Fritsch', 'Gutmann Inc', 'Brekke, Goodwin and Nikolaus', 'Leannon, Gislason and Doyle'
	, 'Halvorson-Aufderhar', 'Upton-Gutkowski', 'Carter, Gorczany and Stehr', 'Upton-Spencer', 'Mayer LLC'
	, 'Friesen, Jacobi and O\'Kon', 'Will Inc', 'Strosin Group', 'Will Group', 'Lind-Windler'
	, 'Feest, Roberts and Kertzmann', 'Dooley, Howe and Champlin', 'Zulauf-Streich', 'Stiedemann, Lockman and Herman'
	, 'Lowe, Nolan and Conn', 'Bechtelar, Monahan and Murray', 'Stoltenberg, Mohr and Kulas', 'Weimann Inc'
	, 'Hamill-Aufderhar', 'Schuppe-Beer', 'Collier Inc', 'Bergnaum and Sons', 'Shanahan-Ernser', 'Stark-Emard'
	, 'Kemmer, Walter and Mraz', 'Raynor LLC', 'Rath-Morar', 'Mohr, Rath and Armstrong', 'McLaughlin LLC', 'Batz Inc'
	, 'Tremblay-Walsh', 'Kohler, Prosacco and Satterfield', 'Feest Inc', 'Hane-Gislason'
	, 'Botsford, Weimann and Bechtelar', 'Huel Group'
];

Polymer({
	is: 'pe-rest-company'

	, properties: {}

	, list: function (testData = true)
	{
		if (testData)
		{
			return Promise.resolve(stubCompanyList);
		}
		return this.$.rest.read()
			.then((resultList) =>
			{
				return resultList.map((result) =>
				{
					return this.$.rest.fromServer.company(result);
				});
			})
		;
	}
});
