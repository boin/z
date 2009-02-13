/**
 *
 *
 */
(function($){
$.isObject = function(obj)
{
    return obj && obj.constructor && obj.constructor == {}.constructor;
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
    }else{
    }
}

})(jQuery);

$.ns('Apollo.monitor', {
	/* class */
	Monitor : function(title, description, unitClass){
		var uuid = "monitor_"+(new Date()).getTime();
		this.title = title || uuid;
		this.description = description || uuid;
		this.css = unitClass || '';
		this.units = [];
		this.uuid = function(newid){
			if(newid)uuid = newid;
			return uuid;
		};
		this.init = function(){
			//debugger;
			var w=window, d=document, b=d.body;
			this.container = $('<div id="'+ this.uuid() +'" class="group"></div>').data('group', this);
		  this.navbar    = $('<div class="navbar">'+
		  '<a href="javascript:void(0)" onclick="Apollo.monitor.add(event, \''+ this.uuid() +'\')">添加新服务器</a> '+
		  '<a href="javascript:void(0)" onclick="Apollo.monitor.about()">关于监控</a> '+
		  '</div>');
			$(b).append(this.container);
			this.container.append('<h2>'+ this.title +'</h2>');
			this.container.append('<p>'+ this.description +'</p>');
			this.container.append(this.navbar);
		};
		this.addUnit = function(unit){
			var self = this.container, css = this.css, unitWidth;
			if(unit){
				this.units.push(unit);
				unit.container = this;
			}
			$.each(this.units, function(){
				this.render(self, css);
			})
		};
		this.refresh = function(){
			this.addUnit();
		};
		this.removeUnit = function(unit){
			$.map(this.units, function(u){
				return u != unit ? u : null;
			})
			this.refresh();
		}
	},
	Unit: function(title, href, type, id){
		var uuid = 'unit_'+(new Date()).getTime();
		this.uuid = function(newid){
			if(newid)uuid = newid;
			return uuid;
		};
		this.id    = id ? this.uuid(id) : this.uuid();
		this.title = title || this.id;
		this.href  = href || 'about:blank';
		this.type  = type || 'iframe';

		this.render = function(container, css){
			//debugger
			container = container || document.body;
			css = css || '';
			var ele = $('#'+this.id), self = this, width = Math.floor(99 / this.container.units.length);
			if (ele.length > 0)return this.refresh(self, width);
			var wrapper = this.wrapper = $('<div class="unit">').css({width: width+'%'}).
			append($('<h3>'+ this.title +'</h3>')).
			append($('<a href="javascript:void(0)">刷新</a>').
				click(function(){
					self.render(container);
				})
			).append('&nbsp;').append($('<a href="javascript:void(0)">移除</a>').
				click(function(){
					self.remove($(this).parents('div.unit'));
				})
			);
			ele = $('<'+ this.type +' frameborder="0" scrolling="no" border="0"/>');
			ele.addClass(css).attr('id', this.id).attr('title', this.title).attr('src', this.href).appendTo(wrapper);
			wrapper.appendTo(container).show('fast');
		};

		this.refresh = function(ele, width){
			//debugger
			var reqStamp = +new Date(), src, opts;
			ele.wrapper.css({width: width+'%'});
			ele = ele.wrapper.find(this.type).get(0);
			if(!(src = ele && ele.src))return;
			var search = src.split('?');
			var host = search[0];
			search = search[1] || '';
			if(search){
				opts = search.split('&');
				$.map(opts, function(opt){
					if(opt.indexOf('reqStamp')!=-1)
					return 'reqStamp='+reqStamp;
				})
			}else{
				opts = ['reqStamp='+reqStamp];
			}
			ele.src = host + '?' + opts.join('&');
		};

		this.remove = function(ele){
			this.container.removeUnit(this);
			$(ele).remove();
		}
	},
	/* public properties */
	addFrame : null,
	version : '0.1pre',
	/* public functions  */
	add: function(evt, container){
		if(!this.addFrame){
			this.addFrame = this._addUnitFrame.appendTo($(document.body));
		}
		var event = evt || window.event, af = this.addFrame, monitor = $('#'+container);
		if(monitor.length <1)return;
		//debugger
		af.css({'top':evt.pageY,'left':evt.pageX}).show('fast').find("input[name='container']").val(container);
	},
	doAdd: function(aform){
		//debugger
		var unit = new Apollo.monitor.Unit(aform.title.value, aform.href.value, aform.type.value);
		var group = $('#'+aform.container.value);
		group.data('group').addUnit(unit);
	},
	about: function(){
		alert(' Zinfo Watcher \n 新功能持续研发中…… \n Powered by Boin\n Version : '+this.version+'');
	},
	/* String Table */
	_addUnitFrame: $('<div id="addwapper" style="display:none"><form id="addform" action="javascript:void(0)" onsubmit="Apollo.monitor.doAdd(this)"><ul>'+
	'<li>Title: <input name="title" type="text"/></li>'+
	'<li>Href: <input name="href" type="text"/></li>'+
	'<li>Type: <select name="type"><option value="iframe">iframe</option><option value="img">image</option></select></li>'+
	'<li><input type="submit"/><input type="button" value="Close" onclick="$(\'#addwapper\').hide(\'fast\')"/><input name="container" type="hidden" value=""/></li>'+
	'</ul></form></div>')
});