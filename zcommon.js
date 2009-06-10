(function($){
$.locationhash = function(val)
{
    return ( val ? ((location.hash = val) && false) : location.hash.replace("#",""));
}

var _toS = Object.prototype.toString,
    _types = {
        'undefined'         : 'undefined',
        'number'            : 'number',
        'boolean'           : 'boolean',
        'string'            : 'string',
        '[object Function]' : 'function',
        '[object RegExp]'   : 'regexp',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object Error]'    : 'error'
    };

// Function name can't be can't be typeof or typeOf because Safari barfs on
// the reserved word use.  Non-IE browsers report the class in the toString
// e.g. '[object HTMLDivElement]', but IE always returns '[object Object]'
$.type = function (o) {
    return _types[typeof o] || _types[_toS.call(o)] || (o?'object':'null');
};

$.empty = function(obj)
{
	var type = typeof obj;
	switch(type){ //number, string, boolean, undefined, object, function
		case 'string':
		return !!$.trim($obj);
		case 'object':
		if($.type(obj) == 'array') return !!obj.length; // array is special!
		default:
		return !!obj;
	}
}

$.ns = function(val, obj)
{
    if(val){
        var nsarr = val.split('.');
        if(nsarr.length > 0){
            var parentSpace = window;
            for(var depth=0; depth< nsarr.length; depth++){
                var name = nsarr[depth];
                if(!parentSpace[name])
                    parentSpace[name] = {};
                parentSpace = parentSpace[name];
            }
        }
        if(obj && $.isObject(obj)){
            $.extend(parentSpace, obj);
        }
    }
}

})(jQuery);

$.ns('Zlib.Common', {
	reloadSeccode: function(){
		var img = $('.seccode');
		$(img).attr('src',"action/seccode.php?"+(+new Date()));
		return false;
	},
	dateToSign: function(date){
		date = date.substr(0,4);
		var signs = ['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊'];
		return signs[+date % 12] || '未知';
	},
	dateToZodiac: function(date){
		date = date.split("-");
		var $year = date[0];
		var $month = date[1];
		var $day  = date[2];
	if ($month < 1 || $month > 12 || $day < 1 || $day > 31)
	return ('未知');

	var $signs = [
		[ "20" , "宝瓶座,sp.gif"],
		[ "19" , "双鱼座,sy.gif"],
		[ "21" , "白羊座,my.gif"],
		[ "20" , "金牛座,jn.gif"],
		[ "21" , "双子座,sz.gif"],
		[ "22" , "巨蟹座,jx.gif"],
		[ "23" , "狮子座,shz.gif"],
		[ "23" , "处女座,cn.gif"],
		[ "23" , "天秤座,tc.gif"],
		[ "24" , "天蝎座,tx.gif"],
		[ "22" , "射手座,ss.gif"],
		[ "22" , "摩羯座,mj.gif"]
	];
	var item = $signs[$month-1];
	if ($day < item[0])
	item = $signs[($month -2 < 0) ? $month = 11: $month -= 2];
	var $result = item[1].split(',');
	return $result[0];
	},
	ver: 'boin'
});