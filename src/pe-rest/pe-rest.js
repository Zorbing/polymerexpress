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

const apiBase = location.origin;
const HTTP_DELETE = 'DELETE';
const HTTP_GET = 'GET';
const HTTP_PATCH = 'PATCH';
const HTTP_POST = 'POST';
const request2Deferred = new WeakMap();

Polymer({
	is: 'pe-rest'

	, properties: {
		resource: {
			type: String
		}
	}

	, create: function (newResource)
	{
		return this._request(HTTP_POST, newResource);
	}
	, delete: function ()
	{
		return this._request(HTTP_DELETE);
	}
	, read: function ()
	{
		return this._request(HTTP_GET);
	}
	, update: function (updatedResource)
	{
		return this._request(HTTP_PATCH, updatedResource);
	}



	/**
	 * private methods
	 */

	, _computeUrl: function ()
	{
		const encodedResource = this.resource
			.split('/')
			.map(s => encodeURIComponent(s))
			.reduce((p, c) => p + '/' + c)
		;
		return apiBase + '/' + encodedResource;
	}
	, _handleError: function (event, obj)
	{
		const deferred = request2Deferred.get(obj.request);
		if (deferred)
		{
			const error = obj.error;
			const statusCode = error.message.match(/The request failed with status code: (\d+)/);
			if (statusCode)
			{
				error.status = parseInt(statusCode[1], 10);
			}
			deferred.reject(error);
		}
	}
	, _handleResponse: function (event, request)
	{
		const deferred = request2Deferred.get(request);
		if (deferred)
		{
			deferred.resolve(request.response);
		}
	}
	, _request: function (method, params = {})
	{
		const requester = this.$.requester;
		requester.url = this._computeUrl();
		requester.method = method;
		requester.params = params;
		const request = requester.generateRequest();
		return new Promise((resolve, reject) =>
		{
			request2Deferred.set(request, {
				resolve: (value) => resolve(value)
				, reject: (reason) => reject(reason)
			});
		});
	}
});
