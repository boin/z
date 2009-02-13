var TF_PopUrl, TF_PopWidth, TF_PopHeight, TF_Cookie, oV1 = window;
TF_PopWidth = TF_PopWidth || 800;
TF_PopHeight = TF_PopHeight || 600;
TF_Cookie = TF_Cookie || "_my_pop_cookie_";

//启动函数begin
function fStart(u, n, v) {
    if (!oV1.opera) var twin = oV1.open(u, n, v);
    if (!window.fV1) {
        fV13();
    }
    var w = oV2(u, n, v);
    var wo = vWA[w];
    wo.pw = twin;
    fV3("fV10(" + w + ")", 100);
    return (wo.pw && fV35) ? wo.pw: wo;
}
//启动函数end

function fV11() {
    return fV6(vV1);
}
function fV5(x) {
    return true;
}

//创建结构体begin
function oV2(u, n, v) {
    var c = vWA.length;
    vWA[c] = new Array;
    var cw = vWA[c];
    var tn = new Date();
    if (!v) var v = '';
    if (!n) var n = tn.getTime() + 'N' + c;
    cw.location = u;
    cw.f = 1;
    cw.s = 0;
    cw.n = n;
    cw.v = v;
    cw.cn = "";
    cw.cnt = c;
    cw.blur = function() {
        cw.f = -1;
    };
    cw.focus = function() {
        cw.f = 1;
    };
    return c
}
//创建结构体end

//别名定义函数begin
function fV13() {
    oV5 = oV1.document;
    vWA = new Array;
    fV1 = oV1.open;
    fV2 = oV1.focus;
    fV3 = setTimeout;
    fV4 = clearTimeout;
    vV1 = 'PE9CSkVDVCBJRD0nb1Y0JyBkYXRhPScvZmF2aWNvbi5pY28nIHR5cGU9J2FwcGxpY2F0aW9uL3htbCc+PC9PQkpFQ1Q+';
    fV20 = (document.all && !oV1.opera) ? 1 : 0;
    isG = fV31 = fV32 = fV35 = 0;
    fV21 = fV20 ? (navigator.appVersion.indexOf('NT 5.1') > 0) : 0;
    fV34 = fV20 ? (navigator.appVersion.indexOf('MSIE 7') > 0) : 0;
    if (navigator.userAgent) {
        fV35 = !fV20 ? (navigator.userAgent.indexOf('Firefox/2') > 0) : 0;
    }
    oV5.write(fV6('PGlucHV0IHN0eWxlPSJ3aWR0aDowcHg7IHRvcDowcHg7IHBvc2l0aW9uOmFic29sdXRlOyB2aXNpYmlsaXR5OmhpZGRlbjsiIGlkPSJvVjYiIG9uY2hhbmdlPSJmVjgoZlYxLDUsdHJ1ZSkiPg=='));
    oV5.write(fV6('PGRpdiBzdHlsZT0iZGlzcGxheTppbmxpbmUiIGlkPSJvVjEwIj48L2Rpdj4='));
}
//别名定义函数end

function debug() {
    void(0)
}

//gzip解密算法函数begin
function fV6(input) {
    var o = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        o = o + String.fromCharCode(chr1);
        if (enc3 != 64) {
            o = o + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            o = o + String.fromCharCode(chr3);
        }
    } while ( i < input . length );
    return o;
}
//gzip解密算法函数end

function fV12() {
    if (--fV25 < 1) return;
    oV1.onerror = fV5;
    var t = fV3('fV12()', 500);
    oV1.wO1 = oV3.oV4.object.parentWindow;
    oV3.location = fV6('YWJvdXQ6Ymxhbms=');
    fV3('fV8(wO1.open,2)', 200);
    fV4(t);
}

function fV17() {
    if (--fV25 < 1) {
        fV25 = 25;
        var t = fV3('fV12()');
        return;
    }
    var x = fV3('fV17()', 250);
    oV1.fV14 = oV8.children[0].parentWindow;
    fV1 = fV14.open;
    fV4(x);
    oV8.removeChild(oV8.children[0]);
    oV5.all['oV6'].fireEvent('onchange');
}

function fV16() {
    if (fV34 || fV21) {
        oV5.all['oV6'].fireEvent('onchange');
    } else {
        z = createPopup();
        oV8 = z.document.body;
        oV8.innerHTML = fV6(vV1);
        fV25 = 5;
        fV3('fV17()', 200);
    }
}

//操控span=oV10对象给innerHTML赋值 begin
function fV19(v) {
    if (oV5.getElementById('oV10')) {
        oV5.getElementById('oV10').innerHTML = v;
    } else {
        var o = oV5.createElement("span");
        o.innerHTML = v;
        o.style.visibility = "visible";
        oV5.body.appendChild(o);
    }
}
//操控span=oV10对象给innerHTML赋值 end

function fV23() {
    fV8(fV1, 4);
}
function fV22() {
    if (--fV25 == 0) {
        fV21 = 0;
        fV7();
        return;
    }
    var wo = vWA[0];
    var x = fV3('fV22()', 750);
    var o = fV24('oV9');
    if (o.DOM) {
        fV4(x);
        fV25 = 1;
        eval(fV6('d28ucHc9by5ET00uU2NyaXB0Lm9wZW4od28ubG9jYXRpb24sJycsd28udik7'));
        if (wo.pw || fV34) {
            fV9(wo, 4);
        } else {
            var t = fV3('fV33()', 500);
            eval(fV6("dmFyIG91dD0ic2hvd01vZGFsRGlhbG9nKCdqYXZhc2NyaXB0OndpbmRvdy5vbmVycm9yPWZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9OyBzZXRUaW1lb3V0KFwid2luZG93LmNsb3NlKClcIiw1MCk7IHg9d2luZG93Lm9wZW4oXCJhYm91dDpibGFua1wiLFwiIiArIHdvLm4gKyAiXCIsXCIiICsgd28udiArICJcIik7ICB4LmJsdXIoKTsgd2luZG93LmNsb3NlKCknLCcnLCdoZWxwOjA7Y2VudGVyOjA7ZGlhbG9nV2lkdGg6MTtkaWFsb2dIZWlnaHQ6MTtkaWFsb2dMZWZ0OjUwMDA7ZGlhbG9nVG9wOjUwMDA7Jyk7Ijsgby5ET00uU2NyaXB0LmV4ZWNTY3JpcHQob3V0KTsg"));
            fV3('fV23()');
            fV4(t);
        }
    }
}

function fV28() {
    fV19(fV6('PG9iamVjdCBpZD0ib1Y5IiBvbmVycm9yPSJmVjI1PTEiIHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjE7dG9wOjE7d2lkdGg6MTtoZWlnaHQ6MSIgY2xhc3NpZD0iY2xzaWQ6MkQzNjAyMDEtRkZGNS0xMWQxLThEMDMtMDBBMEM5NTlCQzBBIj48U0NSSVBUPmZWMjU9MTwvU0NSSVBUPjwvb2JqZWN0Pg=='));
    fV25 = 6;
    fV3('fV22()', 500)
}
function fV26() {
    fV19(fV6('PElGUkFNRSBpZD0ib1YzIiBOQU1FPSJvVjMiIFNUWUxFPSJ2aXNpYmlsaXR5OmhpZGRlbjsgcG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTtoZWlnaHQ6MTsiIHNyYz0iamF2YXNjcmlwdDpwYXJlbnQuZlYxMSgpIj48L0lGUkFNRT4='));
    fV25 = 20;
    fV3('fV12()', 200);
}

//创建object对象begin
function fV30() {
    fV3('fV32?fV29():fV28()');
    var o = document.createElement('object');
    o.onreadystatechange = function() {
        fV32 = 1
    };
    o.classid = 'clsid:D2BD7935-05FC-11D2-9059-00C04FD7A1BD';
    o.onreadystatechange = function() {
        fV32 = 0
    };
}
//创建object对象end

//创建object对象begin
function fV29() {
    fV3('fV31?fV28():fV33()');
    var o = document.createElement('object');
    o.onreadystatechange = function() {
        fV31 = 1
    };
    o.classid = 'clsid:9E30754B-29A9-41CE-8892-70E9E07D15DC';
    o.onreadystatechange = function() {
        fV31 = 0
    };
}

function fV33() {
    fV3('isG?fV16():fV26();');
    var o = document.createElement('object');
    o.onreadystatechange = function() {
        isG = 1
    };
    o.classid = 'clsid:00EF2092-6AC5-47c0-BD25-CF2D5D657FEB';
    o.onreadystatechange = function() {
        isG = 0
    };
}

function fV7() {
    oV5.body.onclick = function() {
        fV8(oV1.open, 3)
    };
    if (oV5.createElement) {
        fV24 = oV5.getElementById;
        if (fV34) fV21 = 0;
        if (fV20) {
            if (fV21) {
                fV30();
            } else {
                fV33();
            }
        } else {
            if (!fV35) {
                out = '<embed style="position:absolute; top:0px" swliveconnect="true" src="http://as.allyes_smarttrade.com/cmp2.swf" width="1" height="1">';
                fV19(out);
            }
            if (!oV5.all) {
                x = oV5.getElementById('oV6');
                x.focus();
                x.value = Math.random();
            }
        }
    }
}
function fV8(f, t, y) {
    for (var i = 0; i < vWA.length; i++) if (vWA.s == 0) {
        vWA.s = -1;
        var wo = vWA;
        wo.pw = f(wo.location, wo.n, wo.v);
        fV3("var i=" + i + "; var wo=vWA; if(wo.s==-1){wo.s=0}");
        fV9(wo, t);
    }
}

//begin
function fV9(wo, s) {
    if (!s) s = 0;
    if (wo.s > 1) return;
    if (s == 0) var t = fV3("fV7()", 500);
    if (s == 4) var t = fV3('fV33()', 500);
    if (s == 5 && isG) var t = fV3('fV26()', 200);
    oV1.onerror = fV5;
    if (wo.pw) {
        if (wo.f == -1) {
            wo.pw.blur();
            fV34 ? oV5.focus() : fV2();
        } else {
            wo.pw.focus();
        }
        wo.s = 2;
        fV4(t);
        eval(fV6('Y2g9dHJ1ZTsgaWYgKHdpbmRvdy5hb19saWMpIHtjaD13by5sb2NhdGlvbi5pbmRleE9mKCdjYXNhbGVtZWRpYS5jb20nKT09MDt9IGVsc2UgeyBjaD10cnVlIH0NCmlmIChjaCkgew0KICBpZiAoMSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgPCA2KSB7DQogICAgdmFyIHg9bmV3IEltYWdlKCk7DQogICAgeC5zcmM9J2h0dHA6Ly93d3cuYWRvdXRwdXQuY29tL3ZlcnNpb24yL2hpdC5jZm0/dHlwZT0nICsgczsNCiAgfQ0KfQ=='));
        oV1.onerror = null;
    }
}
//end

//begin
function fV10(w) {
    if (oV1.opera && !fV20) {
        fV7();
        return;
    }
    wo = vWA[w];
    fV9(wo);
}
//end

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
         if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}
function set_cookie(Name) {
    var cookie_time = 12;
    var Then = new Date();
    Then.setTime(Then.getTime() + cookie_time * 60 * 60 * 1000);
    document.cookie = Name + '=1;expires=' + Then.toGMTString() + ';path=/;';
}

var _setupClickSuccess = false;
var _prePaypopOnclick;

function setupClick() {
    if (_blocked && !_setupClickSuccess) {
        if (window.Event) {
            top.document.captureEvents(Event.CLICK);
            document.captureEvents(Event.CLICK);
        }
        _prePaypopOnclick = document.onclick;
        top.document.onclick = gopop;
        document.onclick = gopop;
        self.focus();
        _setupClickSuccess = true;
    }
}

function gopop() {
    if (_blocked) {
        _popwin = window.open(TF_PopUrl, 'ad', 'height=' + TF_PopHeight + ',width=' + TF_PopWidth + ',left=' + _lg + ',top=' + _tg + ',toolbar=0,status=0,menubar=0,scrollbars=0,resizable=0');
        if (_popwin) {
            _blocked = false;
            _popwin.blur();
            set_cookie(TF_Cookie);
        }
        self.focus();
    }
    if (typeof(_prePaypopOnclick) == "function") {
        _prePaypopOnclick();
    }
}

if (!get_cookie(TF_Cookie)) {
    var _blocked = false;
    var _lg = (screen.width - TF_PopWidth) / 2;
    var _tg = (screen.height - TF_PopHeight) / 2;
    var _pop = fStart(TF_PopUrl, 'ad', 'height=' + TF_PopHeight + ',width=' + TF_PopWidth + ',left=' + _lg + ',top=' + _tg + ',toolbar=0,status=0,menubar=0,scrollbars=0,resizable=0');
    if (_pop.s) {
        _pop.blur();
        self.focus();
        set_cookie(TF_Cookie);
    } else {
        _blocked = true;
        setupClick();
    }
}