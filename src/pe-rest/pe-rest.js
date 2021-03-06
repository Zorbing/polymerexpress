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
const HTTP_PUT = 'PUT';
const request2Deferred = new WeakMap();

let subResources = [];
Polymer({
	is: 'pe-rest'

	, properties: {
		resource: {
			type: String
		}
	}
	, fromServer: {
		address: function (addressObject)
		{
			return addressObject.address;
		}
		, addressList: function (list)
		{
			return this.genericList(list) || list.map(a => this.address(a));
		}
		, company: function (companyObject)
		{
			return companyObject.name;
		}
		, emailAddress: function (emailObject)
		{
			return emailObject.address;
		}
		, emailAddressList: function (list)
		{
			return this.genericList(list) || list.map(e => this.emailAddress(e));
		}
		, genericList: function (list)
		{
			return list.length === 0 ? [''] : undefined;
		}
		, phoneNumber: function (phoneObject)
		{
			return phoneObject.number;
		}
		, phoneNumberList: function (list)
		{
			return this.genericList(list) || list.map(p => this.phoneNumber(p));
		}
	}
	, toServer: {
		address: function (addressString)
		{
			return { address: addressString };
		}
		, addressList: function (list)
		{
			return this.genericList(list) || list.map(a => this.address(a));
		}
		, category: function (categoryId)
		{
			return { id: categoryId };
		}
		, company: function (companyName)
		{
			return { name: companyName };
		}
		, emailAddress: function (emailString)
		{
			return { address: emailString };
		}
		, emailAddressList: function (list)
		{
			return this.genericList(list) || list.map(e => this.emailAddress(e));
		}
		, genericList: function (list)
		{
			return (list.length === 1 && list[0] === '') ? [] : undefined;
		}
		, phoneNumber: function (phoneString)
		{
			return { number: phoneString };
		}
		, phoneNumberList: function (list)
		{
			return this.genericList(list) || list.map(p => this.phoneNumber(p));
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
	, replace: function (updatedResource)
	{
		return this._request(HTTP_PUT, updatedResource);
	}
	, sub: function (resource)
	{
		const subs = subResources.concat([resource]);
		const subHandler = {
			get: function (target, name)
			{
				if (typeof target[name] === 'function')
				{
					return (...args) =>
					{
						subResources = subs;
						const ret = target[name](...args);
						subResources = [];
						return ret;
					};
				}
				return target[name];
			}
		};
		return new Proxy(this, subHandler);
	}
	, update: function (updatedPartialResource)
	{
		return this._request(HTTP_PATCH, updatedPartialResource);
	}



	/**
	 * private methods
	 */

	, _computeUrl: function (subResource)
	{
		const encodedResource = [this.resource]
			.concat(subResources)
			.map(s => encodeURIComponent(s))
			.join('/')
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
	, _request: function (method, body = null)
	{
		const requester = this.$.requester;
		requester.url = this._computeUrl();
		requester.method = method;
		requester.body = body;
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
