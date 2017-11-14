Array.prototype.min = function(fun)
{
	return this.reduce((a, b) => fun(a) < fun(b) ? a : b, Math.max());
};

Array.prototype.max = function(fun)
{
	return this.reduce((a, b) => fun(a) > fun(b) ? a : b, Math.min());
};

Array.prototype.any = function(fun)
{
	return this.reduce((a, b) => a || fun(b), false);
};

Array.prototype.all = function(fun)
{
	return this.reduce((a, b) => a && fun(b), true);
};

Array.prototype.sum = function(fun)
{
	return this.reduce((a, b) => a + fun(b), 0);
};

Array.prototype.average = function(fun)
{
	return this.reduce((a, b) => a + fun(b), 0) / this.length;
};

Array.prototype.contains = function(val)
{
	return this.indexOf(val) > -1;
};

Array.prototype.count = function(fun)
{
	return this.filter(fun).length;
};

Array.prototype.distinct = function()
{
	return this.filter((val, index, self) => self.indexOf(val) === index);
};

Array.prototype.except = function(arr)
{
	return this.filter(val => arr.indexOf(val) === -1);
};

Array.prototype.findLast = function(fun)
{
	return this.slice().reverse().find(fun);
};

Array.prototype.groupBy = function(keyFun, valFun, resFun)
{
	return Object.entries(this.reduce((a, b) => 
	{
		var key = keyFun(b);
		if(a[key] == undefined) a[key] = [];
		a[key].push(valFun(b));
		return a;
	}, [])).map(kv => resFun(kv[0], kv[1]));
};

Array.prototype.innerJoin = function(arr, innerKeyFun, outerKeyFun, resFun)
{
	var arr1 = this.map(a => ({key : innerKeyFun(a), val : a}));
	var arr2 = arr.map(a => ({key : outerKeyFun(a), val : a}));
	
	return arr1.reduce((a, b) =>
	{
		arr2.forEach(c =>
		{
			if(b.key == c.key) a.push(resFun(b.val, c.val));
		});
		return a;
	}, []);
};

Array.prototype.leftJoin = function(arr, innerKeyFun, outerKeyFun, resFun)
{
	var arr1 = this.map(a => ({key : innerKeyFun(a), val : a}));
	var arr2 = arr.map(a => ({key : outerKeyFun(a), val : a}));
	
	return arr1.reduce((a, b) =>
	{
		if(!arr2.reduce((c, d) =>
		{
			if(b.key == d.key)
			{
				a.push(resFun(b.val, d.val));
				return true;
			}
			return c || false;
		}, false))
			a.push(resFun(b.val, {}));
		return a;
	}, []);
};

Array.prototype.rightJoin = function(arr, innerKeyFun, outerKeyFun, resFun)
{
	var arr1 = this.map(a => ({key : innerKeyFun(a), val : a}));
	var arr2 = arr.map(a => ({key : outerKeyFun(a), val : a}));
	
	return arr2.reduce((a, b) =>
	{
		if(!arr1.reduce((c, d) =>
		{
			if(b.key == d.key)
			{
				a.push(resFun(d.val, b.val));
				return true;
			}
			return c || false;
		}, false))
			a.push(resFun({}, b.val));
		return a;
	}, []);
};

Array.prototype.crossJoin = function(arr, resFun)
{
	return this.reduce((a, b) =>
	{
		arr.forEach(c => a.push(resFun(b, c)));
		return a;
	}, []);
};

Array.prototype.zip = function(arr, resfun)
{
	return [...Array(Math.min(this.length, arr.length)).keys()].map(i => resfun(this[i], arr[i]));
};

Array.prototype.combinations = function(len)
{
	var comb = [];
	var f = (arr, curr) =>
	{
		if(curr.length == len)
		{
			comb.push(curr);
			return;
		}
		arr.forEach((a, i) =>
		{
			var newArr = arr.slice();
			newArr.splice(i, 1);
			f(newArr, [...curr, arr[i]]);
		});
	}
	f(this, []);
	return comb;
};

Array.range = function(min, max)
{
	return [...Array(max-min).keys()].map(a => a + min);
};

Array.prototype.copy = function()
{
	return this.slice();
};