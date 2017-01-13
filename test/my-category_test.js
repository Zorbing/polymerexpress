suite('my-category', function()
{
	test('instantiating the element works', function ()
	{
		var element = fixture('basic');
		assert.equal(element.is, 'my-category');
	});
});
