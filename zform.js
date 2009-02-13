/**
 * jquery.zform.js
 * @author Boin
 * @version 0.1
 */
(function($){
	$.debug = function(){
		if(!$.debugMode)return;
		var args   = $.makeArray(arguments),
			  argv   = args.length,
			  mode   = 'info',
			  isDump = args[argv-1] === true ? //mode is Dump
			  				true : //otherwise
			  				(/log|warn|debug|error|info|dir/i.test(args[argv-1]) ? mode=args[argv-1] : false ),
			  con    = window['console'] ? window.console : null,
			  dump   = /*(con && 'dir' in con) ? con['dir'] :*/ $.dump,
			  method = (con && mode in con) ? con[mode] : window.alert;
		$.each(args, function(k, v){
			if(v==mode)return;
			if(isDump && mode!='dir')v=dump(v);
			method(v);
		});
	}

	$.evalJSON = function(data){
		data = $.trim(data);
		try{
			return eval("(" + data + ")");
		}catch(e){
			$.debug(e,'warn');
			throw e;
		}
	}

	$.bindData = function(form, jsonData){
		/*
		if(window.debug){
			var stime, etime;
			console.log((stime = new Date()) + ' -> ' + 'bindData' + ' Start:'+ $.dump(form) + $.dump(jsonData));
		}
		*/
		form = $(form)[0] || [];
		for(var i=0;i<form.length;i++){
			var ele = $(form[i]), k = ele.attr('name'), v = jsonData[k];
			//additional check for jQuery, she need String for text, textarea; Array for select, radio.
			v = /radio|checkbox/.test(ele.attr('type')) ?	$.makeArray( $.isFunction(v.toFixed) ? String(v) : v ) : v;
			if(k && v){
				try{ele.val(v)}catch(e){}
			}
		}
		//if(window.debug)console.log((etime = new Date()) + '->bindData End, cost ' + Math.abs(stime-etime) );
	}

  /**
   * we've hacked jQuery's httpData() function to get chance for Ajax option dataFilter() to handle HttpResponse
   */
	//$._httpData = $.httpData;
	$.httpData = function( xhr, type, filter){
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;
		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
		// Allow a pre-filtering function to sanitize the response
		if( filter )
			data = filter( data, type, xhr );
		// If the type is "script", eval it in global context
		if ( type == "script" )
			jQuery.globalEval( data );
		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			data = eval("(" + data + ")");
		return data;
	}

	$.asyncSubmit = function(f, fn, options){
		//debugger;
		var _opt = options,
				options = {
					//dataType : 'json',
					targetid : 'async-message',
					lock     : 'true',
					message  : 'Processing You Request...'
				};
		f = $(f);if(f.length<1)return;
		$.extend(options, _opt);
		var target = $('#'+options.targetid).length > 0 ?
								 $('#'+options.targetid):
								 $('<div id="async-message" />').insertBefore(f).text(options.message);
		$(':submit', f).attr('title', $(':submit', f).val()).val('Submiting...').attr('disabled', options.lock);

		$.ajax({
		  type: /post/i.test(f.attr('method')) ? 'POST' : 'GET',
		  url : f.attr('action') || window.location.href,
		  data: f.serialize(),
		  global: false,
		  dataType: options.dataType || null,
		  dataFilter: function(data, type, xhr){
		  	var info = $.evalJSON(xhr.getResponseHeader('X-JSON')), o={};
		  	o.info = info;
		  	o.data = $.isFunction(options.dataFilter) ? options.dataFilter(data, type, xhr) : data;
		  	$.debug(o);
				return o;
		  },
		  complete: function(xhr){
		  	$.debug('complete!');
		  	if(options.lock)$(':submit', f).val($(':submit', f).attr('title')).attr('disabled', !options.lock);
		  },
		  success: $.isFunction(fn) ? fn : function(data, st){
		  	//$.debug(this);
		  	target.html('Success, Server returned :' + $.dump(data));
		  },
		  error: function (xhr, st, error) {
			  // 通常 textStatus 和 errorThrown 之中
			  // 只有一个会包含信息
			  this; // 调用本次AJAX请求时传递的options参数
			  target.html('Error: httpstatus:'+ st + '. msg:' + error + '.');
			  if(options.lock)$(':submit', f).val($(':submit', f).attr('title')).attr('disabled', !options.lock);
			},
			complete: function(xhr, data, e) {
				var header = xhr.getAllResponseHeaders();
				debugger;
			}
		});
	}
	$.fn.bindData = function(data){
		return $.bindData(this, data);
	}

	$.fn.asyncSubmit = function(fn, data){
		return $.asyncSubmit(this, fn, data);
	}
})(jQuery);


//auto async form, but exclude forms which contains class "sync";
jQuery(function($){
	var forms = $('form').not('.sync');
	if(forms.length<1)return;
	forms.bind('submit', function(event){
		//debugger;
		var f = $(this), fn = function(){return true}, fname = f.attr('name') || f.attr('id'), ret=false;
		try{fn = eval(fname_+'submit')}catch(e){$.debug('Form "'+ fname +'" dose not have a validator?','warn')};
		if(fn.apply(this)){
			f.asyncSubmit();
		}
		return ret;
	});
});


/**
 * jquery.dump.js
 * @author Torkild Dyvik Olsen
 * @version 1.0
 *
 * A simple debug function to gather information about an object.
 * Returns a nested tree with information.
 *
 */
(function($) {

$.fn.dump = function() {
   return $.dump(this);
}

$.dump = function(object) {
   var recursion = function(obj, level) {
      if(!level) level = 0;
      var dump = '', p = '', t, i;
      for(i = 0; i < level; i++) p += "\t";

      t = type(obj);
      switch(t) {
         case "string":
            return '"' + obj + '"';
            break;
         case "number":
            return obj.toString();
            break;
         case "boolean":
            return obj ? 'true' : 'false';
         case "date":
            return "Date: " + obj.toLocaleString();
         case "array":
            dump += 'Array ( \n';
            $.each(obj, function(k,v) {
               dump += p +'\t' + k + ' => ' + recursion(v, level + 1) + '\n';
            });
            dump += p + ')';
            break;
         case "object":
            dump += 'Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ': ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "jquery":
            dump += 'jQuery Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ' = ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "regexp":
            return "RegExp: " + obj.toString();
         case "error":
            return obj.toString();
         case "document":
         case "domelement":
            dump += 'DOMElement [ \n'
                  + p + '\tnodeName: ' + obj.nodeName + '\n'
                  + p + '\tnodeValue: ' + obj.nodeValue + '\n'
                  + p + '\tinnerHTML: [ \n';
            $.each(obj.childNodes, function(k,v) {
               if(k < 1) var r = 0;
               if(type(v) == "string") {
                  if(v.textContent.match(/[^\s]/)) {
                     dump += p + '\t\t' + (k - (r||0)) + ' = String: ' + trim(v.textContent) + '\n';
                  } else {
                     r--;
                  }
               } else {
                  dump += p + '\t\t' + (k - (r||0)) + ' = ' + recursion(v, level + 2) + '\n';
               }
            });
            dump += p + '\t]\n'
                  + p + ']';
            break;
         case "function":
            var match = obj.toString().match(/^(.*)\(([^\)]*)\)/im);
            match[1] = trim(match[1].replace(new RegExp("[\\s]+", "g"), " "));
            match[2] = trim(match[2].replace(new RegExp("[\\s]+", "g"), " "));
            return match[1] + "(" + match[2] + ")";
         case "window":
         default:
            dump += 'N/A: ' + t;
            break;
      }

      return dump;
   }

   var type = function(obj) {
      var type = typeof(obj);

      if(type != "object") {
         return type;
      }

      switch(obj) {
         case null:
            return 'null';
         case window:
            return 'window';
         case document:
            return 'document';
         case window.event:
            return 'event';
         default:
            break;
      }

      if(obj.jquery) {
         return 'jquery';
      }

      switch(obj.constructor) {
         case Array:
            return 'array';
         case Boolean:
            return 'boolean';
         case Date:
            return 'date';
         case Object:
            return 'object';
         case RegExp:
            return 'regexp';
         case ReferenceError:
         case Error:
            return 'error';
         case null:
         default:
            break;
      }

      switch(obj.nodeType) {
         case 1:
            return 'domelement';
         case 3:
            return 'string';
         case null:
         default:
            break;
      }

      return 'Unknown';
   }

   return recursion(object);
}

function trim(str) {
   return ltrim(rtrim(str));
}

function ltrim(str) {
   return str.replace(new RegExp("^[\\s]+", "g"), "");
}

function rtrim(str) {
   return str.replace(new RegExp("[\\s]+$", "g"), "");
}

})(jQuery);