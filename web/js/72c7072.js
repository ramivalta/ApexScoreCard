/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


// Knockout JavaScript library v3.1.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {(function(p){var A=this||(0,eval)("this"),w=A.document,K=A.navigator,t=A.jQuery,C=A.JSON;(function(p){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?p(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],p):p(A.ko={})})(function(z){function G(a,c){return null===a||typeof a in M?a===c:!1}function N(a,c){var d;return function(){d||(d=setTimeout(function(){d=p;a()},c))}}function O(a,c){var d;return function(){clearTimeout(d);d=setTimeout(a,
c)}}function H(b,c,d,e){a.d[b]={init:function(b,h,g,k,l){var n,r;a.ba(function(){var g=a.a.c(h()),k=!d!==!g,s=!r;if(s||c||k!==n)s&&a.ca.fa()&&(r=a.a.lb(a.e.childNodes(b),!0)),k?(s||a.e.U(b,a.a.lb(r)),a.gb(e?e(l,g):l,b)):a.e.da(b),n=k},null,{G:b});return{controlsDescendantBindings:!0}}};a.g.aa[b]=!1;a.e.Q[b]=!0}var a="undefined"!==typeof z?z:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.s=function(a,c,d){a[c]=d};a.version="3.1.0";a.b("version",
a.version);a.a=function(){function b(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}var e={__proto__:[]}instanceof Array,f={},h={};f[K&&/Firefox\/2/i.test(K.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];f.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(f,function(a,b){if(b.length)for(var c=0,
d=b.length;c<d;c++)h[b[c]]=a});var g={propertychange:!0},k=w&&function(){for(var a=3,b=w.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:p}();return{mb:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],r:function(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c],c)},l:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var c=0,d=a.length;c<d;c++)if(a[c]===
b)return c;return-1},hb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d))return a[d];return null},ma:function(b,c){var d=a.a.l(b,c);0<d?b.splice(d,1):0===d&&b.shift()},ib:function(b){b=b||[];for(var c=[],d=0,e=b.length;d<e;d++)0>a.a.l(c,b[d])&&c.push(b[d]);return c},ya:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)c.push(b(a[d],d));return c},la:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c},$:function(a,b){if(b instanceof Array)a.push.apply(a,
b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},Y:function(b,c,d){var e=a.a.l(a.a.Sa(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},na:e,extend:c,ra:d,sa:e?d:c,A:b,Oa:function(a,b){if(!a)return a;var c={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d,a));return c},Fa:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},ec:function(b){b=a.a.R(b);for(var c=w.createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.M(b[d]));return c},lb:function(b,c){for(var d=0,e=b.length,g=[];d<
e;d++){var k=b[d].cloneNode(!0);g.push(c?a.M(k):k)}return g},U:function(b,c){a.a.Fa(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},Bb:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],g=e.parentNode,k=0,h=c.length;k<h;k++)g.insertBefore(c[k],e);k=0;for(h=d.length;k<h;k++)a.removeNode(d[k])}},ea:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.shift();if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)if(a.push(c),
c=c.nextSibling,!c)return;a.push(d)}}return a},Db:function(a,b){7>k?a.setAttribute("selected",b):a.selected=b},ta:function(a){return null===a||a===p?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},oc:function(b,c){for(var d=[],e=(b||"").split(c),g=0,k=e.length;g<k;g++){var h=a.a.ta(e[g]);""!==h&&d.push(h)}return d},kc:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},Sb:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===
a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;return!!a},Ea:function(b){return a.a.Sb(b,b.ownerDocument.documentElement)},eb:function(b){return!!a.a.hb(b,a.a.Ea)},B:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},q:function(b,c,d){var e=k&&g[c];if(!e&&t)t(b).bind(c,d);else if(e||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var h=function(a){d.call(b,a)},f="on"+c;b.attachEvent(f,
h);a.a.u.ja(b,function(){b.detachEvent(f,h)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,d,!1)},ha:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.B(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(t&&!d)t(b).trigger(c);else if("function"==typeof w.createEvent)if("function"==typeof b.dispatchEvent)d=w.createEvent(h[c]||"HTMLEvents"),
d.initEvent(c,!0,!0,A,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.v(b)?b():b},Sa:function(b){return a.v(b)?b.o():b},ua:function(b,c,d){if(c){var e=/\S+/g,g=b.className.match(e)||[];a.a.r(c.match(e),function(b){a.a.Y(g,b,d)});b.className=g.join(" ")}},Xa:function(b,
c){var d=a.a.c(c);if(null===d||d===p)d="";var e=a.e.firstChild(b);!e||3!=e.nodeType||a.e.nextSibling(e)?a.e.U(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.Vb(b)},Cb:function(a,b){a.name=b;if(7>=k)try{a.mergeAttributes(w.createElement("<input name='"+a.name+"'/>"),!1)}catch(c){}},Vb:function(a){9<=k&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},Tb:function(a){if(k){var b=a.style.width;a.style.width=0;a.style.width=b}},ic:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var d=
[],e=b;e<=c;e++)d.push(e);return d},R:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},mc:6===k,nc:7===k,oa:k,ob:function(b,c){for(var d=a.a.R(b.getElementsByTagName("input")).concat(a.a.R(b.getElementsByTagName("textarea"))),e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},g=[],k=d.length-1;0<=k;k--)e(d[k])&&g.push(d[k]);return g},fc:function(b){return"string"==typeof b&&(b=a.a.ta(b))?C&&C.parse?C.parse(b):(new Function("return "+b))():
null},Ya:function(b,c,d){if(!C||!C.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");return C.stringify(a.a.c(b),c,d)},gc:function(c,d,e){e=e||{};var g=e.params||{},k=e.includeFields||this.mb,h=c;if("object"==typeof c&&"form"===a.a.B(c))for(var h=c.action,f=k.length-1;0<=f;f--)for(var u=a.a.ob(c,k[f]),D=u.length-1;0<=D;D--)g[u[D].name]=
u[D].value;d=a.a.c(d);var y=w.createElement("form");y.style.display="none";y.action=h;y.method="post";for(var p in d)c=w.createElement("input"),c.name=p,c.value=a.a.Ya(a.a.c(d[p])),y.appendChild(c);b(g,function(a,b){var c=w.createElement("input");c.name=a;c.value=b;y.appendChild(c)});w.body.appendChild(y);e.submitter?e.submitter(y):y.submit();setTimeout(function(){y.parentNode.removeChild(y)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.r);a.b("utils.arrayFirst",a.a.hb);a.b("utils.arrayFilter",
a.a.la);a.b("utils.arrayGetDistinctValues",a.a.ib);a.b("utils.arrayIndexOf",a.a.l);a.b("utils.arrayMap",a.a.ya);a.b("utils.arrayPushAll",a.a.$);a.b("utils.arrayRemoveItem",a.a.ma);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.mb);a.b("utils.getFormFields",a.a.ob);a.b("utils.peekObservable",a.a.Sa);a.b("utils.postJson",a.a.gc);a.b("utils.parseJson",a.a.fc);a.b("utils.registerEventHandler",a.a.q);a.b("utils.stringifyJson",a.a.Ya);a.b("utils.range",a.a.ic);a.b("utils.toggleDomNodeCssClass",
a.a.ua);a.b("utils.triggerEvent",a.a.ha);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.A);a.b("utils.addOrRemoveItem",a.a.Y);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this,d=Array.prototype.slice.call(arguments);a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){function a(b,h){var g=b[d];if(!g||"null"===g||!e[g]){if(!h)return p;g=b[d]="ko"+c++;e[g]={}}return e[g]}
var c=0,d="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===p?p:e[d]},set:function(c,d,e){if(e!==p||a(c,!1)!==p)a(c,!0)[d]=e},clear:function(a){var b=a[d];return b?(delete e[b],a[d]=null,!0):!1},L:function(){return c++ +d}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.u=new function(){function b(b,c){var e=a.a.f.get(b,d);e===p&&c&&(e=[],a.a.f.set(b,d,e));return e}function c(d){var e=b(d,!1);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](d);
a.a.f.clear(d);a.a.u.cleanExternalData(d);if(f[d.nodeType])for(e=d.firstChild;d=e;)e=d.nextSibling,8===d.nodeType&&c(d)}var d=a.a.f.L(),e={1:!0,8:!0,9:!0},f={1:!0,9:!0};return{ja:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},Ab:function(c,e){var k=b(c,!1);k&&(a.a.ma(k,e),0==k.length&&a.a.f.set(c,d,p))},M:function(b){if(e[b.nodeType]&&(c(b),f[b.nodeType])){var d=[];a.a.$(d,b.getElementsByTagName("*"));for(var k=0,l=d.length;k<l;k++)c(d[k])}return b},
removeNode:function(b){a.M(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){t&&"function"==typeof t.cleanData&&t.cleanData([a])}}};a.M=a.a.u.M;a.removeNode=a.a.u.removeNode;a.b("cleanNode",a.M);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.u);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.u.ja);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.u.Ab);(function(){a.a.Qa=function(b){var c;if(t)if(t.parseHTML)c=t.parseHTML(b)||[];else{if((c=t.clean([b]))&&
c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var d=a.a.ta(b).toLowerCase();c=w.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof A.innerShiv?c.appendChild(A.innerShiv(b)):
c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.R(c.lastChild.childNodes)}return c};a.a.Va=function(b,c){a.a.Fa(b);c=a.a.c(c);if(null!==c&&c!==p)if("string"!=typeof c&&(c=c.toString()),t)t(b).html(c);else for(var d=a.a.Qa(c),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.Qa);a.b("utils.setHtml",a.a.Va);a.w=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.w.xb(c.nodeValue);null!=f&&e.push({Rb:c,cc:f})}else if(1==c.nodeType)for(var f=0,h=c.childNodes,g=h.length;f<g;f++)b(h[f],
e)}var c={};return{Na:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},Hb:function(a,b){var f=c[a];if(f===p)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),!0}finally{delete c[a]}},Ib:function(c,e){var f=
[];b(c,f);for(var h=0,g=f.length;h<g;h++){var k=f[h].Rb,l=[k];e&&a.a.$(l,e);a.w.Hb(f[h].cc,l);k.nodeValue="";k.parentNode&&k.parentNode.removeChild(k)}},xb:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.w);a.b("memoization.memoize",a.w.Na);a.b("memoization.unmemoize",a.w.Hb);a.b("memoization.parseMemoText",a.w.xb);a.b("memoization.unmemoizeDomNodeAndDescendants",a.w.Ib);a.Ga={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.h({read:b,write:function(a){clearTimeout(d);
d=setTimeout(function(){b(a)},c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);f="notifyWhenChangesStop"==e?O:N;a.Ma(function(a){return f(a,d)})},notify:function(a,c){a.equalityComparer="always"==c?null:G}};var M={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.Ga);a.Fb=function(b,c,d){this.target=b;this.za=c;this.Qb=d;this.sb=!1;a.s(this,"dispose",this.F)};a.Fb.prototype.F=function(){this.sb=!0;this.Qb()};a.N=function(){a.a.sa(this,a.N.fn);this.H=
{}};var F="change";z={V:function(b,c,d){var e=this;d=d||F;var f=new a.Fb(e,c?b.bind(c):b,function(){a.a.ma(e.H[d],f)});e.o&&e.o();e.H[d]||(e.H[d]=[]);e.H[d].push(f);return f},notifySubscribers:function(b,c){c=c||F;if(this.qb(c))try{a.k.jb();for(var d=this.H[c].slice(0),e=0,f;f=d[e];++e)f.sb||f.za(b)}finally{a.k.end()}},Ma:function(b){var c=this,d=a.v(c),e,f,h;c.ia||(c.ia=c.notifySubscribers,c.notifySubscribers=function(a,b){b&&b!==F?"beforeChange"===b?c.bb(a):c.ia(a,b):c.cb(a)});var g=b(function(){d&&
h===c&&(h=c());e=!1;c.Ka(f,h)&&c.ia(f=h)});c.cb=function(a){e=!0;h=a;g()};c.bb=function(a){e||(f=a,c.ia(a,"beforeChange"))}},qb:function(a){return this.H[a]&&this.H[a].length},Wb:function(){var b=0;a.a.A(this.H,function(a,d){b+=d.length});return b},Ka:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},extend:function(b){var c=this;b&&a.a.A(b,function(b,e){var f=a.Ga[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.s(z,"subscribe",z.V);a.s(z,"extend",z.extend);a.s(z,"getSubscriptionsCount",
z.Wb);a.a.na&&a.a.ra(z,Function.prototype);a.N.fn=z;a.tb=function(a){return null!=a&&"function"==typeof a.V&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.N);a.b("isSubscribable",a.tb);a.ca=a.k=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{jb:b,end:c,zb:function(b){if(e){if(!a.tb(b))throw Error("Only subscribable things can act as dependencies");e.za(b,b.Kb||(b.Kb=++f))}},t:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},fa:function(){if(e)return e.ba.fa()},
pa:function(){if(e)return e.pa}}}();a.b("computedContext",a.ca);a.b("computedContext.getDependenciesCount",a.ca.fa);a.b("computedContext.isInitial",a.ca.pa);a.m=function(b){function c(){if(0<arguments.length)return c.Ka(d,arguments[0])&&(c.P(),d=arguments[0],c.O()),this;a.k.zb(c);return d}var d=b;a.N.call(c);a.a.sa(c,a.m.fn);c.o=function(){return d};c.O=function(){c.notifySubscribers(d)};c.P=function(){c.notifySubscribers(d,"beforeChange")};a.s(c,"peek",c.o);a.s(c,"valueHasMutated",c.O);a.s(c,"valueWillMutate",
c.P);return c};a.m.fn={equalityComparer:G};var E=a.m.hc="__ko_proto__";a.m.fn[E]=a.m;a.a.na&&a.a.ra(a.m.fn,a.N.fn);a.Ha=function(b,c){return null===b||b===p||b[E]===p?!1:b[E]===c?!0:a.Ha(b[E],c)};a.v=function(b){return a.Ha(b,a.m)};a.ub=function(b){return"function"==typeof b&&b[E]===a.m||"function"==typeof b&&b[E]===a.h&&b.Yb?!0:!1};a.b("observable",a.m);a.b("isObservable",a.v);a.b("isWriteableObservable",a.ub);a.T=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
b=a.m(b);a.a.sa(b,a.T.fn);return b.extend({trackArrayChanges:!0})};a.T.fn={remove:function(b){for(var c=this.o(),d=[],e="function"!=typeof b||a.v(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var h=c[f];e(h)&&(0===d.length&&this.P(),d.push(h),c.splice(f,1),f--)}d.length&&this.O();return d},removeAll:function(b){if(b===p){var c=this.o(),d=c.slice(0);this.P();c.splice(0,c.length);this.O();return d}return b?this.remove(function(c){return 0<=a.a.l(b,c)}):[]},destroy:function(b){var c=this.o(),d=
"function"!=typeof b||a.v(b)?function(a){return a===b}:b;this.P();for(var e=c.length-1;0<=e;e--)d(c[e])&&(c[e]._destroy=!0);this.O()},destroyAll:function(b){return b===p?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.l(b,c)}):[]},indexOf:function(b){var c=this();return a.a.l(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.P(),this.o()[d]=c,this.O())}};a.a.r("pop push reverse shift sort splice unshift".split(" "),function(b){a.T.fn[b]=function(){var a=this.o();
this.P();this.kb(a,b,arguments);a=a[b].apply(a,arguments);this.O();return a}});a.a.r(["slice"],function(b){a.T.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.a.na&&a.a.ra(a.T.fn,a.m.fn);a.b("observableArray",a.T);var I="arrayChange";a.Ga.trackArrayChanges=function(b){function c(){if(!d){d=!0;var c=b.notifySubscribers;b.notifySubscribers=function(a,b){b&&b!==F||++f;return c.apply(this,arguments)};var k=[].concat(b.o()||[]);e=null;b.V(function(c){c=[].concat(c||[]);if(b.qb(I)){var d;
if(!e||1<f)e=a.a.Aa(k,c,{sparse:!0});d=e;d.length&&b.notifySubscribers(d,I)}k=c;e=null;f=0})}}if(!b.kb){var d=!1,e=null,f=0,h=b.V;b.V=b.subscribe=function(a,b,d){d===I&&c();return h.apply(this,arguments)};b.kb=function(b,c,l){function h(a,b,c){return r[r.length]={status:a,value:b,index:c}}if(d&&!f){var r=[],m=b.length,q=l.length,s=0;switch(c){case "push":s=m;case "unshift":for(c=0;c<q;c++)h("added",l[c],s+c);break;case "pop":s=m-1;case "shift":m&&h("deleted",b[s],s);break;case "splice":c=Math.min(Math.max(0,
0>l[0]?m+l[0]:l[0]),m);for(var m=1===q?m:Math.min(c+(l[1]||0),m),q=c+q-2,s=Math.max(m,q),B=[],u=[],D=2;c<s;++c,++D)c<m&&u.push(h("deleted",b[c],c)),c<q&&B.push(h("added",l[D],c));a.a.nb(u,B);break;default:return}e=r}}}};a.ba=a.h=function(b,c,d){function e(){q=!0;a.a.A(v,function(a,b){b.F()});v={};x=0;n=!1}function f(){var a=g.throttleEvaluation;a&&0<=a?(clearTimeout(t),t=setTimeout(h,a)):g.wa?g.wa():h()}function h(){if(!r&&!q){if(y&&y()){if(!m){p();return}}else m=!1;r=!0;try{var b=v,d=x;a.k.jb({za:function(a,
c){q||(d&&b[c]?(v[c]=b[c],++x,delete b[c],--d):v[c]||(v[c]=a.V(f),++x))},ba:g,pa:!x});v={};x=0;try{var e=c?s.call(c):s()}finally{a.k.end(),d&&a.a.A(b,function(a,b){b.F()}),n=!1}g.Ka(l,e)&&(g.notifySubscribers(l,"beforeChange"),l=e,g.wa&&!g.throttleEvaluation||g.notifySubscribers(l))}finally{r=!1}x||p()}}function g(){if(0<arguments.length){if("function"===typeof B)B.apply(c,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
return this}n&&h();a.k.zb(g);return l}function k(){return n||0<x}var l,n=!0,r=!1,m=!1,q=!1,s=b;s&&"object"==typeof s?(d=s,s=d.read):(d=d||{},s||(s=d.read));if("function"!=typeof s)throw Error("Pass a function that returns the value of the ko.computed");var B=d.write,u=d.disposeWhenNodeIsRemoved||d.G||null,D=d.disposeWhen||d.Da,y=D,p=e,v={},x=0,t=null;c||(c=d.owner);a.N.call(g);a.a.sa(g,a.h.fn);g.o=function(){n&&!x&&h();return l};g.fa=function(){return x};g.Yb="function"===typeof d.write;g.F=function(){p()};
g.ga=k;var w=g.Ma;g.Ma=function(a){w.call(g,a);g.wa=function(){g.bb(l);n=!0;g.cb(g)}};a.s(g,"peek",g.o);a.s(g,"dispose",g.F);a.s(g,"isActive",g.ga);a.s(g,"getDependenciesCount",g.fa);u&&(m=!0,u.nodeType&&(y=function(){return!a.a.Ea(u)||D&&D()}));!0!==d.deferEvaluation&&h();u&&k()&&u.nodeType&&(p=function(){a.a.u.Ab(u,p);e()},a.a.u.ja(u,p));return g};a.$b=function(b){return a.Ha(b,a.h)};z=a.m.hc;a.h[z]=a.m;a.h.fn={equalityComparer:G};a.h.fn[z]=a.h;a.a.na&&a.a.ra(a.h.fn,a.N.fn);a.b("dependentObservable",
a.h);a.b("computed",a.h);a.b("isComputed",a.$b);(function(){function b(a,f,h){h=h||new d;a=f(a);if("object"!=typeof a||null===a||a===p||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var g=a instanceof Array?[]:{};h.save(a,g);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":g[c]=d;break;case "object":case "undefined":var n=h.get(d);g[c]=n!==p?n:b(d,f,h)}});return g}function c(a,b){if(a instanceof Array){for(var c=
0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.ab=[]}a.Gb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.v(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.Gb(b);return a.a.Ya(b,c,d)};d.prototype={save:function(b,c){var d=a.a.l(this.keys,b);0<=d?this.ab[d]=c:(this.keys.push(b),this.ab.push(c))},get:function(b){b=a.a.l(this.keys,
b);return 0<=b?this.ab[b]:p}}})();a.b("toJS",a.Gb);a.b("toJSON",a.toJSON);(function(){a.i={p:function(b){switch(a.a.B(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?a.a.f.get(b,a.d.options.Pa):7>=a.a.oa?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.i.p(b.options[b.selectedIndex]):p;default:return b.value}},X:function(b,c,d){switch(a.a.B(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.d.options.Pa,
p);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.d.options.Pa,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===typeof c?c:""}break;case "select":if(""===c||null===c)c=p;for(var e=-1,f=0,h=b.options.length,g;f<h;++f)if(g=a.i.p(b.options[f]),g==c||""==g&&c===p){e=f;break}if(d||0<=e||c===p&&1<b.size)b.selectedIndex=e;break;default:if(null===c||c===p)c="";b.value=c}}}})();a.b("selectExtensions",a.i);a.b("selectExtensions.readValue",
a.i.p);a.b("selectExtensions.writeValue",a.i.X);a.g=function(){function b(b){b=a.a.ta(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=[],d=b.match(e),g,m,q=0;if(d){d.push(",");for(var s=0,B;B=d[s];++s){var u=B.charCodeAt(0);if(44===u){if(0>=q){g&&c.push(m?{key:g,value:m.join("")}:{unknown:g});g=m=q=0;continue}}else if(58===u){if(!m)continue}else if(47===u&&s&&1<B.length)(u=d[s-1].match(f))&&!h[u[0]]&&(b=b.substr(b.indexOf(B)+1),d=b.match(e),d.push(","),s=-1,B="/");else if(40===u||123===u||91===
u)++q;else if(41===u||125===u||93===u)--q;else if(!g&&!m){g=34===u||39===u?B.slice(1,-1):B;continue}m?m.push(B):m=[B]}}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,h={"in":1,"return":1,"typeof":1},g={};return{aa:[],W:g,Ra:b,qa:function(e,l){function f(b,e){var l,k=a.getBindingHandler(b);
if(k&&k.preprocess?e=k.preprocess(e,b,f):1){if(k=g[b])l=e,0<=a.a.l(c,l)?l=!1:(k=l.match(d),l=null===k?!1:k[1]?"Object("+k[1]+")"+k[2]:l),k=l;k&&m.push("'"+b+"':function(_z){"+l+"=_z}");q&&(e="function(){return "+e+" }");h.push("'"+b+"':"+e)}}l=l||{};var h=[],m=[],q=l.valueAccessors,s="string"===typeof e?b(e):e;a.a.r(s,function(a){f(a.key||a.unknown,a.value)});m.length&&f("_ko_property_writers","{"+m.join(",")+" }");return h.join(",")},bc:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;
return!1},va:function(b,c,d,e,g){if(b&&a.v(b))!a.ub(b)||g&&b.o()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.g);a.b("expressionRewriting.bindingRewriteValidators",a.g.aa);a.b("expressionRewriting.parseObjectLiteral",a.g.Ra);a.b("expressionRewriting.preProcessBindings",a.g.qa);a.b("expressionRewriting._twoWayBindings",a.g.W);a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.g.qa);(function(){function b(a){return 8==
a.nodeType&&h.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function d(a,d){for(var e=a,g=1,k=[];e=e.nextSibling;){if(c(e)&&(g--,0===g))return k;k.push(e);b(e)&&g++}if(!d)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=w&&"\x3c!--test--\x3e"===w.createComment("test").text,h=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,
g=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,k={ul:!0,ol:!0};a.e={Q:{},childNodes:function(a){return b(a)?d(a):a.childNodes},da:function(c){if(b(c)){c=a.e.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.Fa(c)},U:function(c,d){if(b(c)){a.e.da(c);for(var e=c.nextSibling,g=0,k=d.length;g<k;g++)e.parentNode.insertBefore(d[g],e)}else a.a.U(c,d)},yb:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},rb:function(c,
d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):c.appendChild(d):a.e.yb(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},Xb:b,lc:function(a){return(a=(f?a.text:a.nodeValue).match(h))?a[1]:null},wb:function(d){if(k[a.a.B(d)]){var g=d.firstChild;if(g){do if(1===g.nodeType){var f;f=g.firstChild;
var h=null;if(f){do if(h)h.push(f);else if(b(f)){var q=e(f,!0);q?f=q:h=[f]}else c(f)&&(h=[f]);while(f=f.nextSibling)}if(f=h)for(h=g.nextSibling,q=0;q<f.length;q++)h?d.insertBefore(f[q],h):d.appendChild(f[q])}while(g=g.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.Q);a.b("virtualElements.emptyNode",a.e.da);a.b("virtualElements.insertAfter",a.e.rb);a.b("virtualElements.prepend",a.e.yb);a.b("virtualElements.setDomNodeChildren",a.e.U);(function(){a.J=function(){this.Nb=
{}};a.a.extend(a.J.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=b.getAttribute("data-bind");case 8:return a.e.Xb(b);default:return!1}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a):null},getBindingAccessors:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a,{valueAccessors:!0}):null},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");
case 8:return a.e.lc(b);default:return null}},parseBindingsString:function(b,c,d,e){try{var f=this.Nb,h=b+(e&&e.valueAccessors||""),g;if(!(g=f[h])){var k,l="with($context){with($data||{}){return{"+a.g.qa(b,e)+"}}}";k=new Function("$context","$element",l);g=f[h]=k}return g(c,d)}catch(n){throw n.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+n.message,n;}}});a.J.instance=new a.J})();a.b("bindingProvider",a.J);(function(){function b(a){return function(){return a}}function c(a){return a()}
function d(b){return a.a.Oa(a.k.t(b),function(a,c){return function(){return b()[c]}})}function e(a,b){return d(this.getBindings.bind(this,a,b))}function f(b,c,d){var e,g=a.e.firstChild(c),k=a.J.instance,f=k.preprocessNode;if(f){for(;e=g;)g=a.e.nextSibling(e),f.call(k,e);g=a.e.firstChild(c)}for(;e=g;)g=a.e.nextSibling(e),h(b,e,d)}function h(b,c,d){var e=!0,g=1===c.nodeType;g&&a.e.wb(c);if(g&&d||a.J.instance.nodeHasBindings(c))e=k(c,null,b,d).shouldBindDescendants;e&&!n[a.a.B(c)]&&f(b,c,!g)}function g(b){var c=
[],d={},e=[];a.a.A(b,function y(g){if(!d[g]){var k=a.getBindingHandler(g);k&&(k.after&&(e.push(g),a.a.r(k.after,function(c){if(b[c]){if(-1!==a.a.l(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));y(c)}}),e.length--),c.push({key:g,pb:k}));d[g]=!0}});return c}function k(b,d,k,f){var h=a.a.f.get(b,r);if(!d){if(h)throw Error("You cannot apply bindings multiple times to the same element.");a.a.f.set(b,r,!0)}!h&&f&&a.Eb(b,k);var l;if(d&&"function"!==
typeof d)l=d;else{var n=a.J.instance,m=n.getBindingAccessors||e,x=a.h(function(){(l=d?d(k,b):m.call(n,b,k))&&k.D&&k.D();return l},null,{G:b});l&&x.ga()||(x=null)}var t;if(l){var w=x?function(a){return function(){return c(x()[a])}}:function(a){return l[a]},z=function(){return a.a.Oa(x?x():l,c)};z.get=function(a){return l[a]&&c(w(a))};z.has=function(a){return a in l};f=g(l);a.a.r(f,function(c){var d=c.pb.init,e=c.pb.update,g=c.key;if(8===b.nodeType&&!a.e.Q[g])throw Error("The binding '"+g+"' cannot be used with virtual elements");
try{"function"==typeof d&&a.k.t(function(){var a=d(b,w(g),z,k.$data,k);if(a&&a.controlsDescendantBindings){if(t!==p)throw Error("Multiple bindings ("+t+" and "+g+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");t=g}}),"function"==typeof e&&a.h(function(){e(b,w(g),z,k.$data,k)},null,{G:b})}catch(f){throw f.message='Unable to process binding "'+g+": "+l[g]+'"\nMessage: '+f.message,f;}})}return{shouldBindDescendants:t===p}}
function l(b){return b&&b instanceof a.I?b:new a.I(b)}a.d={};var n={script:!0};a.getBindingHandler=function(b){return a.d[b]};a.I=function(b,c,d,e){var g=this,k="function"==typeof b&&!a.v(b),f,h=a.h(function(){var f=k?b():b,l=a.a.c(f);c?(c.D&&c.D(),a.a.extend(g,c),h&&(g.D=h)):(g.$parents=[],g.$root=l,g.ko=a);g.$rawData=f;g.$data=l;d&&(g[d]=l);e&&e(g,c,l);return g.$data},null,{Da:function(){return f&&!a.a.eb(f)},G:!0});h.ga()&&(g.D=h,h.equalityComparer=null,f=[],h.Jb=function(b){f.push(b);a.a.u.ja(b,
function(b){a.a.ma(f,b);f.length||(h.F(),g.D=h=p)})})};a.I.prototype.createChildContext=function(b,c,d){return new a.I(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.I.prototype.extend=function(b){return new a.I(this.D||this.$data,this,null,function(c,d){c.$rawData=d.$rawData;a.a.extend(c,"function"==typeof b?b():b)})};var r=a.a.f.L(),m=a.a.f.L();a.Eb=function(b,c){if(2==arguments.length)a.a.f.set(b,m,c),
c.D&&c.D.Jb(b);else return a.a.f.get(b,m)};a.xa=function(b,c,d){1===b.nodeType&&a.e.wb(b);return k(b,c,l(d),!0)};a.Lb=function(c,e,g){g=l(g);return a.xa(c,"function"===typeof e?d(e.bind(null,g,c)):a.a.Oa(e,b),g)};a.gb=function(a,b){1!==b.nodeType&&8!==b.nodeType||f(l(a),b,!0)};a.fb=function(a,b){!t&&A.jQuery&&(t=A.jQuery);if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||A.document.body;h(l(a),
b,!0)};a.Ca=function(b){switch(b.nodeType){case 1:case 8:var c=a.Eb(b);if(c)return c;if(b.parentNode)return a.Ca(b.parentNode)}return p};a.Pb=function(b){return(b=a.Ca(b))?b.$data:p};a.b("bindingHandlers",a.d);a.b("applyBindings",a.fb);a.b("applyBindingsToDescendants",a.gb);a.b("applyBindingAccessorsToNode",a.xa);a.b("applyBindingsToNode",a.Lb);a.b("contextFor",a.Ca);a.b("dataFor",a.Pb)})();var L={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.A(d,function(c,
d){d=a.a.c(d);var h=!1===d||null===d||d===p;h&&b.removeAttribute(c);8>=a.a.oa&&c in L?(c=L[c],h?b.removeAttribute(c):b[c]=d):h||b.setAttribute(c,d.toString());"name"===c&&a.a.Cb(b,h?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,c,d){function e(){return d.has("checkedValue")?a.a.c(d.get("checkedValue")):b.value}function f(){var g=b.checked,f=r?e():g;if(!a.ca.pa()&&(!k||g)){var h=a.k.t(c);l?n!==f?(g&&(a.a.Y(h,f,!0),a.a.Y(h,n,!1)),n=f):a.a.Y(h,f,g):a.g.va(h,d,"checked",
f,!0)}}function h(){var d=a.a.c(c());b.checked=l?0<=a.a.l(d,e()):g?d:e()===d}var g="checkbox"==b.type,k="radio"==b.type;if(g||k){var l=g&&a.a.c(c())instanceof Array,n=l?e():p,r=k||l;k&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.ba(f,null,{G:b});a.a.q(b,"click",f);a.ba(h,null,{G:b})}}};a.g.W.checked=!0;a.d.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.d.css={update:function(b,c){var d=a.a.c(c());"object"==typeof d?a.a.A(d,function(c,d){d=a.a.c(d);a.a.ua(b,c,d)}):(d=String(d||
""),a.a.ua(b,b.__ko__cssValue,!1),b.__ko__cssValue=d,a.a.ua(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,e,f){var h=c()||{};a.a.A(h,function(g){"string"==typeof g&&a.a.q(b,g,function(b){var h,n=c()[g];if(n){try{var r=a.a.R(arguments);e=f.$data;r.unshift(e);h=n.apply(e,r)}finally{!0!==h&&(b.preventDefault?
b.preventDefault():b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={vb:function(b){return function(){var c=b(),d=a.a.Sa(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.K.Ja};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.K.Ja}}},init:function(b,
c){return a.d.template.init(b,a.d.foreach.vb(c))},update:function(b,c,d,e,f){return a.d.template.update(b,a.d.foreach.vb(c),d,e,f)}};a.g.aa.foreach=!1;a.e.Q.foreach=!0;a.d.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var k=b.ownerDocument;if("activeElement"in k){var f;try{f=k.activeElement}catch(h){f=k.body}e=f===b}k=c();a.g.va(k,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),h=e.bind(null,!1);a.a.q(b,"focus",f);a.a.q(b,"focusin",
f);a.a.q(b,"blur",h);a.a.q(b,"focusout",h)},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),a.k.t(a.a.ha,null,[b,d?"focusin":"focusout"]))}};a.g.W.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.g.W.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Va(b,c())}};H("if");H("ifnot",!1,!0);H("with",!0,!1,function(a,c){return a.createChildContext(c)});var J={};a.d.options={init:function(b){if("select"!==
a.a.B(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.la(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function h(c,d){if(r.length){var e=0<=a.a.l(r,a.i.p(d[0]));a.a.Db(d[0],e);m&&!e&&a.k.t(a.a.ha,null,[b,"change"])}}var g=0!=b.length&&b.multiple?b.scrollTop:null,k=a.a.c(c()),l=d.get("optionsIncludeDestroyed");
c={};var n,r;r=b.multiple?a.a.ya(e(),a.i.p):0<=b.selectedIndex?[a.i.p(b.options[b.selectedIndex])]:[];k&&("undefined"==typeof k.length&&(k=[k]),n=a.a.la(k,function(b){return l||b===p||null===b||!a.a.c(b._destroy)}),d.has("optionsCaption")&&(k=a.a.c(d.get("optionsCaption")),null!==k&&k!==p&&n.unshift(J)));var m=!1;c.beforeRemove=function(a){b.removeChild(a)};k=h;d.has("optionsAfterRender")&&(k=function(b,c){h(0,c);a.k.t(d.get("optionsAfterRender"),null,[c[0],b!==J?b:p])});a.a.Ua(b,n,function(c,e,g){g.length&&
(r=g[0].selected?[a.i.p(g[0])]:[],m=!0);e=b.ownerDocument.createElement("option");c===J?(a.a.Xa(e,d.get("optionsCaption")),a.i.X(e,p)):(g=f(c,d.get("optionsValue"),c),a.i.X(e,a.a.c(g)),c=f(c,d.get("optionsText"),g),a.a.Xa(e,c));return[e]},c,k);a.k.t(function(){d.get("valueAllowUnset")&&d.has("value")?a.i.X(b,a.a.c(d.get("value")),!0):(b.multiple?r.length&&e().length<r.length:r.length&&0<=b.selectedIndex?a.i.p(b.options[b.selectedIndex])!==r[0]:r.length||0<=b.selectedIndex)&&a.a.ha(b,"change")});a.a.Tb(b);
g&&20<Math.abs(g-b.scrollTop)&&(b.scrollTop=g)}};a.d.options.Pa=a.a.f.L();a.d.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.q(b,"change",function(){var e=c(),f=[];a.a.r(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.i.p(b))});a.g.va(e,d,"selectedOptions",f)})},update:function(b,c){if("select"!=a.a.B(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c());d&&"number"==typeof d.length&&a.a.r(b.getElementsByTagName("option"),function(b){var c=
0<=a.a.l(d,a.i.p(b));a.a.Db(b,c)})}};a.g.W.selectedOptions=!0;a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.A(d,function(c,d){d=a.a.c(d);b.style[c]=d||""})}};a.d.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.q(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},
update:function(b,c){a.a.Xa(b,c())}};a.e.Q.text=!0;a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.Ob;a.a.Cb(b,d)}}};a.d.uniqueName.Ob=0;a.d.value={after:["options","foreach"],init:function(b,c,d){function e(){g=!1;var e=c(),f=a.i.p(b);a.g.va(e,d,"value",f)}var f=["change"],h=d.get("valueUpdate"),g=!1;h&&("string"==typeof h&&(h=[h]),a.a.$(f,h),f=a.a.ib(f));!a.a.oa||"input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||
-1!=a.a.l(f,"propertychange")||(a.a.q(b,"propertychange",function(){g=!0}),a.a.q(b,"focus",function(){g=!1}),a.a.q(b,"blur",function(){g&&e()}));a.a.r(f,function(c){var d=e;a.a.kc(c,"after")&&(d=function(){setTimeout(e,0)},c=c.substring(5));a.a.q(b,c,d)})},update:function(b,c,d){var e=a.a.c(c());c=a.i.p(b);if(e!==c)if("select"===a.a.B(b)){var f=d.get("valueAllowUnset");d=function(){a.i.X(b,e,f)};d();f||e===a.i.p(b)?setTimeout(d,0):a.k.t(a.a.ha,null,[b,"change"])}else a.i.X(b,e)}};a.g.W.value=!0;a.d.visible=
{update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(c,d,e,f,h){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,f,h)}}})("click");a.C=function(){};a.C.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.C.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.C.prototype.makeTemplateSource=
function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.n.j(d)}if(1==b.nodeType||8==b.nodeType)return new a.n.Z(b);throw Error("Unknown template type: "+b);};a.C.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,d)};a.C.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.C.prototype.rewriteTemplate=
function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.C);a.Za=function(){function b(b,c,d,g){b=a.g.Ra(b);for(var k=a.g.aa,l=0;l<b.length;l++){var n=b[l].key;if(k.hasOwnProperty(n)){var r=k[n];if("function"===typeof r){if(n=r(b[l].value))throw Error(n);}else if(!r)throw Error("This template engine does not support the '"+n+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.g.qa(b,
{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return g.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Ub:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Za.dc(b,c)},d)},dc:function(a,f){return a.replace(c,function(a,c,d,e,n){return b(n,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e",
"#comment",f)})},Mb:function(b,c){return a.w.Na(function(d,g){var k=d.nextSibling;k&&k.nodeName.toLowerCase()===c&&a.xa(k,b,g)})}}}();a.b("__tr_ambtns",a.Za.Mb);(function(){a.n={};a.n.j=function(a){this.j=a};a.n.j.prototype.text=function(){var b=a.a.B(this.j),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.j[b];var c=arguments[0];"innerHTML"===b?a.a.Va(this.j,c):this.j[b]=c};var b=a.a.f.L()+"_";a.n.j.prototype.data=function(c){if(1===arguments.length)return a.a.f.get(this.j,
b+c);a.a.f.set(this.j,b+c,arguments[1])};var c=a.a.f.L();a.n.Z=function(a){this.j=a};a.n.Z.prototype=new a.n.j;a.n.Z.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.j,c)||{};b.$a===p&&b.Ba&&(b.$a=b.Ba.innerHTML);return b.$a}a.a.f.set(this.j,c,{$a:arguments[0]})};a.n.j.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.j,c)||{}).Ba;a.a.f.set(this.j,c,{Ba:arguments[0]})};a.b("templateSources",a.n);a.b("templateSources.domElement",a.n.j);a.b("templateSources.anonymousTemplate",
a.n.Z)})();(function(){function b(b,c,d){var e;for(c=a.e.nextSibling(c);b&&(e=b)!==c;)b=a.e.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],h=e.parentNode,m=a.J.instance,q=m.preprocessNode;if(q){b(e,f,function(a,b){var c=a.previousSibling,d=q.call(m,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):(c.push(e,f),a.a.ea(c,h))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.fb(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==
b.nodeType||a.w.Ib(b,[d])});a.a.ea(c,h)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,h,n,r){r=r||{};var m=b&&d(b),m=m&&m.ownerDocument,q=r.templateEngine||f;a.Za.Ub(h,q,m);h=q.renderTemplate(h,n,r,m);if("number"!=typeof h.length||0<h.length&&"number"!=typeof h[0].nodeType)throw Error("Template engine must return an array of DOM nodes");m=!1;switch(e){case "replaceChildren":a.e.U(b,h);m=!0;break;case "replaceNode":a.a.Bb(b,h);m=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+
e);}m&&(c(h,n),r.afterRender&&a.k.t(r.afterRender,null,[h,n.$data]));return h}var f;a.Wa=function(b){if(b!=p&&!(b instanceof a.C))throw Error("templateEngine must inherit from ko.templateEngine");f=b};a.Ta=function(b,c,h,n,r){h=h||{};if((h.templateEngine||f)==p)throw Error("Set a template engine before calling renderTemplate");r=r||"replaceChildren";if(n){var m=d(n);return a.h(function(){var f=c&&c instanceof a.I?c:new a.I(a.a.c(c)),p=a.v(b)?b():"function"==typeof b?b(f.$data,f):b,f=e(n,r,p,f,h);
"replaceNode"==r&&(n=f,m=d(n))},null,{Da:function(){return!m||!a.a.Ea(m)},G:m&&"replaceNode"==r?m.parentNode:m})}return a.w.Na(function(d){a.Ta(b,c,h,d,"replaceNode")})};a.jc=function(b,d,f,h,r){function m(a,b){c(b,s);f.afterRender&&f.afterRender(b,a)}function q(a,c){s=r.createChildContext(a,f.as,function(a){a.$index=c});var d="function"==typeof b?b(a,s):b;return e(null,"ignoreTargetNode",d,s,f)}var s;return a.h(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.la(b,function(b){return f.includeDestroyed||
b===p||null===b||!a.a.c(b._destroy)});a.k.t(a.a.Ua,null,[h,b,q,f,m])},null,{G:h})};var h=a.a.f.L();a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||d.name?a.e.da(b):(d=a.e.childNodes(b),d=a.a.ec(d),(new a.n.Z(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var m=c(),q;c=a.a.c(m);d=!0;e=null;"string"==typeof c?c={}:(m=c.name,"if"in c&&(d=a.a.c(c["if"])),d&&"ifnot"in c&&(d=!a.a.c(c.ifnot)),q=a.a.c(c.data));"foreach"in c?e=a.jc(m||b,d&&c.foreach||
[],c,b,f):d?(f="data"in c?f.createChildContext(q,c.as):f,e=a.Ta(m||b,f,c,b)):a.e.da(b);f=e;(q=a.a.f.get(b,h))&&"function"==typeof q.F&&q.F();a.a.f.set(b,h,f&&f.ga()?f:p)}};a.g.aa.template=function(b){b=a.g.Ra(b);return 1==b.length&&b[0].unknown||a.g.bc(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.e.Q.template=!0})();a.b("setTemplateEngine",a.Wa);a.b("renderTemplate",a.Ta);a.a.nb=function(a,c,d){if(a.length&&c.length){var e,f,h,g,k;for(e=
f=0;(!d||e<d)&&(g=a[f]);++f){for(h=0;k=c[h];++h)if(g.value===k.value){g.moved=k.index;k.moved=g.index;c.splice(h,1);e=h=0;break}e+=h}}};a.a.Aa=function(){function b(b,d,e,f,h){var g=Math.min,k=Math.max,l=[],n,p=b.length,m,q=d.length,s=q-p||1,t=p+q+1,u,w,y;for(n=0;n<=p;n++)for(w=u,l.push(u=[]),y=g(q,n+s),m=k(0,n-1);m<=y;m++)u[m]=m?n?b[n-1]===d[m-1]?w[m-1]:g(w[m]||t,u[m-1]||t)+1:m+1:n+1;g=[];k=[];s=[];n=p;for(m=q;n||m;)q=l[n][m]-1,m&&q===l[n][m-1]?k.push(g[g.length]={status:e,value:d[--m],index:m}):
n&&q===l[n-1][m]?s.push(g[g.length]={status:f,value:b[--n],index:n}):(--m,--n,h.sparse||g.push({status:"retained",value:d[m]}));a.a.nb(k,s,10*p);return g.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<=d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Aa);(function(){function b(b,c,f,h,g){var k=[],l=a.h(function(){var l=c(f,g,a.a.ea(k,b))||[];0<k.length&&(a.a.Bb(k,l),h&&a.k.t(h,null,[f,
l,g]));k.length=0;a.a.$(k,l)},null,{G:b,Da:function(){return!a.a.eb(k)}});return{S:k,h:l.ga()?l:p}}var c=a.a.f.L();a.a.Ua=function(d,e,f,h,g){function k(b,c){v=r[c];u!==c&&(z[b]=v);v.Ia(u++);a.a.ea(v.S,d);s.push(v);y.push(v)}function l(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.r(c[d].S,function(a){b(a,d,c[d].ka)})}e=e||[];h=h||{};var n=a.a.f.get(d,c)===p,r=a.a.f.get(d,c)||[],m=a.a.ya(r,function(a){return a.ka}),q=a.a.Aa(m,e,h.dontLimitMoves),s=[],t=0,u=0,w=[],y=[];e=[];for(var z=[],m=[],
v,x=0,A,C;A=q[x];x++)switch(C=A.moved,A.status){case "deleted":C===p&&(v=r[t],v.h&&v.h.F(),w.push.apply(w,a.a.ea(v.S,d)),h.beforeRemove&&(e[x]=v,y.push(v)));t++;break;case "retained":k(x,t++);break;case "added":C!==p?k(x,C):(v={ka:A.value,Ia:a.m(u++)},s.push(v),y.push(v),n||(m[x]=v))}l(h.beforeMove,z);a.a.r(w,h.beforeRemove?a.M:a.removeNode);for(var x=0,n=a.e.firstChild(d),E;v=y[x];x++){v.S||a.a.extend(v,b(d,f,v.ka,g,v.Ia));for(t=0;q=v.S[t];n=q.nextSibling,E=q,t++)q!==n&&a.e.rb(d,q,E);!v.Zb&&g&&(g(v.ka,
v.S,v.Ia),v.Zb=!0)}l(h.beforeRemove,e);l(h.afterMove,z);l(h.afterAdd,m);a.a.f.set(d,c,s)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Ua);a.K=function(){this.allowTemplateRewriting=!1};a.K.prototype=new a.C;a.K.prototype.renderTemplateSource=function(b){var c=(9>a.a.oa?0:b.nodes)?b.nodes():null;if(c)return a.a.R(c.cloneNode(!0).childNodes);b=b.text();return a.a.Qa(b)};a.K.Ja=new a.K;a.Wa(a.K.Ja);a.b("nativeTemplateEngine",a.K);(function(){a.La=function(){var a=this.ac=function(){if(!t||
!t.tmpl)return 0;try{if(0<=t.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,f){f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=t.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=t.extend({koBindingContext:e},f.templateOptions);e=t.tmpl(h,b,e);e.appendTo(w.createElement("div"));
t.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(t.tmpl.tag.ko_code={open:"__.push($1 || '');"},t.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.La.prototype=new a.C;var b=new a.La;0<b.ac&&a.Wa(b);a.b("jqueryTmplTemplateEngine",a.La)})()})})();})();

// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function(t){function n(t,n){return function(e){return u(t.call(this,e),n)}}function e(t){return function(n){return this.lang().ordinal(t.call(this,n))}}function s(){}function r(t){i(this,t)}function a(t){var n=this._data={},e=t.years||t.year||t.y||0,s=t.months||t.month||t.M||0,r=t.weeks||t.week||t.w||0,a=t.days||t.day||t.d||0,i=t.hours||t.hour||t.h||0,u=t.minutes||t.minute||t.m||0,d=t.seconds||t.second||t.s||0,c=t.milliseconds||t.millisecond||t.ms||0;this._milliseconds=c+1e3*d+6e4*u+36e5*i,this._days=a+7*r,this._months=s+12*e,n.milliseconds=c%1e3,d+=o(c/1e3),n.seconds=d%60,u+=o(d/60),n.minutes=u%60,i+=o(u/60),n.hours=i%24,a+=o(i/24),a+=7*r,n.days=a%30,s+=o(a/30),n.months=s%12,e+=o(s/12),n.years=e}function i(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function o(t){return 0>t?Math.ceil(t):Math.floor(t)}function u(t,n){for(var e=t+"";n>e.length;)e="0"+e;return e}function d(t,n,e){var s,r=n._milliseconds,a=n._days,i=n._months;r&&t._d.setTime(+t+r*e),a&&t.date(t.date()+a*e),i&&(s=t.date(),t.date(1).month(t.month()+i*e).date(Math.min(s,t.daysInMonth())))}function c(t){return"[object Array]"===Object.prototype.toString.call(t)}function h(t,n){var e,s=Math.min(t.length,n.length),r=Math.abs(t.length-n.length),a=0;for(e=0;s>e;e++)~~t[e]!==~~n[e]&&a++;return a+r}function f(t,n){return n.abbr=t,x[t]||(x[t]=new s),x[t].set(n),x[t]}function l(t){return t?(!x[t]&&W&&require("./lang/"+t),x[t]):O.fn._lang}function _(t){return t.match(/\[.*\]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function m(t){var n,e,s=t.match(A);for(n=0,e=s.length;e>n;n++)s[n]=rn[s[n]]?rn[s[n]]:_(s[n]);return function(r){var a="";for(n=0;e>n;n++)a+="function"==typeof s[n].call?s[n].call(r,t):s[n];return a}}function y(t,n){function e(n){return t.lang().longDateFormat(n)||n}for(var s=5;s--&&P.test(n);)n=n.replace(P,e);return nn[n]||(nn[n]=m(n)),nn[n](t)}function M(t){switch(t){case"DDDD":return E;case"YYYY":return N;case"YYYYY":return $;case"S":case"SS":case"SSS":case"DDD":return V;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return I;case"X":return R;case"Z":case"ZZ":return X;case"T":return j;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return J;default:return RegExp(t.replace("\\",""))}}function D(t,n,e){var s,r=e._a;switch(t){case"M":case"MM":r[1]=null==n?0:~~n-1;break;case"MMM":case"MMMM":s=l(e._l).monthsParse(n),null!=s?r[1]=s:e._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":null!=n&&(r[2]=~~n);break;case"YY":r[0]=~~n+(~~n>68?1900:2e3);break;case"YYYY":case"YYYYY":r[0]=~~n;break;case"a":case"A":e._isPm="pm"===(n+"").toLowerCase();break;case"H":case"HH":case"h":case"hh":r[3]=~~n;break;case"m":case"mm":r[4]=~~n;break;case"s":case"ss":r[5]=~~n;break;case"S":case"SS":case"SSS":r[6]=~~(1e3*("0."+n));break;case"X":e._d=new Date(1e3*parseFloat(n));break;case"Z":case"ZZ":e._useUTC=!0,s=(n+"").match(K),s&&s[1]&&(e._tzh=~~s[1]),s&&s[2]&&(e._tzm=~~s[2]),s&&"+"===s[0]&&(e._tzh=-e._tzh,e._tzm=-e._tzm)}null==n&&(e._isValid=!1)}function Y(t){var n,e,s=[];if(!t._d){for(n=0;7>n;n++)t._a[n]=s[n]=null==t._a[n]?2===n?1:0:t._a[n];s[3]+=t._tzh||0,s[4]+=t._tzm||0,e=new Date(0),t._useUTC?(e.setUTCFullYear(s[0],s[1],s[2]),e.setUTCHours(s[3],s[4],s[5],s[6])):(e.setFullYear(s[0],s[1],s[2]),e.setHours(s[3],s[4],s[5],s[6])),t._d=e}}function p(t){var n,e,s=t._f.match(A),r=t._i;for(t._a=[],n=0;s.length>n;n++)e=(M(s[n]).exec(r)||[])[0],e&&(r=r.slice(r.indexOf(e)+e.length)),rn[s[n]]&&D(s[n],e,t);t._isPm&&12>t._a[3]&&(t._a[3]+=12),t._isPm===!1&&12===t._a[3]&&(t._a[3]=0),Y(t)}function g(t){var n,e,s,a,o,u=99;for(a=t._f.length;a>0;a--){if(n=i({},t),n._f=t._f[a-1],p(n),e=new r(n),e.isValid()){s=e;break}o=h(n._a,e.toArray()),u>o&&(u=o,s=e)}i(t,s)}function w(t){var n,e=t._i;if(q.exec(e)){for(t._f="YYYY-MM-DDT",n=0;4>n;n++)if(G[n][1].exec(e)){t._f+=G[n][0];break}X.exec(e)&&(t._f+=" Z"),p(t)}else t._d=new Date(e)}function T(n){var e=n._i,s=Z.exec(e);e===t?n._d=new Date:s?n._d=new Date(+s[1]):"string"==typeof e?w(n):c(e)?(n._a=e.slice(0),Y(n)):n._d=e instanceof Date?new Date(+e):new Date(e)}function v(t,n,e,s,r){return r.relativeTime(n||1,!!e,t,s)}function k(t,n,e){var s=U(Math.abs(t)/1e3),r=U(s/60),a=U(r/60),i=U(a/24),o=U(i/365),u=45>s&&["s",s]||1===r&&["m"]||45>r&&["mm",r]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",U(i/30)]||1===o&&["y"]||["yy",o];return u[2]=n,u[3]=t>0,u[4]=e,v.apply({},u)}function S(t,n,e){var s=e-n,r=e-t.day();return r>s&&(r-=7),s-7>r&&(r+=7),Math.ceil(O(t).add("d",r).dayOfYear()/7)}function b(t){var n=t._i,e=t._f;return null===n||""===n?null:("string"==typeof n&&(t._i=n=l().preparse(n)),O.isMoment(n)?(t=i({},n),t._d=new Date(+n._d)):e?c(e)?g(t):p(t):T(t),new r(t))}function F(t,n){O.fn[t]=O.fn[t+"s"]=function(t){var e=this._isUTC?"UTC":"";return null!=t?(this._d["set"+e+n](t),this):this._d["get"+e+n]()}}function L(t){O.duration.fn[t]=function(){return this._data[t]}}function H(t,n){O.duration.fn["as"+t]=function(){return+this/n}}for(var O,z,C="2.0.0",U=Math.round,x={},W="undefined"!=typeof module&&module.exports,Z=/^\/?Date\((\-?\d+)/i,A=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,P=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,J=/\d\d?/,V=/\d{1,3}/,E=/\d{3}/,N=/\d{1,4}/,$=/[+\-]?\d{1,6}/,I=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,X=/Z|[\+\-]\d\d:?\d\d/i,j=/T/i,R=/[\+\-]?\d+(\.\d{1,3})?/,q=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,B="YYYY-MM-DDTHH:mm:ssZ",G=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],K=/([\+\-]|\d\d)/gi,Q="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),tn={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},nn={},en="DDD w W M D d".split(" "),sn="M D H h m s w W".split(" "),rn={M:function(){return this.month()+1},MMM:function(t){return this.lang().monthsShort(this,t)},MMMM:function(t){return this.lang().months(this,t)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(t){return this.lang().weekdaysMin(this,t)},ddd:function(t){return this.lang().weekdaysShort(this,t)},dddd:function(t){return this.lang().weekdays(this,t)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return u(this.year()%100,2)},YYYY:function(){return u(this.year(),4)},YYYYY:function(){return u(this.year(),5)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return u(~~(this.milliseconds()/10),2)},SSS:function(){return u(this.milliseconds(),3)},Z:function(){var t=-this.zone(),n="+";return 0>t&&(t=-t,n="-"),n+u(~~(t/60),2)+":"+u(~~t%60,2)},ZZ:function(){var t=-this.zone(),n="+";return 0>t&&(t=-t,n="-"),n+u(~~(10*t/6),4)},X:function(){return this.unix()}};en.length;)z=en.pop(),rn[z+"o"]=e(rn[z]);for(;sn.length;)z=sn.pop(),rn[z+z]=n(rn[z],2);for(rn.DDDD=n(rn.DDD,3),s.prototype={set:function(t){var n,e;for(e in t)n=t[e],"function"==typeof n?this[e]=n:this["_"+e]=n},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(t){return this._months[t.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(t){return this._monthsShort[t.month()]},monthsParse:function(t){var n,e,s;for(this._monthsParse||(this._monthsParse=[]),n=0;12>n;n++)if(this._monthsParse[n]||(e=O([2e3,n]),s="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[n]=RegExp(s.replace(".",""),"i")),this._monthsParse[n].test(t))return n},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(t){return this._weekdays[t.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(t){return this._weekdaysShort[t.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(t){return this._weekdaysMin[t.day()]},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(t){var n=this._longDateFormat[t];return!n&&this._longDateFormat[t.toUpperCase()]&&(n=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t]=n),n},meridiem:function(t,n,e){return t>11?e?"pm":"PM":e?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(t,n){var e=this._calendar[t];return"function"==typeof e?e.apply(n):e},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(t,n,e,s){var r=this._relativeTime[e];return"function"==typeof r?r(t,n,e,s):r.replace(/%d/i,t)},pastFuture:function(t,n){var e=this._relativeTime[t>0?"future":"past"];return"function"==typeof e?e(n):e.replace(/%s/i,n)},ordinal:function(t){return this._ordinal.replace("%d",t)},_ordinal:"%d",preparse:function(t){return t},postformat:function(t){return t},week:function(t){return S(t,this._week.dow,this._week.doy)},_week:{dow:0,doy:6}},O=function(t,n,e){return b({_i:t,_f:n,_l:e,_isUTC:!1})},O.utc=function(t,n,e){return b({_useUTC:!0,_isUTC:!0,_l:e,_i:t,_f:n})},O.unix=function(t){return O(1e3*t)},O.duration=function(t,n){var e,s=O.isDuration(t),r="number"==typeof t,i=s?t._data:r?{}:t;return r&&(n?i[n]=t:i.milliseconds=t),e=new a(i),s&&t.hasOwnProperty("_lang")&&(e._lang=t._lang),e},O.version=C,O.defaultFormat=B,O.lang=function(n,e){return n?(e?f(n,e):x[n]||l(n),O.duration.fn._lang=O.fn._lang=l(n),t):O.fn._lang._abbr},O.langData=function(t){return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),l(t)},O.isMoment=function(t){return t instanceof r},O.isDuration=function(t){return t instanceof a},O.fn=r.prototype={clone:function(){return O(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._d},toJSON:function(){return O(this).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var t=this;return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()]},isValid:function(){return null==this._isValid&&(this._isValid=this._a?!h(this._a,(this._isUTC?O.utc(this._a):O(this._a)).toArray()):!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(t){var n=y(this,t||O.defaultFormat);return this.lang().postformat(n)},add:function(t,n){var e;return e="string"==typeof t?O.duration(+n,t):O.duration(t,n),d(this,e,1),this},subtract:function(t,n){var e;return e="string"==typeof t?O.duration(+n,t):O.duration(t,n),d(this,e,-1),this},diff:function(t,n,e){var s,r,a=this._isUTC?O(t).utc():O(t).local(),i=6e4*(this.zone()-a.zone());return n&&(n=n.replace(/s$/,"")),"year"===n||"month"===n?(s=432e5*(this.daysInMonth()+a.daysInMonth()),r=12*(this.year()-a.year())+(this.month()-a.month()),r+=(this-O(this).startOf("month")-(a-O(a).startOf("month")))/s,"year"===n&&(r/=12)):(s=this-a-i,r="second"===n?s/1e3:"minute"===n?s/6e4:"hour"===n?s/36e5:"day"===n?s/864e5:"week"===n?s/6048e5:s),e?r:o(r)},from:function(t,n){return O.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!n)},fromNow:function(t){return this.from(O(),t)},calendar:function(){var t=this.diff(O().startOf("day"),"days",!0),n=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){var t=this.year();return 0===t%4&&0!==t%100||0===t%400},isDST:function(){return this.zone()<O([this.year()]).zone()||this.zone()<O([this.year(),5]).zone()},day:function(t){var n=this._isUTC?this._d.getUTCDay():this._d.getDay();return null==t?n:this.add({d:t-n})},startOf:function(t){switch(t=t.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t&&this.day(0),this},endOf:function(t){return this.startOf(t).add(t.replace(/s?$/,"s"),1).subtract("ms",1)},isAfter:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)>+O(n).startOf(e)},isBefore:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)<+O(n).startOf(e)},isSame:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)===+O(n).startOf(e)},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return O.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(t){var n=U((O(this).startOf("day")-O(this).startOf("year"))/864e5)+1;return null==t?n:this.add("d",t-n)},isoWeek:function(t){var n=S(this,1,4);return null==t?n:this.add("d",7*(t-n))},week:function(t){var n=this.lang().week(this);return null==t?n:this.add("d",7*(t-n))},lang:function(n){return n===t?this._lang:(this._lang=l(n),this)}},z=0;Q.length>z;z++)F(Q[z].toLowerCase().replace(/s$/,""),Q[z]);F("year","FullYear"),O.fn.days=O.fn.day,O.fn.weeks=O.fn.week,O.fn.isoWeeks=O.fn.isoWeek,O.duration.fn=a.prototype={weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*this._months},humanize:function(t){var n=+this,e=k(n,!t,this.lang());return t&&(e=this.lang().pastFuture(n,e)),this.lang().postformat(e)},lang:O.fn.lang};for(z in tn)tn.hasOwnProperty(z)&&(H(z,tn[z]),L(z.toLowerCase()));H("Weeks",6048e5),O.lang("en",{ordinal:function(t){var n=t%10,e=1===~~(t%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th";return t+e}}),W&&(module.exports=O),"undefined"==typeof ender&&(this.moment=O),"function"==typeof define&&define.amd&&define("moment",[],function(){return O})}).call(this);
// moment.js language configuration
// language : finnish (fi)
// author : Tarmo Aidantausta : https://github.com/bleadof
(function(){function e(e){function a(e,a,n,_){var s="";switch(n){case"s":return _?"muutaman sekunnin":"muutama sekunti";case"m":return _?"minuutin":"minuutti";case"mm":s=_?"minuutin":"minuuttia";break;case"h":return _?"tunnin":"tunti";case"hh":s=_?"tunnin":"tuntia";break;case"d":return _?"p\u00e4iv\u00e4n":"p\u00e4iv\u00e4";case"dd":s=_?"p\u00e4iv\u00e4n":"p\u00e4iv\u00e4\u00e4";break;case"M":return _?"kuukauden":"kuukausi";case"MM":s=_?"kuukauden":"kuukautta";break;case"y":return _?"vuoden":"vuosi";case"yy":s=_?"vuoden":"vuotta"}return s=t(e,_)+" "+s}function t(e,a){return 10>e?a?_[e]:n[e]:e}var n="nolla yksi kaksi kolme nelj\u00e4 viisi kuusi seitsem\u00e4n kahdeksan yhdeks\u00e4n".split(" "),_=["nolla","yhden","kahden","kolmen","nelj\u00e4n","viiden","kuuden",n[7],n[8],n[9]];e.lang("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\u00e4kuu_hein\u00e4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kes\u00e4_hein\u00e4_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] LT",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] LT",llll:"ddd, Do MMM YYYY, [klo] LT"},calendar:{sameDay:"[t\u00e4n\u00e4\u00e4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\u00e4\u00e4st\u00e4",past:"%s sitten",s:a,m:a,mm:a,h:a,hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},ordinal:"%d.",week:{dow:1,doy:4}})}"function"==typeof define&&define.amd&&define(["moment"],e),"undefined"!=typeof window&&window.moment&&e(window.moment)})();
/**
 * @license
 * Lo-Dash 2.4.0 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n){if(!n||ce.call(n)!=q)return false;
var t=n.valueOf,e=typeof t=="function"&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)}function g(n,t,e){if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(var r=-1,u=V[typeof n]&&Te(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function _(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function U(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Te(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function H(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=et(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Te(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function J(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function Q(n){return n&&typeof n=="object"&&!$e(n)&&me.call(n,"__wrapped__")?n:new X(n)
}function X(n,t){this.__chain__=!!t,this.__wrapped__=n}function Z(n){function t(){if(r){var n=r.slice();be.apply(n,arguments)}if(this instanceof t){var o=tt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return De(t,n),t}function nt(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Re[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=$e(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):H({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:g)(n,function(n,i){o[i]=nt(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function tt(n){return wt(n)?je(n):{}}function et(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(Ae.funcNames&&(r=!n.name),r=r||!Ae.funcDecomp,!r)){var u=ge.call(n);
Ae.funcNames||(r=!O.test(u)),r||(r=E.test(u),De(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function rt(n){function t(){var n=f?i:this;if(u){var h=u.slice();be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,rt([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=tt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return De(t,n),t}function ut(e,r){var u=-1,i=vt(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ot(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&($e(i)||yt(i))){t||(i=ot(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function it(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return it(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(p=!u,u||(u=a()),o||(o=a()),f=u.length;f--;)if(u[f]==n)return o[f]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(f=n.length,v=t.length,i=v==n.length,!i&&!r)return i;for(;v--;)if(c=f,p=t[v],r)for(;c--&&!(i=it(n[c],p,e,r,u,o)););else if(!(i=it(n[v],p,e,r,u,o)))break;return i}return _(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&it(n[a],t,e,r,u,o)):void 0
}),i&&!r&&_(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0}),p&&(l(u),l(o)),i}function at(n,t,e,r,u){($e(t)?St:g)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=$e(t))||h(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?$e(l)?l:[]:h(l)?l:{}),r.push(t),u.push(l),c||at(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function ft(n,t){return n+he(Ee()*(t-n+1))}function lt(e,r,u){var i=-1,f=vt(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
if(v){var g=o(h);g?(f=t,h=g):(v=false,h=u?h:(l(h),s))}for(;++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function ct(n){return function(t,e,r){var u={};e=Q.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else g(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function pt(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=c.slice(),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&be.apply(c[3]||(c[3]=[]),r),c[1]|=t,pt.apply(null,c)):(1==t||17===t?Z:rt)([n,t,e,r,u,o])}function st(n){return Fe[n]}function vt(){var t=(t=Q.indexOf)===Wt?n:t;return t}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(_(n,function(n,t){e=t}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return Be[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false
}function mt(n,t,e){var r=Te(n),u=r.length;for(t=et(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return _(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Te(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false
}function xt(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=vt(),o=n?n.length:0,i=false;return e=(0>e?Ne(0,o+e):e)||0,$e(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):g(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else g(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];
t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else g(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=Q.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return g(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else g(n,t);
return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Te(n),r=u.length;g(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=Q.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);else o=[],g(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;
for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=Q.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else g(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=Q.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=ft(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else g(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;for(t=Q.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Ie(Ne(0,r),u))
}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ne(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=Q.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ne(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?Q.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=Q.createCallback(e,r,3)),lt(n,t,e)
}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Le(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Le(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||$e(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?pt(n,17,p(arguments,2),null,t):pt(n,1,null,null,t)}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Me()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null)))
}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ne(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ne(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Me(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);
t&&(e||u.length)||(null==e&&(e=t),o=X,t=n,n=Q,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=pe.test(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=function(){try{var n={},t=pe.test(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),je=pe.test(je=re.create)&&je,ke=pe.test(ke=Xt.isArray)&&ke,xe=e.isFinite,Ce=e.isNaN,Oe=pe.test(Oe=re.keys)&&Oe,Ne=te.max,Ie=te.min,Se=e.parseInt,Ee=te.random,Re={};Re[$]=Xt,Re[T]=Yt,Re[F]=Zt,Re[B]=ne,Re[q]=re,Re[W]=ee,Re[z]=ue,Re[P]=oe,X.prototype=Q.prototype;var Ae=Q.support={};Ae.funcDecomp=!pe.test(e.a)&&E.test(s),Ae.funcNames=typeof ne.name=="string",Q.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:Q}},je||(tt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var De=we?function(n,t){M.value=t,we(n,"__bindData__",M)}:Ht,$e=ke||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Te=Oe?function(n){return wt(n)?Oe(n):[]}:J,Fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Be=_t(Fe),We=ue("("+Te(Be).join("|")+")","g"),qe=ue("["+Te(Fe).join("")+"]","g"),ze=ct(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Pe=ct(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)
}),Ke=ct(function(n,t,e){n[e]=t}),Le=Rt,Me=pe.test(Me=Zt.now)&&Me||function(){return(new Zt).getTime()},Ve=8==Se(d+"08")?Se:function(n,t){return Se(kt(n)?n.replace(I,""):n,t||0)};return Q.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},Q.assign=H,Q.at=function(n){for(var t=arguments,e=-1,r=ot(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];return u},Q.bind=Mt,Q.bindAll=function(n){for(var t=1<arguments.length?ot(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];
n[u]=pt(n[u],1,null,null,n)}return n},Q.bindKey=function(n,t){return 2<arguments.length?pt(t,19,p(arguments,2),null,n):pt(t,3,null,null,n)},Q.chain=function(n){return n=new X(n),n.__chain__=true,n},Q.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},Q.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},Q.constant=function(n){return function(){return n
}},Q.countBy=ze,Q.create=function(n,t){var e=tt(n);return t?H(e,t):e},Q.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return et(n,t,e);if("object"!=r)return Jt(n);var u=Te(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=it(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)}},Q.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,pt(n,4,null,null,null,t)},Q.debounce=Vt,Q.defaults=U,Q.defer=function(n){if(!dt(n))throw new ie;
var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},Q.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},Q.difference=function(n){return ut(n,ot(arguments,true,true,1))},Q.filter=Nt,Q.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ot(n,t)},Q.forEach=St,Q.forEachRight=Et,Q.forIn=_,Q.forInRight=function(n,t,e){var r=[];_(n,function(n,t){r.push(t,n)});var u=r.length;
for(t=et(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},Q.forOwn=g,Q.forOwnRight=mt,Q.functions=bt,Q.groupBy=Pe,Q.indexBy=Ke,Q.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Ie(Ne(0,u-r),u))},Q.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=vt(),p=f===n,s=a();++r<u;){var v=arguments[r];($e(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))
}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},Q.invert=_t,Q.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},Q.keys=Te,Q.map=Rt,Q.mapValues=function(n,t,e){var r={};return t=Q.createCallback(t,e,3),g(n,function(n,e,u){r[e]=t(n,e,u)
}),r},Q.max=At,Q.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},Q.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=et(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)at(n,t[u],r,o,i);return l(o),l(i),n},Q.min=function(n,t,e){var u=1/0,o=u;
if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},Q.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];_(n,function(n,t){u.push(t)});for(var u=ut(u,ot(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)||(r[e]=n)});return r},Q.once=function(n){var t,e;
if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},Q.pairs=function(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},Q.partial=function(n){return pt(n,16,p(arguments,1))},Q.partialRight=function(n){return pt(n,32,null,p(arguments,1))},Q.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ot(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)&&(r[e]=n)
});return r},Q.pluck=Le,Q.property=Jt,Q.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},Q.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ne(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},Q.reject=function(n,t,e){return t=Q.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)})},Q.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=Q.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);
return o},Q.rest=qt,Q.shuffle=Tt,Q.sortBy=function(n,t,e){var r=-1,o=$e(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=Q.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},Q.tap=function(n,t){return t(n),n},Q.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)
},Q.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=et(t,e,1);++r<n;)u[r]=t(r);return u},Q.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},Q.transform=function(n,t,e,r){var u=$e(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=tt(o&&o.prototype)}return t&&(t=Q.createCallback(t,r,4),(u?St:g)(n,function(n,r,u){return t(e,n,r,u)})),e},Q.union=function(){return lt(ot(arguments,true,true))},Q.uniq=Pt,Q.values=xt,Q.where=Nt,Q.without=function(n){return ut(n,p(arguments,1))
},Q.wrap=function(n,t){return pt(t,16,[n])},Q.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if($e(e)||yt(e))var r=r?lt(ut(r,e).concat(ut(e,r))):e}return r||[]},Q.zip=Kt,Q.zipObject=Lt,Q.collect=Rt,Q.drop=qt,Q.each=St,Q.eachRight=Et,Q.extend=H,Q.methods=bt,Q.object=Lt,Q.select=Nt,Q.tail=qt,Q.unique=Pt,Q.unzip=Kt,Gt(Q),Q.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),nt(n,t,typeof e=="function"&&et(e,r,1))},Q.cloneDeep=function(n,t,e){return nt(n,true,typeof t=="function"&&et(t,e,1))
},Q.contains=Ct,Q.escape=function(n){return null==n?"":oe(n).replace(qe,st)},Q.every=Ot,Q.find=It,Q.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=Q.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},Q.findKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),g(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.findLast=function(n,t,e){var r;return t=Q.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0}),r},Q.findLastIndex=function(n,t,e){var r=n?n.length:0;
for(t=Q.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},Q.findLastKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.has=function(n,t){return n?me.call(n,t):false},Q.identity=Ut,Q.indexOf=Wt,Q.isArguments=yt,Q.isArray=$e,Q.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},Q.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false},Q.isElement=function(n){return n&&1===n.nodeType||false
},Q.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(g(n,function(){return t=false}),t)},Q.isEqual=function(n,t,e,r){return it(n,t,typeof e=="function"&&et(e,r,2))},Q.isFinite=function(n){return xe(n)&&!Ce(parseFloat(n))},Q.isFunction=dt,Q.isNaN=function(n){return jt(n)&&n!=+n},Q.isNull=function(n){return null===n},Q.isNumber=jt,Q.isObject=wt,Q.isPlainObject=h,Q.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},Q.isString=kt,Q.isUndefined=function(n){return typeof n=="undefined"},Q.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ne(0,r+e):Ie(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},Q.mixin=Gt,Q.noConflict=function(){return e._=le,this},Q.noop=Ht,Q.now=Me,Q.parseInt=Ve,Q.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Ee(),Ie(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):ft(n,t)
},Q.reduce=Dt,Q.reduceRight=$t,Q.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},Q.runInContext=s,Q.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Te(n).length},Q.some=Ft,Q.sortedIndex=zt,Q.template=function(n,t,e){var r=Q.templateSettings;n=oe(n||""),e=U({},e,r);var u,o=U({},e.imports,r.imports),r=Te(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},Q.unescape=function(n){return null==n?"":oe(n).replace(We,gt)},Q.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},Q.all=Ot,Q.any=Ft,Q.detect=It,Q.findWhere=It,Q.foldl=Dt,Q.foldr=$t,Q.include=Ct,Q.inject=Dt,Gt(function(){var n={};return g(Q,function(t,e){Q.prototype[e]||(n[e]=t)}),n}(),false),Q.first=Bt,Q.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ne(0,u-r))},Q.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[ft(0,n.length-1)]:v:(n=Tt(n),n.length=Ie(Ne(0,t),n.length),n)
},Q.take=Bt,Q.head=Bt,g(Q,function(n,t){var e="sample"!==t;Q.prototype[t]||(Q.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new X(o,u):o})}),Q.VERSION="2.4.0",Q.prototype.chain=function(){return this.__chain__=true,this},Q.prototype.toString=function(){return oe(this.__wrapped__)},Q.prototype.value=Qt,Q.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];Q.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new X(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];Q.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];Q.prototype[n]=function(){return new X(t.apply(this.__wrapped__,arguments),this.__chain__)}}),Q}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  $.transit = {
    version: "0.9.9",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionEnd',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    var theseProperties = jQuery.extend(true, {}, properties);

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, options)`.
    if (typeof duration === 'object') {
      easing = duration.easing;
      delay = duration.delay || 0;
      queue = duration.queue || true;
      callback = duration.complete;
      duration = duration.duration;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof theseProperties.easing !== 'undefined') {
      easing = theseProperties.easing;
      delete theseProperties.easing;
    }

    if (typeof theseProperties.duration !== 'undefined') {
      duration = theseProperties.duration;
      delete theseProperties.duration;
    }

    if (typeof theseProperties.complete !== 'undefined') {
      callback = theseProperties.complete;
      delete theseProperties.complete;
    }

    if (typeof theseProperties.queue !== 'undefined') {
      queue = theseProperties.queue;
      delete theseProperties.queue;
    }

    if (typeof theseProperties.delay !== 'undefined') {
      delay = theseProperties.delay;
      delete theseProperties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(theseProperties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(theseProperties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    } else {
      // transition to 'height: auto' and 'width: auto' properly
      for (var j = 0; j < this.length; j++) {
        var elem = this.eq(j);
        $.each(theseProperties, function(key) {
          var value = elem.css(key);
          elem.css(key, value);
        });
      }
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        $.each(finalProperties, function(key) {
          self.css(key, finalProperties[key]);
        });

        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      var finalProperties = {};

      // Apply transitions.
      self.each(function() {
        var elem = $(this);

        $.each(theseProperties, function(key) {
          var value = theseProperties[key];
          if (value === '' || value === 'auto') {
            finalProperties[key] = value;
            var prev = elem.css(key);
            elem.css(key, value);
            theseProperties[key] = elem.css(key);
            elem.css(key, prev);
          }
        });

        if (i > 0) {
          this.offsetWidth; // force a repaint
          this.style[support.transition] = transitionValue;
        }
        elem.css(theseProperties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
        run(next);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform');
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transit:transform');
        t.setFromString(prop, value);

        $(elem).css({ 'transit:transform': t });
      }
    };

  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  // toMS('fast') => $.fx.speeds[i] => "200ms"
  // toMS('normal') //=> $.fx.speeds._default => "400ms"
  // toMS(10) //=> '10ms'
  // toMS('100ms') //=> '100ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow string durations like 'fast' and 'slow', without overriding numeric values.
    if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;
})(jQuery);

Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
};

function viewModel () {
	var self = this;

	self.currentHole = ko.observable(1);
	self.currentHolePar = ko.observable(0);
	self.currentHoleScore = ko.observable(0);
	self.currentHoleHcp = ko.observable(0);
	self.currentHoleLength = ko.observable(0);

	self.courseName = ko.observable("");
//	self.currentTees = ko.observable("yellow");
	self.playerGender = ko.observable("");
	self.playerGenders = ko.observableArray(["Male", "Female"]);
	self.playerName = ko.observable("");
	self.playerExactHcp = ko.observable();
	self.courseSl = ko.observable(0);
	self.courseCr = ko.observable(0);
	self.playerDefaultTee = ko.observable();
	self.courseAlias = ko.observable();
	self.locale_tee = ko.observable();
	self.playerPlayingHcp = ko.observable();

	self.round_id = ko.observable();
	self.course_id = ko.observable();
	self.round_hcp = ko.observable();
	self.round_tee = ko.observable();
	self.roundStartTime = ko.observable();
	self.roundEndTime = ko.observable("");


	self.courseCrYellowMen = ko.observable();
	self.courseSlYellowMen = ko.observable();
	self.courseCrYellowLadies = ko.observable();
	self.courseSlYellowLadies = ko.observable();

	self.courseCrBlueMen = ko.observable();
	self.courseSlBlueMen = ko.observable();

	self.courseCrBlueLadies = ko.observable();
	self.courseSlBlueLadies = ko.observable();

	self.courseCrRedMen = ko.observable();
	self.courseSlRedMen = ko.observable();

	self.courseCrRedLadies = ko.observable();
	self.courseSlRedLadies = ko.observable();

	self.courseCrWhiteMen = ko.observable();
	self.courseSlWhiteMen = ko.observable();

	self.noScoreEntered = ko.observable(true);
	self.showPoints = ko.observable(false);
	self.sliderVal = ko.observable(0);
	self.hasSlid = ko.observable(false);
	self.loadedRoundStartTime = ko.observable("");

	self.holes = ko.observableArray([]);
	self.courseData = ko.observableArray([]);
	self.roundScores = ko.observableArray([]);
	self.roundList = ko.observableArray();

	self.recentlyPlayedCourses = ko.observableArray([]);

	self.courseList = ko.observableArray([]);

//	self.totalToPar = ko.observable();
	self.scoreCard = ko.observableArray();

	self.scrollPos = ko.observable();
	self.roundDuration = ko.observable();
	self.firstRun = ko.observable("working");

	self.roundToDelete = ko.observable();
	self.clickedRoundStartTime = ko.observable("");
	self.hcpPreview = ko.observable("");

	self.roundFinished = ko.observable(false);

	self.hitFairway = ko.observable(true);
	self.hitGreen = ko.observable(true);

	self.cachedScore = ko.observable(0);

	self.bogikorttiVersion = ko.observable("Bogikortti v2.0 - 'Heitä varamaila'");
	self.bogikorttiReleaseName = ko.observable("");
	self.activePage = ko.observable("front");
	self.showAllRounds = ko.observable(false);
	self.loadingRound = ko.observable();


	self.launchedFromHome = function() {
		if (window.navigator.standalone) {
			return true;
		}
		else return false;
	}




	//$('#courseSelect').css({webkitTransform : 'translate3d(100%, 0, 0)'});


	self.prePopulateScores = function () {
//		if (self.roundScores().length > 0) self.roundScores.removeAll();

//		self.round_tee = ko.observable();
//		self.round_hcp = ko.observable();


		for (var i = 0; i < 18; i++) {
			var el = {};
			el.hole = ko.observable(i + 1);
			el.score = ko.observable(0);
			el.points = ko.observable(0);
			el.scoreToPar = ko.observable(0);
			el.fairway_hit = ko.observable(false);
			el.green_hit = ko.observable(false);
			self.roundScores.push(el);
		}
	};

	moment().lang('fi');

	self.prePopulateScores();

	self.translate_tee = function() {
		if (self.round_tee() === "yellow") return "keltainen";
		else if (self.round_tee() === "blue") return "sininen";
		else if (self.round_tee() === "red") return "punainen";
		else if (self.round_tee() === "white") return "valkoinen";
	};

	self.loadRecentCourses = function () {
		self.recentlyPlayedCourses.removeAll();
		var data;

		apexEventProxy.getRecentCourses(
			{ data : data },
			function (data) {
				if (data.message === "fail") {
					return;
				}
				else {
					for (var i = 0; i < data.courses.length; i++) {
						var l = {};
						l.id = data.courses[i].id;
						l.name = data.courses[i].name;
						l.alias = data.courses[i].alias;
						l.hole_count = data.courses[i].hole_count;
						self.recentlyPlayedCourses.push(l);
					}
				}
			}
		);
	};

	self.loadRecentCourses();

	self.calcRoundDuration = function() {
		var secs;
		if (self.roundEndTime() !== "") {
			secs = moment(self.roundEndTime()).diff(self.roundStartTime(), 'seconds');
		}
		else {
			var date = new Date();
			var temp = date.getFullYear() + "/" + parseInt(date.getMonth() + 1, 10) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			var formatted = moment(temp).format("YYYY-MM-DD HH:mm:ss");
			secs = moment(formatted).diff(self.roundStartTime(), 'seconds');
		}

		var hours = secs / 3600;
		var seconds = secs.mod(3600);
		var minutes = seconds / 60;
		seconds = seconds.mod(60);

		if (hours < 1) {
			hours = "";
		}
		else {
			hours = (Math.floor(hours) + " h");
		}

		minutes = (Math.floor(minutes) + " min");
		self.roundDuration(hours + " " + minutes);
	};

	self.coursePar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_par(), 10);
		}
		return s;
	}).extend({throttle: 1 });

	self.courseLength = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			if (self.round_tee() === "yellow") s = s + parseInt(self.holes()[i].hole_length_yellow(), 10);
			else if (self.round_tee() === "blue")  s = s + parseInt(self.holes()[i].hole_length_blue(), 10);
			else if (self.round_tee() === "white") s = s + parseInt(self.holes()[i].hole_length_white(), 10);
			else if (self.round_tee() === "red")  s = s + parseInt(self.holes()[i].hole_length_red(), 10);
		}
		return s;
	}).extend({throttle: 1 });

	self.holeScoreName = ko.computed(function() {
		if (self.noScoreEntered()) {
			return "";
			}
		else if (self.currentHoleScore() === 0) {
			return "";
			}
		else {
			var x = self.currentHoleScore() - self.currentHolePar();
			switch (x) {
				case 0: return "Par";
				case -1: return "Birdie";
				case -2: return "Eagle";
				case -3: return "Albatrossi";
				case 1: return "Bogi";
				case 2: return "Tuplabogi";
			}
			if (x > 2) {
				return x + " yli";
			}
			else if (x < -3) {
				return Math.abs(x) + " alle";
			}
		}
	}).extend({throttle: 1 });

	self.totalScore = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0, m = self.roundScores().length; n < m; n++) {
				s += self.roundScores()[n].score();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.totalPoints = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0, m = self.roundScores().length; n < m; n++) {
				s += self.roundScores()[n].points();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.calcPlayingHcp = function(hcp) {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */

		if (typeof self.round_hcp() === 'undefined' || typeof self.round_tee() === 'undefined' || typeof self.courseCr() === 'undefined' || typeof self.courseSl() === 'undefined' || typeof self.coursePar() === 'undefined') return 0;


		var courseSl;
		var courseCr;

		if (self.playerGender() === "Male") {
			if (self.round_tee() === "yellow") {
				courseSl = self.courseSlYellowMen();
				courseCr = self.courseCrYellowMen();
			}
			else if (self.round_tee() === "blue") {
				courseSl = self.courseSlBlueMen();
				courseCr = self.courseCrBlueMen();
			}
			else if (self.round_tee() === "red") {
				courseSl = self.courseSlRedMen();
				courseCr = self.courseCrRedMen();
			}
			else if (self.round_tee() === "white") {
				courseSl = self.courseSlWhiteMen();
				courseCr = self.courseCrWhiteMen();
			}
		}

		else if (self.playerGender() === "Female") {
			if (self.round_tee() === "yellow") {
				courseSl = self.courseSlYellowLadies();
				courseCr = self.courseCrYellowLadies();
			}
			else if (self.round_tee() === "blue") {
				courseSl = self.courseSlBlueLadies();
				courseCr = self.courseCrBlueLadies();
			}
			else if (self.round_tee() === "red") {
				courseSl = self.courseSlRedLadies();
				courseCr = self.courseCrRedLadies();
			}
			else if (self.round_tee() === "white") {
				courseSl = self.courseSlWhiteLadies();
				courseCr = self.courseCrWhiteLadies();
			}
		}

		var a = parseFloat(hcp);
		var b = parseFloat(courseSl / 113);
		var par;

		if (self.holes().length === 9) { par = self.coursePar() * 2; }
		else if (self.holes().length === 18) { par = self.coursePar(); }

		var c = parseFloat(courseCr - parseFloat(par));
		var playhcp = a * b + c;

		if (isNaN(playhcp)) return 0;

		self.playerPlayingHcp(Math.round(playhcp));
		self.fillScoreCard(Math.round(playhcp));

	};

	self.currentHoleHcpPar = ko.computed(function () {
		if (typeof self.currentHolePar() === 'undefined' || typeof self.playerPlayingHcp() === 'undefined' || self.playerPlayingHcp() === false) return;
		else {
			var par = self.currentHolePar();
			var crhcp = parseInt(self.playerPlayingHcp(), 10);
			var baseadj, hcpholes;
			baseadj = Math.floor(crhcp / 18);
			hcpholes = (crhcp.mod(18));

			if (hcpholes >= parseInt(self.currentHoleHcp(), 10)) {
				return parseInt(self.currentHolePar(), 10) + baseadj + 1;
				}
			else {
				return parseInt(par, 10) + parseInt(baseadj, 10);
			}
		}
	}).extend({throttle: 10 });

	self.setHoleData = function (hole) {
		if (self.holes().length === 0)
			return false;

		var curHole = hole;

//		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);

		var idx = curHole - 1;

		var par = parseInt(self.holes()[idx].hole_par(), 10);
		self.currentHolePar(par);
		self.currentHoleHcp(parseInt(self.holes()[idx].hole_hcp(), 10));

		if (self.round_tee() === "yellow") 		self.currentHoleLength(self.holes()[idx].hole_length_yellow());
		else if (self.round_tee() === "blue") self.currentHoleLength(self.holes()[idx].hole_length_blue());
		else if (self.round_tee() === "white") self.currentHoleLength(self.holes()[idx].hole_length_white());
		else if (self.round_tee() === "red") self.currentHoleLength(self.holes()[idx].hole_length_red());


//		self.currentHoleLength(self.holes()[idx].hole_length());

		$('#fir-checkbox').checkboxradio();
		$('#gir-checkbox').checkboxradio();

		setTimeout(function() {

			for (var i = 0; i < self.roundScores().length; i++) {
				if (self.roundScores()[i].hole() === curHole) {
					self.currentHoleScore(parseInt(self.roundScores()[i].score(), 10));
					if (self.currentHolePar() === 3) {
						$('#fir-checkbox').checkboxradio( "disable" ); // refreshataan toistaiseksi käsin nää jqm:n checkboxit koska bindaus ei suostu toimimaan
					}
					else $('#fir-checkbox').checkboxradio( "enable" );

					if (self.roundScores()[i].fairway_hit() == true) {
						self.hitFairway(true);
						$('#fir-checkbox').prop( "checked", true).checkboxradio("refresh");
					}
					else if (self.roundScores()[i].fairway_hit() == false) {
						self.hitFairway(false);
						$('#fir-checkbox').prop( "checked", false).checkboxradio("refresh");
					}

					if (self.roundScores()[i].green_hit() == true) {
						self.hitGreen(true);
						$('#gir-checkbox').prop("checked", true).checkboxradio("refresh");
					}
					else if (self.roundScores()[i].green_hit() == false) {
						self.hitGreen(false);
						$('#gir-checkbox').prop("checked", false).checkboxradio("refresh");
					}
					self.noScoreEntered(false);
				}
			}

			if (self.currentHoleScore() === 0) {
				self.noScoreEntered(true);
				self.hitFairway(false),
				self.hitGreen(false);
				$('#gir-checkbox').prop("checked", false).checkboxradio("refresh");
				$('#fir-checkbox').prop( "checked", false).checkboxradio("refresh");
			}
		}, 0);



//		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, curScore, self.round_tee());

		self.cachedScore( {
			round_id: self.round_id(),
			round_hcp : self.round_hcp(),
			hole_id : hole,
			hole_score : self.currentHoleScore(),
			round_tee : self.round_tee(),
			hit_fairway : self.hitFairway(),
			hit_green : self.hitGreen()
		});

	};

	self.saveHoleScore = function(round_id, round_hcp, hole_id, hole_score, round_tee, fairway_hit, green_hit) {

		if (self.cachedScore() !== 0) {
	/*		console.log("cache: " +
				self.cachedScore().round_id + " " +
				self.cachedScore().round_hcp + " " +
				self.cachedScore().hole_id + " " +
				self.cachedScore().hole_score + " " +
				self.cachedScore().round_tee + " "
			); */


			if (self.cachedScore().round_id === round_id && self.cachedScore().round_hcp === round_hcp && self.cachedScore().hole_id === hole_id &&
				self.cachedScore().hole_score === hole_score &&
				self.cachedScore().round_tee === round_tee &&  self.cachedScore().fairway_hit === fairway_hit && self.cachedScore().green_hit === green_hit) {
				//console.log("cached: " + hole_id + " green hit: " + green_hit);
				return;
			}
		}

		var data = {
			round_id : round_id,
			round_hcp : round_hcp,
			hole_id : hole_id,
			hole_score : hole_score,
			round_tee : round_tee,
			fairway_hit : fairway_hit,
			green_hit : green_hit
		};

		apexEventProxy.createNewRoundScore(
			{ data : data },
			function (data)	{
				//console.log("score saved " + hole_id + " green hit: " + green_hit);
				self.cachedScore( {
					round_id: round_id,
					round_hcp : round_hcp,
					hole_id : hole_id,
					hole_score : hole_score,
					round_tee : round_tee,
					fairway_hit : fairway_hit,
					green_hit : green_hit

				});

				self.updateScoreCard(hole_score, hole_id);
				self.calcHcpPreview();

//				console.log("saved... " + round_id + " " + round_hcp + " " + hole_id + " " + hole_score + " " + round_tee);

			}
		);
	};

	self.saveScore = ko.computed(function() {
		if (typeof self.round_id() === 'undefined' || typeof self.round_hcp() === 'undefined' || self.holes().length === 0) {
			return false;
		}

//		console.log(self.holes().length);

///		console.log("trying to save... " + self.round_id() + " " + self.round_hcp() + " " + self.currentHole() + " " + self.currentHoleScore() + " " + self.round_tee());

		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());
	}).extend({throttle: 2000 });


	var inTransition = false;


	self.nextHole = function () {

		//$('#header_scorepage').css({opacity: '1'});

		if(!inTransition) {
			inTransition = true;
			var el = $('#holeHeader');
			var s_text = $('#s_text');


			var el2 = $('#dataDisplay');

			el2.transition({
				perspective: '1000',
				x: '-100%',
				duration: '375'
			}).transition({
				perspective: '1000',
				x: '100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '275'
			});

			//el.css({
			//	x: '0',



			el.transition({
				perspective: '1000',
				x: '-80px',
				opacity: '0',
				duration: '350',
				complete: function() {
					/*var e = el.offsetHeight;
					console.log(e);*/
				}
			}).transition({
				perspective: '1000',
				duration: '0',
				x: '80px',
				complete: function() {
					inTransition = false;
				}
			});

			setTimeout(function() {
				el.transition({
					perspective: '1000',
					x: '0',
					opacity: '1',
					duration: '250',
					complete: function() {  }
				});
			}, 350);

			/*.addClass('herpderp')
			.removeClass('herpderp')
			.transition({
				perspective: '1000',
				x: '300px',
				duration: '0',
				complete: function() {
					inTransition = false;
				}
			})
			.addClass('herpderp')
			.removeClass('herpderp')
			.transition({
				perspective: '1000',
				x: '0',
				opacity: '1',
				duration: '250',
				complete: function() {  }
			}); */

			/*var btns = $('#dataButtons');
			btns.transition({
				perspective: '1000',
				x: '-100%',
				duration: '350'
			}).transition({
				perspective: '1000',
				x: '100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '250'
			});*/



		}

		var curHole = parseInt(self.currentHole(), 10);

		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

		self.showPoints(false);
		self.noScoreEntered(true);

		var c_len = self.holes().length;
		if (curHole === c_len) {
			self.currentHole(1);
			self.setHoleData(1);
		}
		else {
			self.currentHole(curHole + 1);
			self.setHoleData(curHole + 1);
		}


		//$.mobile.changePage('#s_page', { transition: "slide",                                    allowSamePageTransition: true});
	};

	self.previousHole = function() {

		if(!inTransition) {
			inTransition = true;
			var el = $('#holeHeader');


			el.css({
				perspective: '1000',
				x: '0',
				opacity: '1',
			}).transition({
				perspective: '1000',
				x: '80px',
				opacity: '0',
				duration: '375',
				complete: function() {
					el.css({
						x: '-80px',
					});
					inTransition = false;
				}
			});

			setTimeout(function() {
				el.transition({
					perspective: '1000',
					x: '0',
					opacity: '1',
					duration: '275',
				});
			}, 375);

			var el2 = $('#dataDisplay');

			el2.transition({
				perspective: '1000',
				x: '100%',
				duration: '350'
			}).transition({
				perspective: '1000',
				x: '-100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '250'
			});

			var btns = $('#dataButtons');

			/*btns.transition({
				perspective: '1000',
				x: '100%',
				duration: '350'
			}).transition({
				perspective: '1000',
				x: '-100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '250'
			});*/
		}

		var curHole = parseInt(self.currentHole(), 10);

		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

		self.noScoreEntered(false);

		var c_len = self.holes().length;
		if (curHole === 1) {
			self.currentHole(c_len);
			self.setHoleData(c_len);
		}
		else {
			self.currentHole(curHole - 1);
			self.setHoleData(curHole - 1);
		}

		//$.mobile.changePage('#s_page', { transition: "slide", reverse: true,                                    allowSamePageTransition: true});
	};

	self.currentHolePoints = ko.computed(function() {
		var curHcpPar = parseInt(self.currentHoleHcpPar(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);

		if (self.noScoreEntered() || curScore === 0) {
			self.showPoints(false);
			return 0;
			}
		else {
			var y = curHcpPar - curScore + 2;
			self.showPoints(true);
			if (y > 0) {
				return (y + " pistettä");
				}
			else {
				return (0 + " pistettä");
			}
		}
	}).extend({throttle: 1 });

	self.setScore = function (hole, score, points, holePar) {
		for (var i = 0; i < self.roundScores().length; i++) {
			if (self.roundScores()[i].hole() === hole) {
				self.roundScores()[i].score(score);
				self.roundScores()[i].points(points);
				self.roundScores()[i].scoreToPar(score - holePar);
			}
		}
	};


	self.upScore = function () {
		if (self.hasSlid() === false) {
			var y = self.currentHoleScore();
/*			self.currentHoleScore(parseInt(y, 10) + 1);
			$("#score").animate({
				fontSize: "1.05em"
					}, 50, function() {
						$("#score").animate({
							fontSize: "1em"
						}, 300 );
					}
				); */
			var scoreEl = $(".scoreDisplay");

			self.currentHoleScore(parseInt(y, 10) + 1);

			scoreEl.transition({
				perspective: '100',
				rotateY: '360deg',
				duration: 250
			}).
			transition( {
				perspective: '0',
				rotateY: '0deg',
				duration: 0
			});
		}
		self.hasSlid(true);
	};

	self.downScore = function () {
		if (self.hasSlid() === false) {
			var y = self.currentHoleScore();

			var scoreEl = $(".scoreDisplay");


			if (self.currentHoleScore() > 0) self.currentHoleScore(y - 1);


			scoreEl.transition({
				perspective: '100',
				rotateY: '-360deg',
				duration: 250
/*				complete: function() {

				} */
			}).

/*			transition({
				perspective: '100',
				rotateY: '-360deg',
				duration: 100,
			}). */

			transition({
				perspective: '0',
				rotateY: '0deg',
				duration: 0
			});

		}
		self.hasSlid(true);
	};


	self.resetSlider = function () {
		self.hasSlid(false);
//		$("#slaidi").slider('value', 0);
		$(".ui-slider-handle").animate( { left: '50%', easing: 'swing' }, 100);
		self.sliderVal(0);
	};

	self.sliderMove = function () {
		var sVal = parseInt(self.sliderVal(), 10);
		var par = self.currentHolePar();


		if (sVal <25 && sVal >= 0 || sVal <= 0 && sVal > -25 ) {
			if (self.noScoreEntered() === true) {
				self.currentHoleScore(par);
			}
		}

		if (sVal >= 26) {
			if (self.noScoreEntered() === true) {
				self.currentHoleScore(par);
			}
			self.upScore();
		}

		if (sVal < -26) {
			if (self.noScoreEntered() === true) {
				self.currentHoleScore(par);
			}
			self.downScore();
		}

		self.noScoreEntered(false);
		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);
		var curHolePar = parseInt(self.currentHolePar(), 10);

		self.setScore(curHole, curScore, curPoints, curHolePar);

	};


/*	ko.bindingHandlers.uislider = {
		init: function (element, valueAccessor) {
			function setSliderValue(newValue) {
		//		var slider = $("#" + element.id);
				var slider = $("#slaidi");
				$(slider).slider();
				$(slider).slider( "option", "max", 50);
				$(slider).slider( "option", "min", -50);
			//	console.log(slider);
				slider.val(newValue);
				slider.slider('refresh');
				slider.on('slidechange', function () {
					valueAccessor()(slider.val());
				});
				slider.on('slidestop', function () {
					valueAccessor()(slider.val());
					self.resetSlider();
				});

				slider.on('stop', function() {
					valueAccessor()(slider.val());
				});

			}
			valueAccessor().subscribe(setSliderValue);
		}
	}; */



	ko.bindingHandlers.uislider = {
		init: function (element, valueAccessor, allBindingsAccessor) {
			var options = allBindingsAccessor().sliderOptions || {};
			$(element).slider(options);

			ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);

			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).slider("destroy");
			});
			ko.utils.registerEventHandler(element, "slide", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);

				var value = ko.unwrap(observable);
				$(element).slider('option', 'value', value);

			});

			ko.utils.registerEventHandler(element, "slidestop", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});



		},
/*		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			if (isNaN(value)) {
				value = 0;
			}


			$(element).slider("value", value);
		} */
	};


	ko.bindingHandlers.mobileList = {
		'update': function (element, valueAccessor) {
			setTimeout(function () { //To make sure the refresh fires after the DOM is updated
				try {
					$(element).listview('refresh', true); //
				}
				catch (err) {
				}

			/* ei tunnu toimivan ko:n virtuaalielementtien kanssa, tehdään rumasti try/catchilla tän sijaan
				var instance = $.data(element, 'listview');
				if (instance) {
					$(element).listview('refresh', true);
					}
			*/
			}, 0);
		}
	};

    ko.bindingHandlers.mobileradio = {
		init: function (element, valueAccessor) {
			//setTimeout(function() {
			//	$(element).checkboxradio();
			//}, 0);
		},
		update: function (element, valueAccessor) {
			var value = valueAccessor();
			var valueUnwrapped = ko.utils.unwrapObservable(value);

			if (valueUnwrapped === $(element).val()) {
				$(element).prop("checked", true).checkboxradio("refresh");
			} else {
				$(element).removeProp("checked").checkboxradio("refresh");
			}

		}
	};

	ko.bindingHandlers.jqmValue = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			if (typeof ko.bindingHandlers.value.init !== 'undefined') {
				ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel);
			}
		},

		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			if (typeof ko.bindingHandlers.value.update !== 'undefined') {
				ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, viewModel);
			}

			var instance = $.data(element, 'selectmenu');
			if (instance) {
				$(element).selectmenu('refresh', true);
			}
		}
	};


	self.spinnerLoaded = ko.observable(false);

	self.loadPrefs = function() {

		if(!inTransition) {
			inTransition = true;
			if(self.activePage() === "prefs") return;
			self.activePage("prefs");


			if (self.loadedRoundStartTime() !== "") {
	//			var el = $("span:contains('" + self.loadedRoundStartTime() + "')");
	//			el.parent().parent().parent().parent().parent().attr('style', '');
				self.scrollPos(0);
				self.loadedRoundStartTime("");
			}



			//var spinner = $('#prefsPlayerHcp');


			//spinner.css({visibility: 'hidden', opacity: '0' });


			var backbtn = $('#pageBackButton');
			var prefs = $('#prefs');
			var prev = $('#f_page');
			var prev_content = $('#f_content');
			var prev_head = $('#f_header');
			var prefs_link = $('#prefs_link');
			var prefs_content = $('#prefs_content');
			var f_content = $('#f_outer');
			var header_front = $('#header_front');
			var f_text = $('#f_text');
			var former_title = $('#pageTitle');

			var creditsbtn = $('#creditsButton');

			var pageRight = $('#pageRight');

			var new_round_btn = $('#pageRight');

			f_text.removeClass('headerButton').addClass('headerTitle');

			//var pref_text = $('#pref_text');
			//pref_text.css({ textDecoration: 'none', fontWeight: '700'});




			setTimeout(function() {
				backbtn.css({
					perspective: '1000',
					x: '-100%',
					opacity: '0',
					visibility: 'visible',
					display: 'block',
				});

				prefs.css({
					transformOrigin: '100% 0',
					x: '-100%',
					display : 'block',
				});

				creditsbtn.css({
					perspective: '1000',
					x: '100%',
					opacity: '0',
					visibility: 'visible',
					display: 'block',
				});

				//spinner.css({visibility: 'visible' });


			}, 0);

			setTimeout(function() {
				former_title.transition({
					perspective: '1000',
					opacity: '0',
					duration: '350',
					x: '100%',
					complete: function() {
						former_title.css({ visibility: 'hidden', display: 'none' });
					}
				});

				new_round_btn.transition({
					perspective: '1000',
					opacity: '0',
					duration: '150',
					complete: function() {
						creditsbtn.transition({
							perspective: '1000',
							x: '0%',
							opacity: '1',
							duration: '350',
						});
					}
				});

				setTimeout(function() {
					backbtn.transition({
						perspective: '1000',
						x: '0%',
						duration: '250',
						opacity: '1',
					});
				}, 150);



				f_text.transition({
					perspective: '1000',
					duration: '400',
					marginRight: '0%',
					easing: 'easeOutCirc'

				});
//					paddingLeft: '2px'
				header_front.transition({
					perspective: '1000',
					x: '30%',
					duration: '350',
					textDecoration: '',

					complete: function() {
						prefs_link.css({ textDecoration: '', color: '#fefefe' });
						self.spinnerLoaded(true);

					}
				});


				f_content.transition({
					perspective: '1000',
					x: '75%',
					duration: '300',
					opacity: '0',
					easing: 'out',
					complete: function() {
						f_content.css({ visibility: 'hidden', x: '100%' });
						pageRight.css({ visibility: 'hidden', display: 'none' });
					}
				});


				prefs.transition({
					perspective: '1000',
					x: '0',
					easing: 'in',
					duration: '150',
					complete: function() {
						//spinner.transition({opacity: '1', duration: '50' });
					}
				});



			}, 1);

			setTimeout(function() {
				inTransition = false;
			}, 250);

			//pref_text.removeClass('headerButton:hover');

			/*pref_text.transition({
				opacity: '1',
				duration: '250'
			})*/
		}


	};

	self.hidePrefs = function() {

		/*(function() {
			var backbtn = $('#pageBackButton');
			backbtn.css({
				opacity: '0.3',
			});
		})();*/


		//$('#pageBackButton').addClass('headerButtonClicked');

		if(!inTransition) {
			self.saveGolfer();
			inTransition = true;

			var backbtn = $('#pageBackButton');

			self.activePage("front");

			var el = $('#prefs');
			var prev = $('#f_content');
			var prefs_link = $('#prefs_link');
			var prefs_content = $('#prefs_content');
			var prefs = $('#prefs');
			var f_content = $('#f_outer');

			var pageRight = $('#pageRight');

			var creditsbtn = $('#creditsButton');

			pageRight.css({ visibility: 'visible', display: 'block' });

			/*prefs_link.transition({
				perspective: '1000',
				marginRight: '100%',
				duration: '350',
			});*/

			var backbtn = $('#pageBackButton');

			var header_front = $('#header_front');
			var f_text = $('#f_text');
			var former_title = $('#pageTitle');

			var pref_text = $('#pref_text');
			//pref_text.css({ fontWeight: 'normal'});


			f_text.addClass('headerButton');
			f_text.removeClass('headerTitle');

			//pref_text.css({ textDecoration: 'underline'});

			former_title.css({ visibility: 'visible', display: 'block' }).transition({
				perspective: '1000',
				opacity: '1',
				duration: '350',
				x: '0%',
				complete: function() {

				}
			});

			var new_round_btn = $('#pageRight');

			new_round_btn.transition({
				perspective: '1000',
				opacity: '1',
				duration: '850',
			});

			creditsbtn.transition({
				perspective: '1000',
				opacity: '0',
				duration: '350',
				x: '100%',
				complete: function() {
					creditsbtn.css({ visibility: 'hidden', display: 'none' });
				}
			});



			f_content.css({transformOrigin: '100% 0', visibility: 'visible' }).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
				opacity: '1',
			});

			header_front.transition({
				perspective: '1000',
				x: '0',
				duration: '350',

			});

			f_text.transition({
				perspective: '1000',
				marginRight: '100%',
				duration: '100',
				paddingLeft: '2px'
			});
	//			paddingLeft: '0px'
	//			opacity: '0',

			(function() {
				backbtn.transition({
					perspective: '1000',
					duration: '450',
					x: '-100%',
					opacity: '0',
					complete: function() {
						//backbtn.css({visibility : 'hidden' });
						//$('#pageBackButton').removeClass('headerButtonClicked');
					}
				});
			})();

			prefs.css({transformOrigin: '100% 0'}).transition({
				perspective: '1000',
				x: '-100%',
				duration: '350',
				complete: function() {
					el.css({display : 'none' });

				}
			});

			prev.css({transformOrigin: '100% 0'}).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
				complete: function() {
					inTransition = false;
					self.spinnerLoaded(false);
					//spinner.css({ visibility: 'hidden' });
					//prev.css({display : 'block'});
				}
			});

		}

	}



	self.scoreCardClicked = false;

	self.showScoreCard = function () {

		if (self.scoreCardClicked === false) {

			var btn = $('#s_card');


			self.scoreCardClicked = true;
			self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

			//$.mobile.changePage("#scoreCard", { transition: 'slidedown'});

			var el = $('#scoreCard');


			var hh = $('#header_scorepage');

			hh.css({
				opacity: '0',
				duration: '100',
			});


			//el.css({display : 'block' });
			//el.css({ zIndex = '1000' });


			//el.transition({y : '-1024px'});
			//el.css({display: 'block'});

			el.css({transformOrigin: '100% 0'}).transition({
				perspective: '1000',
				y: '-100%',
				duration: '0',
				complete: function() {
					el.css({display : 'block', position: 'absolute' });


				}
			}).transition( {
				perspective: '1000',
				y: '0px',
				x: '0px',
				top: '0',
				bottom: '0',
				right: '0',
				left: '0',
				duration: '300',
				easing: 'in',
				complete: function() {

				}
			}).transition({
				perspective: '1000',
				y: '-9px',
				duration: '90',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '100',
			}).transition({
				perspective: '1000',
				y: '-3px',
				duration: '40',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '40',
			}).transition({
				perspective: '1000',
				y: '-1px',
				duration: '20',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '20',
			});




	/*s.transition( {
				perspective: '1000',
				height: '0px',
				opacity: '0',
				duration: '250',
				complete: function() {
					s.css('display', 'none');
				}
			}); */



		}

	};

	(function() {
		var supportTouch =
			$.support.touch,
			scrollEvent = "touchmove scroll",
			touchStartEvent = supportTouch ? "touchstart" : "mousedown",
			touchStopEvent = supportTouch ? "touchend" : "mouseup",
			touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
		$.event.special.swipeupdown = {
			setup: function() {
				var thisObject = this;
				var $this = $(thisObject);
				$this.bind(touchStartEvent, function(event) {
					var data = event.originalEvent.touches ?
							event.originalEvent.touches[ 0 ] :
							event,
							start = {
								time: (new Date).getTime(),
								coords: [ data.pageX, data.pageY ],
								origin: $(event.target)
							},
							stop;

					function moveHandler(event) {
						if (!start) {
							return;
						}
						var data = event.originalEvent.touches ?
								event.originalEvent.touches[ 0 ] :
								event;
						stop = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ]
						};

						// prevent scrolling
						if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
							event.preventDefault();
						}
					}
					$this
							.bind(touchMoveEvent, moveHandler)
							.one(touchStopEvent, function(event) {
						$this.unbind(touchMoveEvent, moveHandler);
						if (start && stop) {
							if (stop.time - start.time < 1000 &&
									Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
									Math.abs(start.coords[0] - stop.coords[0]) < 75) {
								start.origin
										.trigger("swipeupdown")
										.trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
							}
						}
						start = stop = undefined;
					});
				});
			}
		};
		$.each({
			swipedown: "swipeupdown",
			swipeup: "swipeupdown"
		}, function(event, sourceEvent){
			$.event.special[event] = {
				setup: function(){
					$(this).bind(sourceEvent, $.noop);
				}
			};
		});

	})();




	self.closeScoreCard = function() {
		self.scoreCardClicked = false;
		//$.mobile.changePage('#s_page', { transition: 'slidedown', reverse:true });

		var el = $('#scoreCard');

		var hh = $('#header_scorepage');

		el.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			y: '-100%',
			duration: '300',
			easing: 'in-out',
			complete: function() {
				el.css({display : 'none'});
				hh.transition({
					opacity: '1',
					duration: '50',
				});

				var b = $('#bottom');
				var s_foot = $('#s_footer');

				b.css({
					webkitFilter: ''
				});
				s_foot.css({
					webkitFilter: ''
				});
			}
		});
	};


	self.showCredits = function() {
		var credits = $('#credits');
		credits.css({
			y: '100%',
			display: 'block',
		});

		credits.transition({
			perspective: '1000',
			y: '0%',
			duration: '250',
			easing: 'easeOutCirc',
		});
	}

	self.hideCredits = function() {
		var credits = $('#credits');
		credits.transition({
			perspective: '1000',
			y: '100%',
			duration: '250',
			easing: 'easeInQuad',
			complete: function() {
				credits.css({
					display: 'none',
				});
			}
		});
	}


	self.getCourseData = function (course_id, round_id, cb) {

		var data = { course_id : course_id };

		for (var i = 0; self.courseList().length > i; i++) {
			if (self.courseList()[i].id === course_id) {

				self.courseName(self.courseList()[i].name);
				self.courseAlias(self.courseList()[i].alias);

				self.courseCrYellowMen(self.courseList()[i].crYellowMen);
				self.courseSlYellowMen(self.courseList()[i].slYellowMen);
				self.courseCrYellowLadies(self.courseList()[i].crYellowLadies);
				self.courseSlYellowLadies(self.courseList()[i].slYellowLadies);

				self.courseCrBlueMen(self.courseList()[i].crBlueMen);
				self.courseSlBlueMen(self.courseList()[i].slBlueMen);

				self.courseCrBlueLadies(self.courseList()[i].crBlueLadies);
				self.courseSlBlueLadies(self.courseList()[i].slBlueLadies);


				self.courseCrRedMen(self.courseList()[i].crRedMen);
				self.courseSlRedMen(self.courseList()[i].slRedMen);

				self.courseCrRedLadies(self.courseList()[i].crRedLadies);
				self.courseSlRedLadies(self.courseList()[i].slRedLadies);

				self.courseCrWhiteMen(self.courseList()[i].crWhiteMen);
				self.courseSlWhiteMen(self.courseList()[i].slWhiteMen);

				break;
			}
		}

		apexEventProxy.getHoleData(
			{ data : data },
			function (data) {
				var i;
				var h = data.holes.length;

//				console.log("round_tee: " + self.round_tee());

				for (i = 0; i < h; i++) {
					self.holes.push({
						hole_number: ko.observable(data.holes[i].hole_number),
						hole_par: ko.observable(data.holes[i].par),
						hole_hcp: ko.observable(data.holes[i].hcp),
						hole_length_yellow: ko.observable(data.holes[i].length_yellow),
						hole_length_blue: ko.observable(data.holes[i].length_blue),
						hole_length_white: ko.observable(data.holes[i].length_white),
						hole_length_red: ko.observable(data.holes[i].length_red)
					});
				}

				self.setHoleData(self.currentHole());

				if (round_id) self.getRoundScores(round_id, function() { cb() });
				else cb();
//				else self.calcPlayingHcp(self.playerExactHcp());


//				self.fillScoreCard(self.round_hcp()); // f

			}
		);

/*		var hcp = self.playerPlayingHcp();
		self.fillScoreCard(hcp); */
	};

	self.leaveRound = function () {

		if(!inTransition) {
			inTransition = true;

			var round_id = self.round_id();

			self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

			if (self.firstRun() === true) {
				self.firstRun(false);
			}

			if (self.roundEndTime() === "" && self.validateRound() === true)
			{
				var d = new Date();
				d = d.format("yyyy-mm-dd HH:MM:ss");
				var data = {
					round_id : round_id,
					end_time : d
				};
				apexEventProxy.endRound(
					{ data : data },
					function (data) {

					}
				);
			}

			for (var i = 0; i < self.roundList().length; i++) {
				if (self.roundList()[i].id === self.round_id()) {
					self.roundList()[i].score(self.totalScore());
					self.roundList()[i].par(self.coursePar());

				}
			}

			clearInterval(clock);

			self.roundEndTime("");
		//	self.scoreCard.removeAll();
			self.roundScores.removeAll();
			self.prePopulateScores();
			self.newRoundClicked = false;


			var f_header = $('#header_front');

			(function() {
				f_header.transition({ x: '-50%', opacity: '0', display: 'block', duration: '0' });
			})();


			var header_score = $('#header_scorepage');

			var c_outer = $('#c_outer');
			c_outer.css({
				visibility: 'hidden',
			});

			var btn = $('#s_back');

			header_score.transition({
				perspective: '1000',
				x: '50%',
				opacity: '0',
				duration: '350',
				complete: function() {

				}
			});

			setTimeout(function() {
				header_score.css({ display: 'none', opacity: '1' });
			}, 350);

			(function() {
				setTimeout(function() {
					f_header.transition({
						perspective: '1000',
						x: '0%',
						opacity: '1',
						duration: '350',
					});
				}, 0);
			})();

			var s_page = $('#s_page');
			var f_outer = $('#f_outer');

			f_outer.css({ x: '-100%', display: 'block', visibility: 'visible'});

			s_page.transition({
				perspective: '1000',
				x: '50%',
				duration: '350',
				opacity: '0',
				complete: function() {
					s_page.css({ display: 'none', opacity: '1' });
					inTransition = false;
				}
			});

			f_outer.transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
			});

			var c_sel = $('#courseSelect');
			c_sel.css({ marginLeft: '100%' });
		}
	};

	self.newRoundClicked = false;
	var clock;

	self.startNewRound = function(course_id, course_name) {

		if(!inTransition) {

			self.loadingRound(course_id);

			if (self.newRoundClicked === false) {
			   /*var interval = setInterval(function(){
					$.mobile.loading('show', {
						theme: 'b',
						textVisible: true,
						text: '  '
					});
					clearInterval(interval);
				},1);*/
				self.newRoundClicked = true;
				self.holes.removeAll();
				self.roundFinished(false);

				var data = { course_id : course_id };
				apexEventProxy.createNewRound(
					{ data : data},
					function (data) {
						var round_id = data.round_id;
						var start_time = data.round_start_time;
						var data = {
							round_id: round_id
						};
						apexEventProxy.createNewRoundGolfer(
							{ data : data },
							function (data)	{
								self.round_id(round_id);
								self.course_id(course_id);
								self.roundStartTime(start_time.date);
								self.round_hcp(self.playerExactHcp());

								//console.log(self.round_tee());

								//self.round_tee(self.playerDefaultTee());

								self.getCourseData(course_id, round_id, function() {

									self.saveHoleScore(round_id, self.playerExactHcp(), 1, 0, self.playerDefaultTee(), false, false); // TODO: pitäis tehdä controllerissa

									self.roundList.unshift({
										id : round_id,
										course_name : course_name,
										start_time : start_time,
										score : ko.observable(0),
										par : ko.observable(0)
									});

									self.loadRecentCourses();

									self.currentHole(1); // kymppireiältä alkavat kierrokset?
									self.setHoleData(1);

									/*interval = setInterval(function(){
										$.mobile.loading('hide');
										clearInterval(interval);
									},1);*/

									// showScorePage

									self.calcRoundDuration();
									clock = setInterval(function() {
										self.calcRoundDuration();
									} , 2000);

									self.showScorePage(true);

									setTimeout(function() {
										self.loadingRound('');
									}, 500);

									/*$.mobile.changePage('#s_page', { transition: "slide", allowSamePageTransition: true});*/
								});
							}
						);
					}

				);
			}

			else return;
		}
	};


	self.highlightLoaded = function(start_time) {
		if (start_time == self.loadedRoundStartTime()) return true;

		else return false;
	};

/*	self.highlightDeleted = function(start_time) {
		if (start_time == self.clickedRoundStartTime()) {
			if (self.highlightLoaded(start_time) === true) {
				self.loadedRoundStartTime("");
			}
			return true;
		}

		else return false;
	}; */




	self.loadRound = function(round_id, start_time) {

		if(!inTransition) {
			inTransition = true;

			self.loadingRound(round_id);


			self.roundFinished(false);

			self.loadedRoundStartTime(start_time);
			self.holes([]);

			var data = { round_id : round_id };
			apexEventProxy.getRound(
				{ data : data },
				function (data) {
					var course_id = data.round.course_id;
					var start_time = data.round.start_time;
					var end_time = data.round.end_time;
					self.getCourseData(course_id, round_id, function() {
						self.round_id(round_id);
						self.course_id(course_id);
						self.roundStartTime(start_time.date);
						if (end_time === null) {
							self.roundEndTime("");
						}
						else {
							self.roundEndTime(end_time.date);
						}

						self.calcRoundDuration();
						var clock = setInterval(function() {
							self.calcRoundDuration();
						} , 2000);

						inTransition = false;
						self.showScorePage();

						setTimeout(function() {
							self.loadingRound('');
						}, 500);

					});
				}
			);
		}
	};

	self.el = ko.observable();

	var r_del;

	self.showDeleteRoundButton = function(round_id, start_time) {
		self.roundToDelete(round_id);

//		var row = $(event.srcElement.offsetParent);
		var row = $(event.target.offsetParent);
		self.deletionConfirmed(false);

		if(r_del) {
			if(row.hasClass('toBeDeleted') && r_del.hasClass('toBeDeleted')) {
				//
			}
			else {
				r_del.transition({
					perspective: '1000',
					x: '0px',
					duration: '150',
				});
				r_del.removeClass('toBeDeleted');
				$('.deleteBtn').removeClass('confirmDelete');
				$('.fa-trash-o').removeClass('shake');
			}
		}

		row.css({
			zIndex: '1',
		});

		row.transition({
			perspective: '1000',
			x: '-54px',
			duration: '150',
		});

		row.addClass('toBeDeleted');
		r_del = row;


	};

	self.hideDeleteRoundButton = function(round_id, start_time) {

		if(r_del) {
			var row = $(event.target.offsetParent);
			row.transition({
				perspective: '1000',
				x: '0px',
				duration: '150',
			});

			row.removeClass('toBeDeleted');
			r_del.removeClass('toBeDeleted');

			$('.deleteBtn').removeClass('confirmDelete');
			$('.fa-trash-o').removeClass('shake');

			r_del = null;
			self.deletionConfirmed(false);
			self.roundToDelete('');
		}
	};


	self.deletionConfirmed = ko.observable(false);

	self.confirmDelete = function(round_id, item, event) {

		var delBtn = $(event.target.offsetParent);
		var row = r_del;

		if(self.deletionConfirmed() == false) {
			delBtn.addClass('confirmDelete');

			var e = $(delBtn).nextAll('.fa:first');
			var icon = e.context.firstElementChild.firstElementChild;

			$(icon).addClass('shake');

			self.deletionConfirmed(true);
		}
		else {
			self.deleteRound(round_id, delBtn, row);
		}
	}

	self.deleteRound = function(round_id, delBtn, row) {

		if(!inTransition) {
			inTransition = true;

			row.css({ zIndex: '0' });
			row.transition({
				perspective: '1000',
				x: '120%',
				opacity: '0',
				duration: '350',
			});

			delBtn.transition({
				x: '100%',
				duration: '350',
				complete: function() {
					row.css({ height: '0', display: 'none' });
					delBtn.css({ height: '0', display: 'none' });
					self.deletionConfirmed(false);

					inTransition = false;

					setTimeout(function() {
						var data = { round_id : round_id };
						//console.log(data);
						apexEventProxy.deleteRound(
						{ data : data },
							function (data) {
								//console.log(data);
							}
						);

						for (var i = 0; i < self.roundList().length; i++) {
							if (self.roundList()[i].id === round_id) {
								self.roundList.splice(i, 1);
								if (self.roundList().length === 0) {
										self.firstRun(true);
								}
							}
							self.clickedRoundStartTime("");
						}
					}, 40);
				}
			});
		}
	};


	self.cancelRoundDelete = function() {
		if (self.clickedRoundStartTime() !== "") {
	//		var el = $("span:contains('" + self.clickedRoundStartTime() + "')");
		//	el.parent().parent().parent().parent().parent().attr('style', '');
			self.clickedRoundStartTime("");
		}
		$("#delPopUp").popup( "close", { transition: "fade" });
	};

	self.getRoundScores = function(round_id, cb) {

		var data = { round_id : round_id };
		apexEventProxy.getRoundScores(
			{ data : data },
			function (data) {

				var p_hcp;

				if (data.scores.length === 0) {
					self.round_hcp(self.playerExactHcp());
					//self.round_tee(self.playerDefaultTee());
					self.calcPlayingHcp(self.playerExactHcp());
//					console.log("p_hcp data scores len 0 " + p_hcp);
				}
				else {
					var hcp, tee;
					for (var i = 0; i < data.scores.length; i++) {
						for (var z = 0; z < self.roundScores().length; z++) {
							if (self.roundScores()[z].hole() === data.scores[i].hole_id) {
								self.roundScores()[z].score(data.scores[i].score);
							self.roundScores()[z].fairway_hit(data.scores[i].fairway_hit);							self.roundScores()[z].green_hit(data.scores[i].green_hit);

								hcp = data.scores[i].round_hcp;
								tee = data.scores[i].round_tee;
							}

						}
					}
					self.round_hcp(hcp);
					self.round_tee(tee);
					self.calcPlayingHcp(hcp);

				}

				//console.log("getroundscore round_tee", self.round_tee());

				self.locale_tee(self.translate_tee());

				var hole = 0;
				for (var x = 0; x < self.holes().length; x++) {
					if (self.roundScores()[x].score() === 0 && hole === 0) {
						hole = self.roundScores()[x].hole();
					}
				}

				if (hole !== 0) {
					self.currentHole(hole);
					self.setHoleData(hole);
					self.noScoreEntered(true);
				}
				else {
					self.currentHole(1);
					self.currentHoleScore(parseInt(self.roundScores()[0].score(), 10));
					self.setHoleData(1);
					self.noScoreEntered(false);
				}

				cb();
			}
		);
	};

	self.getRoundList = function (callback) {
		var a;

	   /*var interval = setInterval(function(){
				$.mobile.loading('show', {
					theme: 'b',
					textVisible: true,
					text: '  '
				});
			clearInterval(interval);
		},1);*/

		apexEventProxy.getRoundList(
			{ a : a },
			function (data) {
				if (data.message !== "fail") {
					for (var i = 0, m = data.rounds.length; i < m; i++) {
						var l = {
							id: data.rounds[i].id,
							course_name: data.courses[i].name,
							start_time: data.rounds[i].start_time,
							score: ko.observable(data.scores[i]),
							par: ko.observable(data.pars[i])
						}
						self.roundList.push(l);
					}

					if (self.roundList().length > 0) {
						self.firstRun(false);
					}
					else {
						self.firstRun(true);
					}
				}
				else {
					self.firstRun(true);
				}

				/*interval = setInterval(function() {
					$.mobile.loading('hide');
					clearInterval(interval);
				},1);*/

			}
		);
	};

	self.getRoundList();


	self.getCourseList = function () {
		var a;
		apexEventProxy.getCourseList(
		{ a : a },
		function(data) {

			data.courses.sort(function(a, b) {
				var key1 = a.name;
				var key2 = b.name;
				if (key1 < key2) return -1;
				if (key1 > key2) return 1;
				return 0;
			});


			for (var i = 0, m = data.courses.length; i < m; i++) {
				self.courseList.push(data.courses[i]);
				}
			}
		);
	};

	self.saveGolfer = function (callback) {
		var data = {
			handicap: self.playerExactHcp(),
			tee: self.playerDefaultTee(),
			gender: self.playerGender()
		};
		apexEventProxy.saveGolferData(
			{ data : data },
			function (data) {
				//
			}
		);
		//$.mobile.changePage('#f_page', { transition: "slide" });
	};

	self.getGolferData = function (callback) {
			var a;
			apexEventProxy.getGolferData(
			{ a : a },
			function(data) {
				self.playerName(data.golfer.name);
				self.playerExactHcp(data.golfer.handicap);
				self.playerDefaultTee(data.golfer.tee);
				self.playerGender(data.golfer.gender);
				self.hcpScroller();
			}
		);
	};

	self.totalToPar = ko.computed(function() {
		if (self.holes().length > 0 && self.roundScores().length > 0) {
			var toPar = 0;
			var y;
			for (var i = 0; i < self.roundScores().length; i++) {
				y = parseInt(self.roundScores()[i].score(), 10);
				if (y > 0) toPar += y - parseInt(self.holes()[i].hole_par(), 10);
			}

			return toPar;
		}
		else return false;

	}).extend({throttle: 350 });

	self.fairwayPercentage = ko.computed(function() {
		if (self.holes().length > 0 && self.roundScores().length > 0) {

			var x = self.hitFairway();
			var c_hole = self.currentHole() -1;
			self.roundScores()[c_hole].fairway_hit(x);

			var fwsHit = 0;
			var c_len = 0;
			//console.log(self.roundScores().length);
			for (var i = 0; i < self.roundScores().length; i++) {
				if(i < self.holes().length) {
					//console.log(typeof self.holes()[i].hole_par);
					if (self.holes()[i].hole_par() !== 3) {
						c_len++;
						if (self.roundScores()[i].fairway_hit() === true) {
							fwsHit++;
						}
					}
				}
			}

			/*console.log("fws ", fwsHit);
			console.log("c_len ", c_len);*/

			return Math.round(fwsHit / c_len * 100) + "% " + "(" + fwsHit + "/" + c_len + ")";
		}

		else return false;
	}).extend({throttle: 350 });

	self.greenPercentage = ko.computed(function() {
		var x = self.hitGreen();
		var c_hole = self.currentHole() -1;
		self.roundScores()[c_hole].green_hit(x);

		if (self.holes().length > 0 && self.roundScores().length > 0) {
			var gHit = 0;
			var c_len = self.roundScores().length;
			for (var i = 0; i < self.roundScores().length; i++) {
				if (self.roundScores()[i].green_hit() == true) {
					gHit++;
				}
			}

			return Math.round(gHit / c_len * 100) + "% " + "(" + gHit + "/" + c_len + ")";
		}
		else return false;
	}).extend({throttle: 350 });

	self.validateRound = ko.computed(function() {
		if (self.roundFinished() === true) {
			if (self.roundEndTime() === "")
			{
				var d = new Date();
				d = d.format("yyyy-mm-dd HH:MM:ss");

				var data = {
					round_id : self.round_id(),
					end_time : d
				};
				apexEventProxy.endRound(
					{ data : data },
					function (data) {
						self.roundEndTime(d);
					}
				);

			}
			return true;
		}

		if (self.holes().length > 0 && self.roundScores().length > 0)
		{

			if (self.roundEndTime() !== "") {
				self.roundFinished("true");
				return true;
			}

			var h = self.holes().length;
			for (var i = 0; i < h; i++) {
				var y = parseInt(self.roundScores()[i].score(), 10);
				if (y === 0) {
					return false;
				}
			}

			self.roundFinished("true");
			return true;
		}
		else return false;

	}).extend({throttle: 250 });


	self.calcHcpPreview = ko.computed(function() {
		if (self.holes().length > 0) {
			var p = parseInt(self.totalPoints(), 10);
			var hcp = parseFloat(self.round_hcp());

			var num_holes = parseInt(self.holes().length, 10);
			var par_points;

			if (num_holes === 9) par_points = 18;
			else par_points = 36;

			var group;
			group = self.getHcpGroup(hcp);

			if (p > par_points ) {
				while (p > par_points) {
					if (group == "9hole") {
						self.hcpPreview("Ei 9 reiän kierroksella");
						return;
					}
					hcp = hcp - (1 * group.factor);
					group = self.getHcpGroup(hcp);
					p--;
				}
				self.hcpPreview(parseFloat(hcp).toFixed(1));
			}

			else {
				if (group == "9hole") {
					self.hcpPreview("Ei 9 reiän kierroksella");
					return;
				}
				if (p >= par_points - group.buffer)	self.hcpPreview(hcp);
				else self.hcpPreview(parseFloat(hcp + group.incr).toFixed(1));
			}
		}
		else return;

	}).extend({throttle: 250 });

	self.getHcpGroup = function(hcp) {

		var h = hcp;
		var num_holes = self.holes().length;
		var group = {};


		if (h >= 36.1) {
			group.factor = 1;
			group.buffer = 0;
			group.incr = 0;
		}

		if (h >= 26.5 && h <= 36.0) {
			group.factor = 0.5;
			group.incr = 0.2;
			if (num_holes === 9) group.buffer = 3;
			else group.buffer = 5;
		}

		if (h >= 18.5 && h <= 26.4) {
			group.factor = 0.4;
			group.incr = 0.1;
			if (num_holes === 9) group.buffer = 2;
			else group.buffer = 4;
		}

		if (h >= 11.5 && h <= 18.4) {
			if (num_holes === 9) return "9hole";
			else group.buffer = 3;
			group.factor = 0.3;
			group.incr = 0.1;
		}

		if (h >= 4.5 && h <= 11.4) {
			if (num_holes === 9) return "9hole";
			group.buffer = 2;
			group.factor = 0.2;
			group.incr = 0.1;
		}

		if (h <= 4.4) {
			if (num_holes === 9) return "9hole";
			group.factor = 0.1;
			group.incr = 0.1;
			group.buffer = 1;
		}

		return group;

	};

	self.fillScoreCard = function (round_hcp) {
		self.scoreCard.removeAll();

		for (var i = 0; i < self.holes().length; i++) {

			var t = ko.observable();
			t = self.getHolePoints(self.roundScores()[i].score(), self.holes()[i].hole_par(), self.holes()[i].hole_hcp(), round_hcp);

			self.roundScores()[i].points(t); // laitetaan scorenäkymälle näkyvään observableen

			var p = ko.observable();
			if (self.roundScores()[i].score() > 0) {
				p = self.roundScores()[i].score() - self.holes()[i].hole_par();
			}
			else { p = 0; }

			var hole_len;
			if (self.round_tee() === "yellow") hole_len = self.holes()[i].hole_length_yellow();
			else if (self.round_tee() === "blue") hole_len = self.holes()[i].hole_length_blue();
			else if (self.round_tee() === "white") hole_len = self.holes()[i].hole_length_white();
			else if (self.round_tee() === "red") hole_len = self.holes()[i].hole_length_red();



			var line = {};

			line.hole_number = self.holes()[i].hole_number;
			line.hole_par = self.holes()[i].hole_par;
			line.hole_hcp = self.holes()[i].hole_hcp;
			line.hole_length = hole_len;
			line.score = self.roundScores()[i].score;
			line.scoreToPar = ko.observable(p);
			line.points = ko.observable(t);


			self.scoreCard.push(line);
//			self.calcHcpPreview();

		}

		self.calcHcpPreview();

	};
//	.extend( { throttle: 5 });

	self.updateScoreCard = function(score, hole) {
		var h = hole - 1;
		var h_points = self.getHolePoints(score, self.holes()[h].hole_par(), self.holes()[h].hole_hcp(), self.playerPlayingHcp());


		self.roundScores()[h].points(h_points);

		var p;
		if (self.roundScores()[h].score() > 0) {
			p = score - self.holes()[h].hole_par();
		}
		else p = 0;

		self.scoreCard()[h].score(score);
		self.scoreCard()[h].scoreToPar(p);
		self.scoreCard()[h].points(h_points);
	};



	self.getHolePoints = function(score, par, hole_hcp, round_hcp) {

		var crhcp = parseInt(round_hcp);
		var baseadj, hcpholes, hole_hcp_par;
		baseadj = Math.floor(crhcp / 18);

		hcpholes = (crhcp.mod(18));

		if (hcpholes >= hole_hcp) {

			hole_hcp_par = par + baseadj + 1;
			}
		else {
			hole_hcp_par = par + parseInt(baseadj, 10);
			}

		if (score === 0)
			{
//				console.log("no score");
				return 0;
			}
		else {
			var y = hole_hcp_par - score + 2;
			if (y > 0)
			{
//				console.log(y + " points");
				return y;
			}
			else
			{
//				console.log(y + " points");
				return 0;
			}
		}
	};

	self.showStats = function() {
		var stats = $('#stats');
		var holedata = $('#holeData');

		var sc = $('#dataDisplay');


		if(stats.is(":visible")) {
			return;
		}



		stats.css({
			opacity: '0',
			display: 'block',
		});


		holedata.transition({
			opacity: '0',
			duration: '350',
			complete: function() {
				holedata.css({
					display: 'none',
				});
			}
		});

		stats.transition({
			opacity: '1',
			duration: '350',
		});


		$('#statsBtn').addClass("activeBtn").removeClass("passiveBtn");
		$('#dataBtn').addClass("passiveBtn").removeClass("activeBtn");




	};

	self.showHoledata = function() {
		var stats = $('#stats');
		var holedata = $('#holeData');

		//var sc = $('#dataDisplay');


		if(holedata.is(":visible")) {
			return;
		}

		stats.transition({
			opacity: '0',
			duration: '350',
			complete: function() {
				stats.css({ display: 'none'});
			}
		});

		holedata.css({
			display: 'block',
		});

		holedata.transition({
			opacity: '1',
			duration: '350',
			complete: function() {

			}
		});

		$('#statsBtn').addClass("passiveBtn").removeClass("activeBtn");
		$('#dataBtn').addClass("activeBtn").removeClass("passiveBtn");
	};


	self.getGolferData();
	self.getCourseList();

	var scroller_init = false;

	self.hcpScroller = function () {
		if(scroller_init == true) return;
		var whl1 = {
		'-3':'-3','-2':'-2','-1':'-1','0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10','11':'11','12':'12','13':'13','14':'14','15':'15','16':'16','17':'17','18':'18','19':'19','20':'20','21':'21','22':'22','23':'23','24':'24','25':'25','26':'26','27':'27','28':'28','29':'29','30':'30','31':'31','32':'32','33':'33','34':'34','35':'35','36':'36','37':'37','38':'38','39':'39','40':'40','41':'41','42':'42','43':'43','44':'44','45':'45','46':'46','47':'47','48':'48','49':'49','50':'50','51':'51','52':'52','53':'53', '54':'54'
		};

		var whl2 = {'0':'.0','1':'.1','2':'.2','3':'.3','4':'.4','5':'.5','6':'.6','7':'.7','8':'.8','9':'.9'
			};

		var wheel = [{},{}];

		wheel[0]['Wheel1'] = whl1;
		wheel[1]['Wheel2'] = whl2;

		$('#i').scroller({
			display: 'inline',
			mode: 'scroller',
			theme: 'ios7',
			wheels: wheel,
			width: 50,
			height: 30,
			showLabel: false,
			formatResult: function (a) {
				var i = a[0] + "." + a[1];
//				var i = a[0] + a[1];
				return i;
			}
		});

		var hcp = parseFloat(self.playerExactHcp());
		hcp = hcp.toFixed(1);
		var t = [];
		t = hcp.split(".");

		$('#i').scroller('setValue', t, true, 1);

		scroller_init = true;

	};


	self.loadCourseSelect = function () {

		if(!inTransition) {
			inTransition = true;

			$('#fullCourseList').css({visibility: 'hidden'});

			self.round_tee(self.playerDefaultTee());

		   /*var interval = setInterval(function(){
				$.mobile.loading('show', {
					theme: 'b',
					textVisible: true,
					text: '  '
				});
				clearInterval(interval);
			},1); */



			if (self.loadedRoundStartTime() !== "") {
				self.scrollPos(0);
			}
			self.loadedRoundStartTime("");

			var c_outer = $('#c_outer');

			var f_outer = $('#f_outer');
			var header_front = $('#header_front');
			var header_c = $('#header_courselist');
			var c_sel = $('#courseSelect');

			var btn = $('#pageRight');


			setTimeout(function() {
				header_c.css({
					x: '50%',
					opacity: '0',
					display: 'block',
					visibility: 'visible',
				});

				c_outer.css({
					x: '100%',
					opacity: '1',
					visibility: 'visible',

				});
				c_sel.css({
					visibility: 'visible',
					display: 'block',
					x: '100%',
					marginLeft: '0%',

				});
			}, 0);


			setTimeout(function() {
				header_front.transition({
					perspective: '1000',
					x: '-50%',
					duration: '350',
					opacity: '0',
					complete: function() {
						header_front.css({display: 'none'});
					}
				});

				header_c.transition({
					perspective: '1000',
					x: '0%',
					opacity: '1',
					duration: '350',
				});



				f_outer.transition({
					perspective: '1000',
					x: '-100%',
					duration: '350',
					opacity: '0',
					complete: function() {
						f_outer.css({
							visibility: 'hidden',
							opacity: '1',
						});

						inTransition = false;


						if(self.recentlyPlayedCourses().length == 0) {
							self.courseListVisible(true);
						}

						$('#fullCourseList').css({visibility: 'visible'});




					   /*var interval = setInterval(function(){
							$.mobile.loading('hide');
							clearInterval(interval);
						},1);*/
					}
				});

				c_outer.transition({
					perspective: '1000',
					x: '0%',
					duration: '350',
				});



			}, 1);
		}
	};

	self.hideCourseSelect = function() {

		if(!inTransition) {
			inTransition = true;

			var header_front = $('#header_front');
			var header_c = $('#header_courselist');

			var c_outer = $('#c_outer');

			var f_outer = $('#f_outer');
			var c_sel = $('#courseSelect');

			setTimeout(function() {
				header_front.css({
					x: '-100%',
					y: '0px',
					opacity: '0',
					display: 'block',
					visibility: 'visible',
				});

				f_outer.css({
					x: '-100%',
					visibility: 'visible',
				});

			}, 0);


			setTimeout(function() {
			
			
				header_c.transition({
					perspective: '1000',
					x: '50%',
					opacity: '0',
					duration: '150',
					complete: function() {
						header_c.css({ visibility: 'hidden', display: 'none'
						});
					}
				});
				
				
				(function() {
					setTimeout(function() {
						header_front.transition({
							perspective: '1000',
							x: '0%',
							opacity: '1',
							duration: '250',
						});
					}, 100);
					inTransition = false;
				})();		
			

				f_outer.transition({
					perspective: '1000',
					x: '0',
					duration: '350',
					complete: function() {
					}
				});

				c_outer.transition({
					perspective: '1000',
					x: '100%',
					duration: '350',
					complete: function() {
						c_sel.css({visibility: 'hidden' });

					}
				});







		
				
				
				

				/*header_front.transition({
					perspective: '1000',
					x: '0%',
					duration: '350',
					opacity: '1',
					complete: function() {
						header_front.css({
							//visibility: 'visible',
						});
						inTransition = false;
					}
				});*/
			}, 1);
		}
	}


	self.showScorePage = function(fromCourseList) {

		if(!inTransition) {
			inTransition = true;

			var s_content = $('#s_content');
			var s_page = $('#s_page');
			var header_score = $('#header_scorepage');

			if(!fromCourseList) {
				var f_outer = $('#f_outer');
				var header_front = $('#header_front');

				setTimeout(function() {
					header_score.css({
						x: '100%',
						display: 'block',
					});

					s_page.css({
						x: '100%',
						display: 'block',
						opacity: '0',
					});
				}, 0);


				setTimeout(function() {
					header_front.transition({
						x: '-50%',
						opacity: '0',
						duration: '350',
						complete: function() {
							header_front.css({display: 'none'});
						}
					});

					header_score.transition({
						perspective: '1000',
						x: '0%',
						duration: '350',
					});

					f_outer.transition({
						perspective: '1000',
						x: '-50%',
						duration: '350',
						opacity: '0',
						complete: function() {
							f_outer.css({visibility: 'hidden', opacity: '1', display: 'none' });
							inTransition = false;
						}
					});

					s_page.transition({
						perspective: '1000',
						x: '0%',
						opacity: '1',
						duration: '350',
					});
				}, 1);
			}

			else {

				var c_outer = $('#c_outer');
				var header_course = $('#header_courselist');



				setTimeout(function() {
					s_page.css({
						x: '100%',
						display: 'block',
					});
					header_score.css({
						x: '100%',
						display: 'block',
					});
				}, 0);


				setTimeout(function() {

					header_course.transition({
						x: '-50%',
						opacity: '0',
						duration: '350',
						complete: function() {
							header_course.css({display: 'none'});
						}
					});


					header_score.transition({
						perspective: '1000',
						x: '0%',
						duration: '350',
					});

					c_outer.transition({
						perspective: '1000',
						x: '-50%',
						duration: '350',
						opacity: '0',
						complete: function() {
							c_outer.css({visibility: 'hidden', opacity: '1', x: '100%' });
							inTransition = false;
						}
					});

					s_page.transition({
						perspective: '1000',
						x: '0%',
						duration: '350',
					});
				}, 1);
			}
		};
	}


	self.filteredCourseList = ko.observableArray();
	self.courseSearch = ko.observable("");

	self.filterCourses = ko.computed(function() {
		if(self.courseList().length > 0 && typeof self.courseSearch() !== 'undefined') {
			var f = self.courseSearch();
			if (f.length > 0)
				f = f.toLowerCase();

			var filt = ko.utils.arrayFilter(self.courseList(), function(item) {
				if (_.contains(item.name.toLowerCase(), f) || _.contains(item.alias.toLowerCase(), f)) {
					return item;
				}
			});

			//ko.mapping.fromJS(matches, {}, self.filteredMatches);
			//self.filteredMatches.valueHasMutated();
			self.filteredCourseList([]);
			self.filteredCourseList.push.apply(self.filteredCourseList, filt);
		}


	}).extend({ throttle: 350 });



	self.courseListVisible = ko.observable(false);

	self.toggleCourseList = function() {
		if (self.courseListVisible() == false) {
			self.courseListVisible(true);
		}
		else {
			self.courseListVisible(false);
		}
	}



	ko.bindingHandlers.fadeVisible = {
		init: function(element, valueAccessor) {
			var shouldDisplay = valueAccessor();
			var el = $(element);
			el.toggle(shouldDisplay);
		},
		update: function(element, valueAccessor) {
			// On update, fade in/out
			var shouldDisplay = valueAccessor();
			var el = $(element);

			if (shouldDisplay == true) {
				el.css({ display: 'block'});
				el.transition({ opacity: 1, queue: false, duration: '500' });
			}
			else {
				el.transition({ opacity: 0, queue: false, duration: '500' });
				el.css({ display: 'none'});
			}
		}
	};

	var teeSelectVisible = false;

	self.toggleTeeSelect = function() {
		if(teeSelectVisible == true) {
			self.hideTeeSelect();
		}
		else {
			self.showTeeSelect();
		}
	}

	self.showTeeSelect = function() {

		teeSelectVisible = true;

		var sel = $('#teeSelect');

		sel.css({ y: '-100%', display: 'block', boxShadow: '0 0 0 #666'  }).transition({
			perspective: '1000',
			y: '0%',
			duration: '250',
			opacity: '1',
			boxShadow: '0 6px 12px #999',
		});
	}

	self.hideTeeSelect = function() {
		teeSelectVisible = false;

		var sel = $('#teeSelect');

		sel.transition({
			perspective: '1000',
			y: '-100%',
			duration: '250',
			opacity: '0',
			boxShadow: '0 0 0 #666',
			complete: function() {
				sel.css({ display: 'none' });
			}
		});
	}
	
	
	self.ios = ko.observable(false);
	if (navigator.userAgent.match(/(iPhone)/g)) {
		self.ios(true);
	}
}

$(document).on('pageinit', function() {
	window.vm = new viewModel();
	ko.virtualElements.allowedBindings.mobileList = true; //


	(function launchedFromHome() {
		var x = (window.navigator.standalone) ? true : false;
		//console.log(x);
		vm.launchedFromHome(x);
		if(x) {
			document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
			//document.body.style.paddingBottom = '20px';
		}
	})();

	function reorient(e) {
		var portrait = (window.orientation % 180 == 0);
		if(!portrait) {
			if (navigator.userAgent.match(/(iPhone)/g) && vm.launchedFromHome() == false) {
				$('#root').removeClass('ios_top_minimal_ui');
				//.addClass('ios_top_minimal_ui');
			}
		}
	}
	window.onorientationchange = reorient;
	window.setTimeout(reorient, 0);

	$('input').bind('focusout', function() {

		setTimeout(function() {
			if(vm.launchedFromHome() == true) {
				$('#root').addClass('ios_top');
			}
			else if (navigator.userAgent.match(/(iPhone)/g) && vm.launchedFromHome() == false) {
				$('#root').addClass('ios_top_minimal_ui');
			}
		}, 10);
	});

	ko.applyBindings(vm, document.getElementById("root"));

	$('body').on('touchmove', function (e) {
	var searchTerms = '.scrollOuter',
		$target = $(e.target),
		parents = $target.parents(searchTerms);
		if (parents.length || $target.hasClass(searchTerms)) {
			// ignore as we want the scroll to happen
			// (This is where we may need to check if at limit)
		} else {
			e.preventDefault();
		}
	});


	$(document).off('pageinit');


});

/*! jQuery UI - v1.10.3 - 2013-05-21
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.slider.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)o.push(a);this.handles=n.add(t(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):this.range=t([])},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,a,o,r,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-u.values(e));(n>i||n===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(n=i,a=t(this),o=e)}),r=this._start(e,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-a.width()/2,top:e.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,a;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,a=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),a!==!1&&this.values(e,i,!0))):i!==this.value()&&(a=this._trigger("slide",t,{handle:this.handles[e],value:i}),a!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,a;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,a,o,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(o=this.options.step,n=a=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:a=this._valueMin();break;case t.ui.keyCode.END:a=this._valueMax();break;case t.ui.keyCode.PAGE_UP:a=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:a=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;a=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;a=this._trimAlignValue(n-o)}this._slide(i,r,a)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})})(jQuery);
/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);
/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true, nomen: true */
/*!
 * Mobiscroll v2.9.5
 * http://mobiscroll.com
 *
 * Copyright 2010-2014, Acid Media
 * Licensed under the MIT license.
 *
 */
(function ($) {

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase() + '-';
            }
        }
        return '';
    }

    function getCoord(e, c) {
        return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] : e['page' + c];
    }

    function init(that, options, args) {
        var ret = that;

        // Init
        if (typeof options === 'object') {
            return that.each(function () {
                if (!this.id) {
                    this.id = 'mobiscroll' + (++id);
                }
                if (instances[this.id]) {
                    instances[this.id].destroy();
                }
                new $.mobiscroll.classes[options.component || 'Scroller'](this, options);
            });
        }

        // Method call
        if (typeof options === 'string') {
            that.each(function () {
                var r,
                    inst = instances[this.id];

                if (inst && inst[options]) {
                    r = inst[options].apply(this, Array.prototype.slice.call(args, 1));
                    if (r !== undefined) {
                        ret = r;
                        return false;
                    }
                }
            });
        }

        return ret;
    }

    function testTouch(e) {
        if (e.type == 'touchstart') {
            touches[e.target] = true;
        } else if (touches[e.target]) {
            delete touches[e.target];
            return false;
        }
        return true;
    }

    var id = +new Date,
        touches = {},
        instances = {},
        extend = $.extend,
        mod = document.createElement('modernizr').style,
        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
        hasFlex = testProps(['flex', 'msFlex', 'WebkitBoxDirection']),
        prefix = testPrefix(),
        pr = prefix.replace(/^\-/, '').replace(/\-$/, '').replace('moz', 'Moz');

    $.fn.mobiscroll = function (method) {
        extend(this, $.mobiscroll.components);
        return init(this, method, arguments);
    };

    $.mobiscroll = $.mobiscroll || {
        util: {
            prefix: prefix,
            jsPrefix: pr,
            has3d: has3d,
            hasFlex: hasFlex,
            getCoord: getCoord,
            testTouch: testTouch
        },
        presets: {},
        themes: {},
        i18n: {},
        instances: instances,
        classes: {},
        components: {},
        defaults: {},
        userdef: {},
        setDefaults: function (o) {
            extend(this.userdef, o);
        },
        presetShort: function (name, c) {
            this.components[name] = function (s) {
                return init(this, extend(s, { component: c, preset: name }), arguments);
            };
        }
    };

    $.scroller = $.scroller || $.mobiscroll;
    $.fn.scroller = $.fn.scroller || $.fn.mobiscroll;

})(jQuery);

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true, nomen: true */
(function ($) {

    $.mobiscroll.classes.Scroller = function (elem, settings) {
        var m,
            v,
            dw,
            persp,
            overlay,
            ww, // Window width
            wh, // Window height
            mw, // Modal width
            mh, // Modal height
            lock,
            anim,
            theme,
            lang,
            click,
            hasButtons,
            scrollable,
            moved,
            start,
            startTime,
            stop,
            p,
            min,
            max,
            target,
            index,
            isLiquid,
            isModal,
            itemHeight,
            lines,
            timer,
            readOnly,
            preventChange,
            preventPos,
            wndw,
            doc,
            buttons,
            btn,
            that = this,
            e = elem,
            elm = $(e),
            s = extend({}, defaults, userdef),
            pres = {},
            iv = {},
            pos = {},
            pixels = {},
            wheels = [],
            elmList = [],
            input = elm.is('input'),
            visible = false;

        // Event handlers

        function onStart(e) {
            // Scroll start
            if (testTouch(e) && !move && !click && !btn && !isReadOnly(this)) {
                // Prevent touch highlight
                e.preventDefault();

                move = true;
                scrollable = s.mode != 'clickpick';
                target = $('.dw-ul', this);
                setGlobals(target);
                moved = iv[index] !== undefined; // Don't allow tap, if still moving
                p = moved ? getCurrentPosition(target) : pos[index];
                start = getCoord(e, 'Y');
                startTime = new Date();
                stop = start;
                scroll(target, index, p, 0.001);

                if (scrollable) {
                    target.closest('.dwwl').addClass('dwa');
                }

                if (e.type === 'mousedown') {
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(e) {
            if (scrollable) {
                // Prevent scroll
                e.preventDefault();
                e.stopPropagation();
                stop = getCoord(e, 'Y');
                scroll(target, index, constrain(p + (start - stop) / itemHeight, min - 1, max + 1));
            }
            if (start !== stop) {
                moved = true;
            }
        }

        function onEnd(e) {
            var time = new Date() - startTime,
                val = constrain(p + (start - stop) / itemHeight, min - 1, max + 1),
                speed,
                dist,
                tindex,
                ttop = target.offset().top;

            if (has3d && time < 300) {
                speed = (stop - start) / time;
                dist = (speed * speed) / s.speedUnit;
                if (stop - start < 0) {
                    dist = -dist;
                }
            } else {
                dist = stop - start;
            }

            tindex = Math.round(p - dist / itemHeight);

            if (!dist && !moved) { // this is a "tap"
                var idx = Math.floor((stop - ttop) / itemHeight),
                    li = $($('.dw-li', target)[idx]),
                    hl = scrollable;
                if (event('onValueTap', [li]) !== false) {
                    tindex = idx;
                } else {
                    hl = true;
                }

                if (hl) {
                    li.addClass('dw-hl'); // Highlight
                    setTimeout(function () {
                        li.removeClass('dw-hl');
                    }, 200);
                }
            }

            if (scrollable) {
                calc(target, tindex, 0, true, Math.round(val));
            }

            if (e.type === 'mouseup') {
                $(document).off('mousemove', onMove).off('mouseup', onEnd);
            }

            move = false;
            target = null;
        }

        function onBtnStart(e) {
            // Can't call preventDefault here, it kills page scroll
            if (btn) {
                btn.removeClass('dwb-a');
            }
            btn = $(this);
            // Active button
            if (!btn.hasClass('dwb-d') && !btn.hasClass('dwb-nhl')) {
                btn.addClass('dwb-a');
            }
            // +/- buttons
            if (btn.hasClass('dwwb')) {
                if (testTouch(e)) {
                    step(e, btn.closest('.dwwl'), btn.hasClass('dwwbp') ? plus : minus);
                }
            }
            if (e.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(e) {
            if (click) {
                clearInterval(timer);
                click = false;
            }
            if (btn) {
                btn.removeClass('dwb-a');
                btn = null;
            }
            if (e.type === 'mouseup') {
                $(document).off('mousedown', onBtnEnd);
            }
        }

        function onKeyDown(e) {
            if (e.keyCode == 38) { // up
                step(e, $(this), minus);
            } else if (e.keyCode == 40) { // down
                step(e, $(this), plus);
            }
        }

        function onKeyUp(e) {
            if (click) {
                clearInterval(timer);
                click = false;
            }
        }

        function onScroll(e) {
            if (!isReadOnly(this)) {
                e.preventDefault();
                e = e.originalEvent || e;
                var delta = e.wheelDelta ? (e.wheelDelta / 120) : (e.detail ? (-e.detail / 3) : 0),
                    t = $('.dw-ul', this);

                setGlobals(t);
                calc(t, Math.round(pos[index] - delta), delta < 0 ? 1 : 2);
            }
        }

        // Private functions

        function step(e, w, func) {
            e.stopPropagation();
            e.preventDefault();
            if (!click && !isReadOnly(w) && !w.hasClass('dwa')) {
                click = true;
                // + Button
                var t = w.find('.dw-ul');

                setGlobals(t);
                clearInterval(timer);
                timer = setInterval(function () { func(t); }, s.delay);
                func(t);
            }
        }

        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) {
                var i = $('.dwwl', dw).index(wh);
                return s.readonly[i];
            }
            return s.readonly;
        }

        function generateWheelItems(i) {
            var html = '<div class="dw-bf">',
                ww = wheels[i],
                w = ww.values ? ww : convert(ww),
                l = 1,
                labels = w.labels || [],
                values = w.values,
                keys = w.keys || values;

            $.each(values, function (j, v) {
                if (l % 20 == 0) {
                    html += '</div><div class="dw-bf">';
                }
                html += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + keys[j] + '"' + (labels[j] ? ' aria-label="' + labels[j] + '"' : '') + ' style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;">' +
                    '<div class="dw-i"' + (lines > 1 ? ' style="line-height:' + Math.round(itemHeight / lines) + 'px;font-size:' + Math.round(itemHeight / lines * 0.8) + 'px;"' : '') + '>' + v + '</div></div>';
                l++;
            });

            html += '</div>';
            return html;
        }

        function setGlobals(t) {
            min = $('.dw-li', t).index($('.dw-v', t).eq(0));
            max = $('.dw-li', t).index($('.dw-v', t).eq(-1));
            index = $('.dw-ul', dw).index(t);
        }

        function formatHeader(v) {
            var t = s.headerText;
            return t ? (typeof t === 'function' ? t.call(e, v) : t.replace(/\{value\}/i, v)) : '';
        }

        function read() {
            that.temp = that.values ? that.values.slice(0) : s.parseValue(elm.val() || '', that);
            setVal();
        }

        function getCurrentPosition(t) {
            var style = window.getComputedStyle ? getComputedStyle(t[0]) : t[0].style,
                matrix,
                px;

            if (has3d) {
                $.each(['t', 'webkitT', 'MozT', 'OT', 'msT'], function (i, v) {
                    if (style[v + 'ransform'] !== undefined) {
                        matrix = style[v + 'ransform'];
                        return false;
                    }
                });
                matrix = matrix.split(')')[0].split(', ');
                px = matrix[13] || matrix[5];
            } else {
                px = style.top.replace('px', '');
            }

            return Math.round(m - (px / itemHeight));
        }

        function ready(t, i) {
            clearTimeout(iv[i]);
            delete iv[i];
            t.closest('.dwwl').removeClass('dwa');
        }

        function scroll(t, index, val, time, active) {
            var px = (m - val) * itemHeight,
                style = t[0].style,
                i;

            if (px == pixels[index] && iv[index]) {
                return;
            }

            if (time && px != pixels[index]) {
                // Trigger animation start event
                event('onAnimStart', [dw, index, time]);
            }

            pixels[index] = px;

            style[pr + 'Transition'] = 'all ' + (time ? time.toFixed(3) : 0) + 's ease-out';

            if (has3d) {
                style[pr + 'Transform'] = 'translate3d(0,' + px + 'px,0)';
            } else {
                style.top = px + 'px';
            }

            if (iv[index]) {
                ready(t, index);
            }

            if (time && active) {
                t.closest('.dwwl').addClass('dwa');
                iv[index] = setTimeout(function () {
                    ready(t, index);
                }, time * 1000);
            }

            pos[index] = val;
        }

        function getValid(val, t, dir) {
            var cell = $('.dw-li[data-val="' + val + '"]', t),
                cells = $('.dw-li', t),
                v = cells.index(cell),
                l = cells.length;

            // Scroll to a valid cell
            if (!cell.hasClass('dw-v')) {
                var cell1 = cell,
                    cell2 = cell,
                    dist1 = 0,
                    dist2 = 0;

                while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) {
                    dist1++;
                    cell1 = cells.eq(v - dist1);
                }

                while (v + dist2 < l && !cell2.hasClass('dw-v')) {
                    dist2++;
                    cell2 = cells.eq(v + dist2);
                }

                // If we have direction (+/- or mouse wheel), the distance does not count
                if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || (v - dist1 < 0) || dir == 1) && cell2.hasClass('dw-v')) {
                    cell = cell2;
                    v = v + dist2;
                } else {
                    cell = cell1;
                    v = v - dist1;
                }
            }

            return {
                cell: cell,
                v: v,
                val: cell.hasClass('dw-v') ? cell.attr('data-val') : null
            };
        }

        function scrollToPos(time, index, manual, dir, active) {
            // Call validation event
            if (event('validate', [dw, index, time, dir]) !== false) {
                // Set scrollers to position
                $('.dw-ul', dw).each(function (i) {
                    var t = $(this),
                        sc = i == index || index === undefined,
                        res = getValid(that.temp[i], t, dir),
                        cell = res.cell;

                    if (!(cell.hasClass('dw-sel')) || sc) {
                        // Set valid value
                        that.temp[i] = res.val;

                        if (!s.multiple) {
                            $('.dw-sel', t).removeAttr('aria-selected');
                            cell.attr('aria-selected', 'true');
                        }

                        // Add selected class to cell
                        $('.dw-sel', t).removeClass('dw-sel');
                        cell.addClass('dw-sel');

                        // Scroll to position
                        scroll(t, i, res.v, sc ? time : 0.1, sc ? active : false);
                    }
                });

                // Reformat value if validation changed something
                v = s.formatResult(that.temp);
                if (that.live) {
                    setVal(manual, manual, 0, true);
                }

                $('.dwv', dw).html(formatHeader(v));

                if (manual) {
                    event('onChange', [v]);
                }
            }

        }

        function event(name, args) {
            var ret;
            args.push(that);
            $.each([userdef, theme, pres, settings], function (i, v) {
                if (v && v[name]) { // Call preset event
                    ret = v[name].apply(e, args);
                }
            });
            return ret;
        }

        function calc(t, val, dir, anim, orig) {
            val = constrain(val, min, max);

            var cell = $('.dw-li', t).eq(val),
                o = orig === undefined ? val : orig,
                active = orig !== undefined,
                idx = index,
                time = anim ? (val == o ? 0.1 : Math.abs((val - o) * s.timeUnit)) : 0;

            // Set selected scroller value
            that.temp[idx] = cell.attr('data-val');

            scroll(t, idx, val, time, active);

            setTimeout(function () {
                // Validate
                scrollToPos(time, idx, true, dir, active);
            }, 10);
        }

        function plus(t) {
            var val = pos[index] + 1;
            calc(t, val > max ? min : val, 1, true);
        }

        function minus(t) {
            var val = pos[index] - 1;
            calc(t, val < min ? max : val, 2, true);
        }

        function setVal(fill, change, time, noscroll, temp) {
            if (visible && !noscroll) {
                scrollToPos(time);
            }

            v = s.formatResult(that.temp);

            if (!temp) {
                that.values = that.temp.slice(0);
                that.val = v;
            }

            if (fill) {

                event('onValueFill', [v, change]);

                if (input) {
                    elm.val(v);
                    if (change) {
                        preventChange = true;
                        elm.change();
                    }
                }
            }
        }

        function hide(prevAnim) {
            dw.remove();
            if (activeElm && !prevAnim) {
                setTimeout(function () {
                    preventShow = true;
                    activeElm.focus();
                }, 200);
            }
            visible = false;
        }

        function attachPosition(ev, checkLock) {
            var debounce;
            wndw.on(ev, function (e) {
                clearTimeout(debounce);
                debounce = setTimeout(function () {
                    if ((lock && checkLock) || !checkLock) {
                        that.position(!checkLock);
                    }
                }, 200);
            });
        }

        // Public functions

        /**
        * Positions the scroller on the screen.
        */
        that.position = function (check) {

            var nw = persp.width(), // To get the width without scrollbar
                nh = wndw[0].innerHeight || wndw.innerHeight();

            if (!(ww === nw && wh === nh && check) && !preventPos && (event('onPosition', [dw, nw, nh]) !== false) && isModal) {
                var w,
                    l,
                    t,
                    aw, // anchor width
                    ah, // anchor height
                    ap, // anchor position
                    at, // anchor top
                    al, // anchor left
                    arr, // arrow
                    arrw, // arrow width
                    arrl, // arrow left
                    dh,
                    scroll,
                    totalw = 0,
                    minw = 0,
                    sl = wndw.scrollLeft(),
                    st = wndw.scrollTop(),
                    wr = $('.dwwr', dw),
                    d = $('.dw', dw),
                    css = {},
                    anchor = s.anchor === undefined ? elm : s.anchor;

                if (/modal|bubble/.test(s.display)) {
                    wr.width('');
                    $('.dwc', dw).each(function () {
                        w = $(this).outerWidth(true);
                        totalw += w;
                        minw = (w > minw) ? w : minw;
                    });
                    w = totalw > nw ? minw : totalw;
                    wr.width(w).css('white-space', totalw > nw ? '' : 'nowrap');
                }

                mw = d.outerWidth();
                mh = d.outerHeight(true);
                lock = mh <= nh && mw <= nw;

                that.scrollLock = lock;

                if (s.display == 'modal') {
                    l = Math.max(0, (nw - mw) / 2);
                    t = st + (nh - mh) / 2;
                } else if (s.display == 'bubble') {
                    scroll = true;
                    arr = $('.dw-arrw-i', dw);
                    ap = anchor.offset();
                    at = Math.abs($(s.context).offset().top - ap.top);
                    al = Math.abs($(s.context).offset().left - ap.left);

                    // horizontal positioning
                    aw = anchor.outerWidth();
                    ah = anchor.outerHeight();
                    l = constrain(al - (d.outerWidth(true) - aw) / 2 - sl, 3, nw - mw - 3);

                    // vertical positioning
                    t = at - mh; // above the input
                    if ((t < st) || (at > st + nh)) { // if doesn't fit above or the input is out of the screen
                        d.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
                        t = at + ah; // below the input
                    } else {
                        d.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
                    }

                    // Calculate Arrow position
                    arrw = arr.outerWidth();
                    arrl = constrain(al + aw / 2 - (l + (mw - arrw) / 2) - sl, 0, arrw);

                    // Limit Arrow position
                    $('.dw-arr', dw).css({ left: arrl });
                } else {
                    if (s.display == 'top') {
                        t = st;
                    } else if (s.display == 'bottom') {
                        t = st + nh - mh;
                    }
                }

                css.top = t < 0 ? 0 : t;
                css.left = l;
                d.css(css);

                // If top + modal height > doc height, increase doc height
                persp.height(0);
                dh = Math.max(t + mh, s.context == 'body' ? $(document).height() : doc.scrollHeight);
                persp.css({ height: dh, left: sl });

                // Scroll needed
                if (scroll && ((t + mh > st + nh) || (at > st + nh))) {
                    preventPos = true;
                    setTimeout(function () { preventPos = false; }, 300);
                    wndw.scrollTop(Math.min(t + mh - nh, dh - nh));
                }
            }

            ww = nw;
            wh = nh;
        };

        /**
        * Enables the scroller and the associated input.
        */
        that.enable = function () {
            s.disabled = false;
            if (input) {
                elm.prop('disabled', false);
            }
        };

        /**
        * Disables the scroller and the associated input.
        */
        that.disable = function () {
            s.disabled = true;
            if (input) {
                elm.prop('disabled', true);
            }
        };

        /**
        * Gets the selected wheel values, formats it, and set the value of the scroller instance.
        * If input parameter is true, populates the associated input element.
        * @param {Array} values Wheel values.
        * @param {Boolean} [fill=false] Also set the value of the associated input element.
        * @param {Number} [time=0] Animation time
        * @param {Boolean} [temp=false] If true, then only set the temporary value.(only scroll there but not set the value)
        */
        that.setValue = function (values, fill, time, temp, change) {
            that.temp = $.isArray(values) ? values.slice(0) : s.parseValue.call(e, values + '', that);
            setVal(fill, change === undefined ? fill : change, time, false, temp);
        };

        /**
        * Return the selected wheel values.
        */
        that.getValue = function () {
            return that.values;
        };

        /**
        * Return selected values, if in multiselect mode.
        */
        that.getValues = function () {
            var ret = [],
                i;

            for (i in that._selectedValues) {
                ret.push(that._selectedValues[i]);
            }
            return ret;
        };

        /**
        * Changes the values of a wheel, and scrolls to the correct position
        * @param {Array} idx Indexes of the wheels to change.
        * @param {Number} [time=0] Animation time when scrolling to the selected value on the new wheel.
        * @param {Boolean} [manual=false] Indicates that the change was triggered by the user or from code.
        */
        that.changeWheel = function (idx, time, manual) {
            if (dw) {
                var i = 0,
                    nr = idx.length;

                $.each(s.wheels, function (j, wg) {
                    $.each(wg, function (k, w) {
                        if ($.inArray(i, idx) > -1) {
                            wheels[i] = w;
                            $('.dw-ul', dw).eq(i).html(generateWheelItems(i));
                            nr--;
                            if (!nr) {
                                that.position();
                                scrollToPos(time, undefined, manual);
                                return false;
                            }
                        }
                        i++;
                    });
                    if (!nr) {
                        return false;
                    }
                });
            }
        };

        /**
        * Return true if the scroller is currently visible.
        */
        that.isVisible = function () {
            return visible;
        };

        /**
        * Attach tap event to the given element.
        */
        that.tap = function (el, handler, prevent) {
            var startX,
                startY;

            if (s.tap) {
                el.on('touchstart.dw', function (e) {
                    // Can't always call preventDefault here, it kills page scroll
                    if (prevent) {
                        e.preventDefault();
                    }
                    startX = getCoord(e, 'X');
                    startY = getCoord(e, 'Y');
                }).on('touchend.dw', function (e) {
                    // If movement is less than 20px, fire the click event handler
                    if (Math.abs(getCoord(e, 'X') - startX) < 20 && Math.abs(getCoord(e, 'Y') - startY) < 20) {
                        // preventDefault and setTimeout are needed by iOS
                        e.preventDefault();
                        setTimeout(function () {
                            handler.call(this, e);
                        }, isOldAndroid ? 400 : 10);
                    }
                    setTap();
                });
            }

            el.on('click.dw', function (e) {
                if (!tap) {
                    // If handler was not called on touchend, call it on click;
                    handler.call(this, e);
                }
                e.preventDefault();
            });

        };

        /**
        * Shows the scroller instance.
        * @param {Boolean} prevAnim - Prevent animation if true
        */
        that.show = function (prevAnim) {
            // Create wheels
            var lbl,
                html,
                l = 0,
                mAnim = '';

            if (s.disabled || visible) {
                return;
            }

            if (anim !== false) {
                if (s.display == 'top') {
                    anim = 'slidedown';
                }
                if (s.display == 'bottom') {
                    anim = 'slideup';
                }
            }

            // Parse value from input
            read();

            event('onBeforeShow', []);

            if (isModal && anim && !prevAnim) {
                mAnim = 'dw-' + anim + ' dw-in';
            }

            // Create wheels containers
            html = '<div' + (isModal ? ' tabindex="0"' : '') + ' role="dialog" class="dw-w ' + s.theme + ' dw-' + s.display +
                (isLiquid ? ' dw-liq' : '') +
                (lines > 1 ? ' dw-ml' : '') +
                (hasButtons ? '' : ' dw-nobtn') + '">' +
                    '<div class="dw-persp">' +
                        (isModal ? '<div class="dwo"></div>' : '') + // Overlay
                        '<div class="dw dwbg ' + mAnim + '">' + // Popup
                            (s.display === 'bubble' ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : '') + // Bubble arrow
                            '<div class="dwwr">' + // Popup content
                                '<div aria-live="assertive" class="dwv' + (s.headerText ? '' : ' dw-hidden') + '"></div>' + // Header
                                '<div class="dwcc">'; // Wheel group container

            $.each(s.wheels, function (i, wg) { // Wheel groups
                html += '<div class="dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '">' +
                            '<div class="dwwc"' + (s.maxWidth ? '' : ' style="max-width:600px;"') + '>' +
                                (hasFlex ? '' : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');

                $.each(wg, function (j, w) { // Wheels
                    wheels[l] = w;
                    lbl = w.label !== undefined ? w.label : j;
                    html += '<' + (hasFlex ? 'div' : 'td') + ' class="dwfl"' + ' style="' + 
                                    (s.fixedWidth ? ('width:' + (s.fixedWidth[l] || s.fixedWidth) + 'px;') :
                                    (s.minWidth ? ('min-width:' + (s.minWidth[l] || s.minWidth) + 'px;') : 'min-width:' + s.width + 'px;') +
                                    (s.maxWidth ? ('max-width:' + (s.maxWidth[l] || s.maxWidth) + 'px;') : '')) + '">' +
                                '<div class="dwwl dwwl' + l + '">' +
                                (s.mode != 'scroller' ?
                                    '<a href="#" tabindex="-1" class="dwb-e dwwb dwwbp" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>+</span></a>' + // + button
                                    '<a href="#" tabindex="-1" class="dwb-e dwwb dwwbm" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>&ndash;</span></a>' : '') + // - button
                                '<div class="dwl">' + lbl + '</div>' + // Wheel label
                                '<div tabindex="0" aria-live="off" aria-label="' + lbl + '" role="listbox" class="dwww">' +
                                    '<div class="dww" style="height:' + (s.rows * itemHeight) + 'px;">' +
                                        '<div class="dw-ul">';

                    // Create wheel values
                    html += generateWheelItems(l) +
                        '</div></div><div class="dwwo"></div></div><div class="dwwol"' + 
                        (s.selectedLineHeight ? ' style="height:' + itemHeight + 'px;margin-top:-' + (itemHeight / 2 + (s.selectedLineBorder || 0)) + 'px;"' : '') + '></div></div>' +
                        (hasFlex ? '</div>' : '</td>');

                    l++;
                });

                html += (hasFlex ? '' : '</tr></table>') + '</div></div>';
            });

            html += '</div>';

            if (isModal && hasButtons) {
                html += '<div class="dwbc">';
                $.each(buttons, function (i, b) {
                    b = (typeof b === 'string') ? that.buttons[b] : b;
                    html += '<span' + (s.btnWidth ? ' style="width:' + (100 / buttons.length) + '%"' : '') + ' class="dwbw ' + b.css + '"><a href="#" class="dwb dwb' + i + ' dwb-e" role="button">' + b.text + '</a></span>';
                });
                html += '</div>';
            }
            html += '</div></div></div></div>';

            dw = $(html);
            persp = $('.dw-persp', dw);
            overlay = $('.dwo', dw);

            visible = true;

            scrollToPos();

            event('onMarkupReady', [dw]);

            // Show
            if (isModal) {
                ms.activeInstance = that;
                dw.appendTo(s.context);
                if (has3d && anim && !prevAnim) {
                    dw.addClass('dw-trans').on(animEnd, function () {
                        dw.removeClass('dw-trans').find('.dw').removeClass(mAnim);
                    });
                }
            } else if (elm.is('div')) {
                elm.html(dw);
            } else {
                dw.insertAfter(elm);
            }

            event('onMarkupInserted', [dw]);

            if (isModal) {
                // Enter / ESC
                $(window).on('keydown.dw', function (e) {
                    if (e.keyCode == 13) {
                        that.select();
                    } else if (e.keyCode == 27) {
                        that.cancel();
                    }
                });

                // Prevent scroll if not specified otherwise
                if (s.scrollLock) {
                    dw.on('touchmove', function (e) {
                        if (lock) {
                            e.preventDefault();
                        }
                    });
                }

                // Disable inputs to prevent bleed through (Android bug)
                if (isOldAndroid) {
                    $('input,select,button', doc).each(function () {
                        if (!this.disabled) {
                            $(this).addClass('dwtd').prop('disabled', true);
                        }
                    });
                }

                attachPosition('scroll.dw', true);
            }

            // Set position
            that.position();
            attachPosition('orientationchange.dw resize.dw', false);

            // Events
            dw.on('DOMMouseScroll mousewheel', '.dwwl', onScroll)
                .on('keydown', '.dwwl', onKeyDown)
                .on('keyup', '.dwwl', onKeyUp)
                .on('selectstart mousedown', prevdef) // Prevents blue highlight on Android and text selection in IE
                .on('click', '.dwb-e', prevdef)
                .on('keydown', '.dwb-e', function (e) {
                    if (e.keyCode == 32) { // Space
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).click();
                    }
                });

            setTimeout(function () {
                // Init buttons
                $.each(buttons, function (i, b) {
                    that.tap($('.dwb' + i, dw), function (e) {
                        b = (typeof b === 'string') ? that.buttons[b] : b;
                        b.handler.call(this, e, that);
                    }, true);
                });

                if (s.closeOnOverlay) {
                    that.tap(overlay, function () {
                        that.cancel();
                    });
                }

                dw.focus()
                    .on('touchstart mousedown', '.dwwl', onStart)
                    .on('touchmove', '.dwwl', onMove)
                    .on('touchend', '.dwwl', onEnd)
                    .on('touchstart mousedown', '.dwb-e', onBtnStart)
                    .on('touchend', '.dwb-e', onBtnEnd);

            }, 300);

            event('onShow', [dw, v]);
        };

        /**
        * Hides the scroller instance.
        */
        that.hide = function (prevAnim, btn, force) {

            // If onClose handler returns false, prevent hide
            if (!visible || (!force && event('onClose', [v, btn]) === false)) {
                return false;
            }

            // Re-enable temporary disabled fields
            if (isOldAndroid) {
                $('.dwtd', doc).each(function () {
                    $(this).prop('disabled', false).removeClass('dwtd');
                });
            }

            // Hide wheels and overlay
            if (dw) {
                if (has3d && isModal && anim && !prevAnim && !dw.hasClass('dw-trans')) { // If dw-trans class was not removed, means that there was no animation
                    dw.addClass('dw-trans').find('.dw').addClass('dw-' + anim + ' dw-out').on(animEnd, function () {
                        hide(prevAnim);
                    });
                } else {
                    hide(prevAnim);
                }

                // Stop positioning on window resize
                wndw.off('.dw');
            }

            delete ms.activeInstance;
            pixels = {};
        };

        /**
        * Set button handler.
        */
        that.select = function () {
            if (that.hide(false, 'set') !== false) {
                setVal(true, true, 0, true);
                event('onSelect', [that.val]);
            }
        };

        /**
        * Show mobiscroll on focus and click event of the parameter.
        * @param {jQuery} elm - Events will be attached to this element.
        * @param {Function} [beforeShow=undefined] - Optional function to execute before showing mobiscroll.
        */
        that.attachShow = function (elm, beforeShow) {
            elmList.push(elm);
            if (s.display !== 'inline') {
                elm.on((s.showOnFocus ? 'focus.dw' : '') + (s.showOnTap ? ' click.dw' : ''), function (ev) {
                    ev.preventDefault();
                    if ((ev.type !== 'focus' || (ev.type === 'focus' && !preventShow)) && !tap) {
                        if (beforeShow) {
                            beforeShow();
                        }
                        activeElm = elm;
                        that.show();
                    }
                    setTimeout(function () {
                        preventShow = false;
                    }, 300); // With jQuery < 1.9 focus is fired twice in IE
                });
            }
        };

        /**
        * Cancel and hide the scroller instance.
        */
        that.cancel = function () {
            if (that.hide(false, 'cancel') !== false) {
                event('onCancel', [that.val]);
            }
        };

        /**
        * Scroller initialization.
        */
        that.init = function (ss) {
            // Get theme defaults
            theme = ms.themes[ss.theme || s.theme];

            // Get language defaults
            lang = ms.i18n[ss.lang || s.lang] || ms.i18n.en;

            extend(settings, ss); // Update original user settings

            event('onThemeLoad', [lang, settings]);

            extend(s, lang, theme, userdef, settings);

            // Add default buttons
            s.buttons = s.buttons || ['set', 'cancel'];

            // Hide header text in inline mode by default
            s.headerText = s.headerText === undefined ? (s.display !== 'inline' ? '{value}' : false) : s.headerText;

            that.settings = s;

            // Unbind all events (if re-init)
            elm.off('.dw');

            var preset = ms.presets[s.preset];

            if (preset) {
                pres = preset.call(e, that);
                extend(s, pres, settings); // Load preset settings
            }

            // Set private members
            m = Math.floor(s.rows / 2);
            itemHeight = s.height;
            anim = isOldAndroid ? false : s.animate;
            lines = s.multiline;
            isLiquid = (s.layout || (/top|bottom/.test(s.display) && s.wheels.length == 1 ? 'liquid' : '')) === 'liquid';
            isModal = s.display !== 'inline';
            buttons = s.buttons;
            wndw = $(s.context == 'body' ? window : s.context);
            doc = $(s.context)[0];

            if (!s.setText) {
                buttons.splice($.inArray('set', buttons), 1);
            }
            if (!s.cancelText) {
                buttons.splice($.inArray('cancel', buttons), 1);
            }
            if (s.button3) {
                buttons.splice($.inArray('set', buttons) + 1, 0, { text: s.button3Text, handler: s.button3 });
            }

            that.context = wndw;
            that.live = !isModal || ($.inArray('set', buttons) == -1);
            that.buttons.set = { text: s.setText, css: 'dwb-s', handler: that.select };
            that.buttons.cancel = { text: (that.live) ? s.closeText : s.cancelText, css: 'dwb-c', handler: that.cancel };
            that.buttons.clear = { text: s.clearText, css: 'dwb-cl', handler: function () {
                that.trigger('onClear', [dw]);
                elm.val('');
                if (!that.live) {
                    that.hide(false, 'clear');
                }
            }};

            hasButtons = buttons.length > 0;

            if (visible) {
                that.hide(true, false, true);
            }

            if (isModal) {
                read();
                if (input) {
                    // Set element readonly, save original state
                    if (readOnly === undefined) {
                        readOnly = e.readOnly;
                    }
                    e.readOnly = true;
                }
                that.attachShow(elm);
            } else {
                that.show();
            }

            if (input) {
                elm.on('change.dw', function () {
                    if (!preventChange) {
                        that.setValue(elm.val(), false, 0.2);
                    }
                    preventChange = false;
                });
            }
        };

        /**
        * Sets one ore more options.
        */
        that.option = function (opt, value) {
            var obj = {};
            if (typeof opt === 'object') {
                obj = opt;
            } else {
                obj[opt] = value;
            }
            that.init(obj);
        };

        /**
        * Destroys the mobiscroll instance.
        */
        that.destroy = function () {
            that.hide(true, false, true);
            // Remove all events from elements
            $.each(elmList, function (i, v) {
                v.off('.dw');
            });
            // Remove events from window
            $(window).off('.dwa');
            // Reset original readonly state
            if (input) {
                e.readOnly = readOnly;
            }
            // Delete scroller instance
            delete instances[e.id];
            event('onDestroy', []);
        };

        /**
        * Returns the mobiscroll instance.
        */
        that.getInst = function () {
            return that;
        };

        /**
        * Returns the closest valid cell.
        */
        that.getValidCell = getValid;

        /**
        * Triggers a mobiscroll event.
        */
        that.trigger = event;

        instances[e.id] = that;

        that.values = null;
        that.val = null;
        that.temp = null;
        that.buttons = {};
        that._selectedValues = {};

        that.init(settings);
    }

    function setTap() {
        tap = true;
        setTimeout(function () {
            tap = false;
        }, 300);
    }

    function constrain(val, min, max) {
        return Math.max(min, Math.min(val, max));
    }

    function convert(w) {
        var ret = {
            values: [],
            keys: []
        };
        $.each(w, function (k, v) {
            ret.keys.push(k);
            ret.values.push(v);
        });
        return ret;
    }

    var activeElm,
        move,
        tap,
        preventShow,
        ms = $.mobiscroll,
        instances = ms.instances,
        util = ms.util,
        prefix = util.prefix,
        pr = util.jsPrefix,
        has3d = util.has3d,
        hasFlex = util.hasFlex;
        getCoord = util.getCoord,
        testTouch = util.testTouch,
        empty = function () {},
        prevdef = function (e) { e.preventDefault(); },
        extend = $.extend,
        animEnd = 'webkitAnimationEnd animationend',
        userdef = ms.userdef,
        isOldAndroid = /android [1-3]/i.test(navigator.userAgent),
        defaults = extend(ms.defaults, {
            // Options
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 300,
            disabled: false,
            readonly: false,
            closeOnOverlay: true,
            showOnFocus: true,
            showOnTap: true,
            showLabel: true,
            wheels: [],
            theme: '',
            display: 'modal',
            mode: 'scroller',
            preset: '',
            lang: 'en-US',
            context: 'body',
            scrollLock: true,
            tap: true,
            btnWidth: true,
            speedUnit: 0.0012,
            timeUnit: 0.1,
            formatResult: function (d) {
                return d.join(' ');
            },
            parseValue: function (value, inst) {
                var val = value.split(' '),
                    ret = [],
                    i = 0,
                    keys;

                $.each(inst.settings.wheels, function (j, wg) {
                    $.each(wg, function (k, w) {
                        w = w.values ? w : convert(w);
                        keys = w.keys || w.values;
                        if ($.inArray(val[i], keys) !== -1) {
                            ret.push(val[i]);
                        } else {
                            ret.push(keys[0]);
                        }
                        i++;
                    });
                });
                return ret;
            }
        });

    // English language module
    ms.i18n.en = ms.i18n['en-US'] = {
        setText: 'Set',
        selectedText: 'Selected',
        closeText: 'Close',
        cancelText: 'Cancel',
        clearText: 'Clear'
    };

    // Prevent re-show on window focus
    $(window).on('focus', function () {
        if (activeElm) {
            preventShow = true;
        }
    });

    $(document).on('mouseover mouseup mousedown click', function (e) { // Prevent standard behaviour on body click
        if (tap) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    });

})(jQuery);

(function ($) {

    $.mobiscroll.themes.ios7 = {
        dateOrder: 'MMdyy',
        rows: 5,
        height: 34,
        minWidth: 55,
        headerText: false,
        showLabel: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 1,
        useShortLabels: true
    };

})(jQuery);
