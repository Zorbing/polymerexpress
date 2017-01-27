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
	is: 'pe-import'

	, properties: {}
	, deferred: {
		resolve: () => {}
		, reject: () => {}
	}

	, importFromJSON: function (json)
	{
		console.log('json:', json);
	}
	, handleUpload: function (event)
	{
		const files = event.target.files;
		if (files.length === 0)
		{
			this.deferred.reject('No file selected');
			return;
		}

		const file = files[0];
		const reader = new FileReader();
		reader.onload = (event) =>
		{
			try
			{
				const json = JSON.parse(event.target.result);
				this.importFromJSON(json);
			}
			catch (error)
			{
				console.error('Error while parsing the files content:', error);
				this.deferred.reject('Error while parsing the files content:' + error);
			}
		};
		reader.onerror = (event) =>
		{
			console.error('Error while reading the file:', event);
			this.deferred.reject('Error while reading the file:' + event);
		};
		reader.readAsText(file);
	}
	, ready: function ()
	{
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob)
		{
			throw new Error('The File APIs are not fully supported in this browser.');
		}
	}
	, upload: function ()
	{
		this.$.file.click();
		return new Promise((resolve, reject) =>
		{
			this.deferred = {
				resolve: resolve
				, reject: reject
			};
		})
	}
});
