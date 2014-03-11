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


// Knockout JavaScript library v3.0.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {(function(q){var y=this||(0,eval)("this"),w=y.document,K=y.navigator,u=y.jQuery,B=y.JSON;(function(q){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?q(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],q):q(y.ko={})})(function(F){function G(a,c){return null===a||typeof a in N?a===c:!1}function H(b,c,d,e){a.d[b]={init:function(b){a.a.f.set(b,L,{});return{controlsDescendantBindings:!0}},update:function(b,h,k,m,f){k=a.a.f.get(b,L);h=a.a.c(h());
m=!d!==!h;var p=!k.ob;if(p||c||m!==k.Db)p&&(k.ob=a.a.Ya(a.e.childNodes(b),!0)),m?(p||a.e.S(b,a.a.Ya(k.ob)),a.Ta(e?e(f,h):f,b)):a.e.Z(b),k.Db=m}};a.g.Y[b]=!1;a.e.P[b]=!0}var a="undefined"!==typeof F?F:{};a.b=function(b,c){for(var d=b.split("."),e=a,g=0;g<d.length-1;g++)e=e[d[g]];e[d[d.length-1]]=c};a.s=function(a,c,d){a[c]=d};a.version="3.0.0";a.b("version",a.version);a.a=function(){function b(a,b){for(var f in a)a.hasOwnProperty(f)&&b(f,a[f])}function c(k,b){if("input"!==a.a.v(k)||!k.type||"click"!=
b.toLowerCase())return!1;var f=k.type;return"checkbox"==f||"radio"==f}var d={},e={};d[K&&/Firefox\/2/i.test(K.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];d.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(d,function(a,b){if(b.length)for(var f=0,c=b.length;f<c;f++)e[b[f]]=a});var g={propertychange:!0},h=w&&function(){for(var a=3,b=w.createElement("div"),f=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+
++a+"]><i></i><![endif]--\x3e",f[0];);return 4<a?a:q}();return{$a:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],n:function(a,b){for(var f=0,c=a.length;f<c;f++)b(a[f])},l:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var f=0,c=a.length;f<c;f++)if(a[f]===b)return f;return-1},Ua:function(a,b,f){for(var c=0,d=a.length;c<d;c++)if(b.call(f,a[c]))return a[c];return null},ia:function(b,c){var f=a.a.l(b,c);0<=f&&b.splice(f,1)},Va:function(b){b=
b||[];for(var c=[],f=0,d=b.length;f<d;f++)0>a.a.l(c,b[f])&&c.push(b[f]);return c},ha:function(a,b){a=a||[];for(var f=[],c=0,d=a.length;c<d;c++)f.push(b(a[c]));return f},ga:function(a,b){a=a||[];for(var f=[],c=0,d=a.length;c<d;c++)b(a[c])&&f.push(a[c]);return f},X:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var f=0,c=b.length;f<c;f++)a.push(b[f]);return a},V:function(b,c,f){var d=a.a.l(a.a.Ha(b),c);0>d?f&&b.push(c):f||b.splice(d,1)},extend:function(a,b){if(b)for(var f in b)b.hasOwnProperty(f)&&
(a[f]=b[f]);return a},K:b,Da:function(a,b){if(!a)return a;var f={},c;for(c in a)a.hasOwnProperty(c)&&(f[c]=b(a[c],c,a));return f},wa:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Vb:function(b){b=a.a.Q(b);for(var c=w.createElement("div"),f=0,d=b.length;f<d;f++)c.appendChild(a.L(b[f]));return c},Ya:function(b,c){for(var f=0,d=b.length,e=[];f<d;f++){var g=b[f].cloneNode(!0);e.push(c?a.L(g):g)}return e},S:function(b,c){a.a.wa(b);if(c)for(var f=0,d=c.length;f<d;f++)b.appendChild(c[f])},nb:function(b,
c){var f=b.nodeType?[b]:b;if(0<f.length){for(var d=f[0],e=d.parentNode,g=0,n=c.length;g<n;g++)e.insertBefore(c[g],d);g=0;for(n=f.length;g<n;g++)a.removeNode(f[g])}},$:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);if(1<a.length){var f=a[0],c=a[a.length-1];for(a.length=0;f!==c;)if(a.push(f),f=f.nextSibling,!f)return;a.push(c)}}return a},qb:function(a,b){7>h?a.setAttribute("selected",b):a.selected=b},la:function(a){return null===a||a===
q?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ec:function(b,c){for(var f=[],d=(b||"").split(c),e=0,g=d.length;e<g;e++){var n=a.a.la(d[e]);""!==n&&f.push(n)}return f},ac:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},Gb:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;
return!!a},va:function(b){return a.a.Gb(b,b.ownerDocument.documentElement)},Ra:function(b){return!!a.a.Ua(b,a.a.va)},v:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},r:function(b,d,f){var e=h&&g[d];if(e||"undefined"==typeof u)if(e||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var s=function(a){f.call(b,a)},l="on"+d;b.attachEvent(l,s);a.a.C.ea(b,function(){b.detachEvent(l,s)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(d,
f,!1);else{if(c(b,d)){var n=f;f=function(a,b){var f=this.checked;b&&(this.checked=!0!==b.Ab);n.call(this,a);this.checked=f}}u(b).bind(d,f)}},da:function(a,b){if(!a||!a.nodeType)throw Error("element must be a DOM node when calling triggerEvent");if("undefined"!=typeof u){var f=[];c(a,b)&&f.push({Ab:a.checked});u(a).trigger(b,f)}else if("function"==typeof w.createEvent)if("function"==typeof a.dispatchEvent)f=w.createEvent(e[b]||"HTMLEvents"),f.initEvent(b,!0,!0,y,0,0,0,0,0,!1,!1,!1,!1,0,a),a.dispatchEvent(f);
else throw Error("The supplied element doesn't support dispatchEvent");else if("undefined"!=typeof a.fireEvent)c(a,b)&&(a.checked=!0!==a.checked),a.fireEvent("on"+b);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.M(b)?b():b},Ha:function(b){return a.M(b)?b.t():b},ma:function(b,c,f){if(c){var d=/\S+/g,e=b.className.match(d)||[];a.a.n(c.match(d),function(b){a.a.V(e,b,f)});b.className=e.join(" ")}},Ma:function(b,c){var f=a.a.c(c);if(null===f||f===q)f="";var d=a.e.firstChild(b);
!d||3!=d.nodeType||a.e.nextSibling(d)?a.e.S(b,[w.createTextNode(f)]):d.data=f;a.a.Jb(b)},pb:function(a,b){a.name=b;if(7>=h)try{a.mergeAttributes(w.createElement("<input name='"+a.name+"'/>"),!1)}catch(f){}},Jb:function(a){9<=h&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},Hb:function(a){if(h){var b=a.style.width;a.style.width=0;a.style.width=b}},Zb:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var f=[],d=b;d<=c;d++)f.push(d);return f},Q:function(a){for(var b=[],c=0,d=a.length;c<
d;c++)b.push(a[c]);return b},cc:6===h,dc:7===h,ja:h,ab:function(b,c){for(var f=a.a.Q(b.getElementsByTagName("input")).concat(a.a.Q(b.getElementsByTagName("textarea"))),d="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},e=[],g=f.length-1;0<=g;g--)d(f[g])&&e.push(f[g]);return e},Wb:function(b){return"string"==typeof b&&(b=a.a.la(b))?B&&B.parse?B.parse(b):(new Function("return "+b))():null},Na:function(b,c,f){if(!B||!B.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return B.stringify(a.a.c(b),c,f)},Xb:function(c,d,f){f=f||{};var e=f.params||{},g=f.includeFields||this.$a,h=c;if("object"==typeof c&&"form"===a.a.v(c))for(var h=c.action,n=g.length-1;0<=n;n--)for(var r=a.a.ab(c,g[n]),v=r.length-1;0<=v;v--)e[r[v].name]=r[v].value;d=a.a.c(d);var t=w.createElement("form");t.style.display="none";t.action=h;t.method="post";for(var E in d)c=w.createElement("input"),c.name=E,c.value=a.a.Na(a.a.c(d[E])),t.appendChild(c);b(e,function(a,b){var c=w.createElement("input");c.name=
a;c.value=b;t.appendChild(c)});w.body.appendChild(t);f.submitter?f.submitter(t):t.submit();setTimeout(function(){t.parentNode.removeChild(t)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.n);a.b("utils.arrayFirst",a.a.Ua);a.b("utils.arrayFilter",a.a.ga);a.b("utils.arrayGetDistinctValues",a.a.Va);a.b("utils.arrayIndexOf",a.a.l);a.b("utils.arrayMap",a.a.ha);a.b("utils.arrayPushAll",a.a.X);a.b("utils.arrayRemoveItem",a.a.ia);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",
a.a.$a);a.b("utils.getFormFields",a.a.ab);a.b("utils.peekObservable",a.a.Ha);a.b("utils.postJson",a.a.Xb);a.b("utils.parseJson",a.a.Wb);a.b("utils.registerEventHandler",a.a.r);a.b("utils.stringifyJson",a.a.Na);a.b("utils.range",a.a.Zb);a.b("utils.toggleDomNodeCssClass",a.a.ma);a.b("utils.triggerEvent",a.a.da);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.K);a.b("utils.addOrRemoveItem",a.a.V);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=
this,d=Array.prototype.slice.call(arguments);a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){function a(b,h){var k=b[d];if(!k||"null"===k||!e[k]){if(!h)return q;k=b[d]="ko"+c++;e[k]={}}return e[k]}var c=0,d="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===q?q:e[d]},set:function(c,d,e){if(e!==q||a(c,!1)!==q)a(c,!0)[d]=e},clear:function(a){var b=a[d];return b?(delete e[b],a[d]=null,!0):!1},D:function(){return c++ +
d}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.C=new function(){function b(b,c){var e=a.a.f.get(b,d);e===q&&c&&(e=[],a.a.f.set(b,d,e));return e}function c(d){var e=b(d,!1);if(e)for(var e=e.slice(0),m=0;m<e.length;m++)e[m](d);a.a.f.clear(d);"function"==typeof u&&"function"==typeof u.cleanData&&u.cleanData([d]);if(g[d.nodeType])for(e=d.firstChild;d=e;)e=d.nextSibling,8===d.nodeType&&c(d)}var d=a.a.f.D(),e={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{ea:function(a,c){if("function"!=
typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},mb:function(c,e){var g=b(c,!1);g&&(a.a.ia(g,e),0==g.length&&a.a.f.set(c,d,q))},L:function(b){if(e[b.nodeType]&&(c(b),g[b.nodeType])){var d=[];a.a.X(d,b.getElementsByTagName("*"));for(var m=0,f=d.length;m<f;m++)c(d[m])}return b},removeNode:function(b){a.L(b);b.parentNode&&b.parentNode.removeChild(b)}}};a.L=a.a.C.L;a.removeNode=a.a.C.removeNode;a.b("cleanNode",a.L);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.C);
a.b("utils.domNodeDisposal.addDisposeCallback",a.a.C.ea);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.C.mb);(function(){a.a.Fa=function(b){var c;if("undefined"!=typeof u)if(u.parseHTML)c=u.parseHTML(b)||[];else{if((c=u.clean([b]))&&c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var d=a.a.la(b).toLowerCase();c=w.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,
"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof y.innerShiv?c.appendChild(y.innerShiv(b)):c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.Q(c.lastChild.childNodes)}return c};a.a.Ka=function(b,c){a.a.wa(b);c=a.a.c(c);if(null!==c&&c!==q)if("string"!=typeof c&&(c=c.toString()),"undefined"!=typeof u)u(b).html(c);else for(var d=a.a.Fa(c),e=0;e<d.length;e++)b.appendChild(d[e])}})();
a.b("utils.parseHtmlFragment",a.a.Fa);a.b("utils.setHtml",a.a.Ka);a.u=function(){function b(c,e){if(c)if(8==c.nodeType){var g=a.u.jb(c.nodeValue);null!=g&&e.push({Fb:c,Tb:g})}else if(1==c.nodeType)for(var g=0,h=c.childNodes,k=h.length;g<k;g++)b(h[g],e)}var c={};return{Ca:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);
c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},ub:function(a,b){var g=c[a];if(g===q)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return g.apply(null,b||[]),!0}finally{delete c[a]}},vb:function(c,e){var g=[];b(c,g);for(var h=0,k=g.length;h<k;h++){var m=g[h].Fb,f=[m];e&&a.a.X(f,e);a.u.ub(g[h].Tb,f);m.nodeValue="";m.parentNode&&m.parentNode.removeChild(m)}},jb:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.u);a.b("memoization.memoize",
a.u.Ca);a.b("memoization.unmemoize",a.u.ub);a.b("memoization.parseMemoText",a.u.jb);a.b("memoization.unmemoizeDomNodeAndDescendants",a.u.vb);a.xa={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.h({read:b,write:function(a){clearTimeout(d);d=setTimeout(function(){b(a)},c)}})},notify:function(a,c){a.equalityComparer="always"==c?null:G}};var N={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.xa);a.sb=function(b,c,d){this.target=b;this.qa=c;this.Eb=d;a.s(this,"dispose",
this.B)};a.sb.prototype.B=function(){this.Qb=!0;this.Eb()};a.ca=function(){this.F={};a.a.extend(this,a.ca.fn);a.s(this,"subscribe",this.T);a.s(this,"extend",this.extend);a.s(this,"getSubscriptionsCount",this.Lb)};var I="change";a.ca.fn={T:function(b,c,d){d=d||I;var e=new a.sb(this,c?b.bind(c):b,function(){a.a.ia(this.F[d],e)}.bind(this));this.F[d]||(this.F[d]=[]);this.F[d].push(e);return e},notifySubscribers:function(b,c){c=c||I;if(this.cb(c))try{a.i.Wa();for(var d=this.F[c].slice(0),e=0,g;g=d[e];++e)g&&
!0!==g.Qb&&g.qa(b)}finally{a.i.end()}},cb:function(a){return this.F[a]&&this.F[a].length},Lb:function(){var b=0;a.a.K(this.F,function(a,d){b+=d.length});return b},extend:function(b){var c=this;b&&a.a.K(b,function(b,e){var g=a.xa[b];"function"==typeof g&&(c=g(c,e)||c)});return c}};a.fb=function(a){return null!=a&&"function"==typeof a.T&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.ca);a.b("isSubscribable",a.fb);a.i=function(){var b=[];return{Wa:function(a){b.push(a&&{qa:a,Za:[]})},
end:function(){b.pop()},lb:function(c){if(!a.fb(c))throw Error("Only subscribable things can act as dependencies");if(0<b.length){var d=b[b.length-1];!d||0<=a.a.l(d.Za,c)||(d.Za.push(c),d.qa(c))}},p:function(a,d,e){try{return b.push(null),a.apply(d,e||[])}finally{b.pop()}}}}();a.q=function(b){function c(){if(0<arguments.length)return c.equalityComparer&&c.equalityComparer(d,arguments[0])||(c.O(),d=arguments[0],c.N()),this;a.i.lb(c);return d}var d=b;a.ca.call(c);c.t=function(){return d};c.N=function(){c.notifySubscribers(d)};
c.O=function(){c.notifySubscribers(d,"beforeChange")};a.a.extend(c,a.q.fn);a.s(c,"peek",c.t);a.s(c,"valueHasMutated",c.N);a.s(c,"valueWillMutate",c.O);return c};a.q.fn={equalityComparer:G};var C=a.q.Yb="__ko_proto__";a.q.fn[C]=a.q;a.ya=function(b,c){return null===b||b===q||b[C]===q?!1:b[C]===c?!0:a.ya(b[C],c)};a.M=function(b){return a.ya(b,a.q)};a.gb=function(b){return"function"==typeof b&&b[C]===a.q||"function"==typeof b&&b[C]===a.h&&b.Nb?!0:!1};a.b("observable",a.q);a.b("isObservable",a.M);a.b("isWriteableObservable",
a.gb);a.ba=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.q(b);a.a.extend(b,a.ba.fn);return b.extend({trackArrayChanges:!0})};a.ba.fn={remove:function(b){for(var c=this.t(),d=[],e="function"!=typeof b||a.M(b)?function(a){return a===b}:b,g=0;g<c.length;g++){var h=c[g];e(h)&&(0===d.length&&this.O(),d.push(h),c.splice(g,1),g--)}d.length&&this.N();return d},removeAll:function(b){if(b===
q){var c=this.t(),d=c.slice(0);this.O();c.splice(0,c.length);this.N();return d}return b?this.remove(function(c){return 0<=a.a.l(b,c)}):[]},destroy:function(b){var c=this.t(),d="function"!=typeof b||a.M(b)?function(a){return a===b}:b;this.O();for(var e=c.length-1;0<=e;e--)d(c[e])&&(c[e]._destroy=!0);this.N()},destroyAll:function(b){return b===q?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.l(b,c)}):[]},indexOf:function(b){var c=this();return a.a.l(c,b)},replace:function(a,
c){var d=this.indexOf(a);0<=d&&(this.O(),this.t()[d]=c,this.N())}};a.a.n("pop push reverse shift sort splice unshift".split(" "),function(b){a.ba.fn[b]=function(){var a=this.t();this.O();this.Xa(a,b,arguments);a=a[b].apply(a,arguments);this.N();return a}});a.a.n(["slice"],function(b){a.ba.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.b("observableArray",a.ba);var J="arrayChange";a.xa.trackArrayChanges=function(b){function c(){if(!d){d=!0;var c=b.notifySubscribers;b.notifySubscribers=
function(a,b){b&&b!==I||++g;return c.apply(this,arguments)};var m=[].concat(b.t()||[]);e=null;b.T(function(c){c=[].concat(c||[]);if(b.cb(J)){var d;if(!e||1<g)e=a.a.ra(m,c,{sparse:!0});d=e;d.length&&b.notifySubscribers(d,J)}m=c;e=null;g=0})}}if(!b.Xa){var d=!1,e=null,g=0,h=b.T;b.T=b.subscribe=function(a,b,f){f===J&&c();return h.apply(this,arguments)};b.Xa=function(a,b,c){function p(a,b,c){h.push({status:a,value:b,index:c})}if(d&&!g){var h=[],l=a.length,n=c.length,r=0;switch(b){case "push":r=l;case "unshift":for(b=
0;b<n;b++)p("added",c[b],r+b);break;case "pop":r=l-1;case "shift":l&&p("deleted",a[r],r);break;case "splice":b=Math.min(Math.max(0,0>c[0]?l+c[0]:c[0]),l);for(var l=1===n?l:Math.min(b+(c[1]||0),l),n=b+n-2,r=Math.max(l,n),v=2;b<r;++b,++v)b<l&&p("deleted",a[b],b),b<n&&p("added",c[v],b);break;default:return}e=h}}}};a.h=function(b,c,d){function e(){a.a.n(z,function(a){a.B()});z=[]}function g(){var a=k.throttleEvaluation;a&&0<=a?(clearTimeout(x),x=setTimeout(h,a)):h()}function h(){if(!s){if(E&&E()){if(!l){D();
p=!0;return}}else l=!1;s=!0;try{var b=a.a.ha(z,function(a){return a.target});a.i.Wa(function(c){var d;0<=(d=a.a.l(b,c))?b[d]=q:z.push(c.T(g))});for(var d=c?n.call(c):n(),e=b.length-1;0<=e;e--)b[e]&&z.splice(e,1)[0].B();p=!0;k.equalityComparer&&k.equalityComparer(f,d)||(k.notifySubscribers(f,"beforeChange"),f=d,k.notifySubscribers(f))}finally{a.i.end(),s=!1}z.length||D()}}function k(){if(0<arguments.length){if("function"===typeof r)r.apply(c,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
return this}p||h();a.i.lb(k);return f}function m(){return!p||0<z.length}var f,p=!1,s=!1,l=!1,n=b;n&&"object"==typeof n?(d=n,n=d.read):(d=d||{},n||(n=d.read));if("function"!=typeof n)throw Error("Pass a function that returns the value of the ko.computed");var r=d.write,v=d.disposeWhenNodeIsRemoved||d.I||null,t=d.disposeWhen||d.ua,E=t,D=e,z=[],x=null;c||(c=d.owner);k.t=function(){p||h();return f};k.Kb=function(){return z.length};k.Nb="function"===typeof d.write;k.B=function(){D()};k.aa=m;a.ca.call(k);
a.a.extend(k,a.h.fn);a.s(k,"peek",k.t);a.s(k,"dispose",k.B);a.s(k,"isActive",k.aa);a.s(k,"getDependenciesCount",k.Kb);v&&(l=!0,v.nodeType&&(E=function(){return!a.a.va(v)||t&&t()}));!0!==d.deferEvaluation&&h();v&&m()&&(D=function(){a.a.C.mb(v,D);e()},a.a.C.ea(v,D));return k};a.Pb=function(b){return a.ya(b,a.h)};F=a.q.Yb;a.h[F]=a.q;a.h.fn={equalityComparer:G};a.h.fn[F]=a.h;a.b("dependentObservable",a.h);a.b("computed",a.h);a.b("isComputed",a.Pb);(function(){function b(a,g,h){h=h||new d;a=g(a);if("object"!=
typeof a||null===a||a===q||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var k=a instanceof Array?[]:{};h.save(a,k);c(a,function(c){var d=g(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":k[c]=d;break;case "object":case "undefined":var p=h.get(d);k[c]=p!==q?p:b(d,g,h)}});return k}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=
[];this.Qa=[]}a.tb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.M(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.tb(b);return a.a.Na(b,c,d)};d.prototype={save:function(b,c){var d=a.a.l(this.keys,b);0<=d?this.Qa[d]=c:(this.keys.push(b),this.Qa.push(c))},get:function(b){b=a.a.l(this.keys,b);return 0<=b?this.Qa[b]:q}}})();a.b("toJS",a.tb);a.b("toJSON",a.toJSON);(function(){a.k={o:function(b){switch(a.a.v(b)){case "option":return!0===
b.__ko__hasDomDataOptionValue__?a.a.f.get(b,a.d.options.Ea):7>=a.a.ja?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.k.o(b.options[b.selectedIndex]):q;default:return b.value}},na:function(b,c){switch(a.a.v(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.d.options.Ea,q);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.d.options.Ea,c),b.__ko__hasDomDataOptionValue__=
!0,b.value="number"===typeof c?c:""}break;case "select":""===c&&(c=q);if(null===c||c===q)b.selectedIndex=-1;for(var d=b.options.length-1;0<=d;d--)if(a.k.o(b.options[d])==c){b.selectedIndex=d;break}1<b.size||-1!==b.selectedIndex||(b.selectedIndex=0);break;default:if(null===c||c===q)c="";b.value=c}}}})();a.b("selectExtensions",a.k);a.b("selectExtensions.readValue",a.k.o);a.b("selectExtensions.writeValue",a.k.na);a.g=function(){function b(b){b=a.a.la(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=
[],d=b.match(e),k,l,n=0;if(d){d.push(",");for(var r=0,v;v=d[r];++r){var t=v.charCodeAt(0);if(44===t){if(0>=n){k&&c.push(l?{key:k,value:l.join("")}:{unknown:k});k=l=n=0;continue}}else if(58===t){if(!l)continue}else if(47===t&&r&&1<v.length)(t=d[r-1].match(g))&&!h[t[0]]&&(b=b.substr(b.indexOf(v)+1),d=b.match(e),d.push(","),r=-1,v="/");else if(40===t||123===t||91===t)++n;else if(41===t||125===t||93===t)--n;else if(!k&&!l){k=34===t||39===t?v.slice(1,-1):v;continue}l?l.push(v):l=[v]}}return c}var c=["true",
"false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),g=/[\])"'A-Za-z0-9_$]+$/,h={"in":1,"return":1,"typeof":1},k={};return{Y:[],U:k,Ga:b,ka:function(e,f){function g(b,f){var e,r=a.getBindingHandler(b);if(r&&r.preprocess?f=r.preprocess(f,b,g):1){if(r=k[b])e=f,0<=a.a.l(c,e)?e=!1:(r=e.match(d),e=null===r?!1:r[1]?"Object("+r[1]+")"+
r[2]:e),r=e;r&&l.push("'"+b+"':function(_z){"+e+"=_z}");n&&(f="function(){return "+f+" }");h.push("'"+b+"':"+f)}}f=f||{};var h=[],l=[],n=f.valueAccessors,r="string"===typeof e?b(e):e;a.a.n(r,function(a){g(a.key||a.unknown,a.value)});l.length&&g("_ko_property_writers","{"+l.join(",")+"}");return h.join(",")},Sb:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},oa:function(b,c,d,e,k){if(b&&a.M(b))!a.gb(b)||k&&b.t()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();
a.b("expressionRewriting",a.g);a.b("expressionRewriting.bindingRewriteValidators",a.g.Y);a.b("expressionRewriting.parseObjectLiteral",a.g.Ga);a.b("expressionRewriting.preProcessBindings",a.g.ka);a.b("expressionRewriting._twoWayBindings",a.g.U);a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.g.ka);(function(){function b(a){return 8==a.nodeType&&h.test(g?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&k.test(g?a.text:a.nodeValue)}function d(a,
d){for(var e=a,k=1,n=[];e=e.nextSibling;){if(c(e)&&(k--,0===k))return n;n.push(e);b(e)&&k++}if(!d)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var g=w&&"\x3c!--test--\x3e"===w.createComment("test").text,h=g?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,k=g?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,m={ul:!0,ol:!0};a.e={P:{},childNodes:function(a){return b(a)?
d(a):a.childNodes},Z:function(c){if(b(c)){c=a.e.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.wa(c)},S:function(c,d){if(b(c)){a.e.Z(c);for(var e=c.nextSibling,k=0,n=d.length;k<n;k++)e.parentNode.insertBefore(d[k],e)}else a.a.S(c,d)},kb:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},eb:function(c,d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):
c.appendChild(d):a.e.kb(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},Mb:b,bc:function(a){return(a=(g?a.text:a.nodeValue).match(h))?a[1]:null},ib:function(d){if(m[a.a.v(d)]){var k=d.firstChild;if(k){do if(1===k.nodeType){var g;g=k.firstChild;var h=null;if(g){do if(h)h.push(g);else if(b(g)){var n=e(g,!0);n?g=n:h=[g]}else c(g)&&(h=[g]);while(g=
g.nextSibling)}if(g=h)for(h=k.nextSibling,n=0;n<g.length;n++)h?d.insertBefore(g[n],h):d.appendChild(g[n])}while(k=k.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.P);a.b("virtualElements.emptyNode",a.e.Z);a.b("virtualElements.insertAfter",a.e.eb);a.b("virtualElements.prepend",a.e.kb);a.b("virtualElements.setDomNodeChildren",a.e.S);(function(){a.H=function(){this.zb={}};a.a.extend(a.H.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
b.getAttribute("data-bind");case 8:return a.e.Mb(b);default:return!1}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a):null},getBindingAccessors:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a,{valueAccessors:!0}):null},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.e.bc(b);default:return null}},parseBindingsString:function(b,c,d,e){try{var g=this.zb,
h=b+(e&&e.valueAccessors||""),k;if(!(k=g[h])){var m,f="with($context){with($data||{}){return{"+a.g.ka(b,e)+"}}}";m=new Function("$context","$element",f);k=g[h]=m}return k(c,d)}catch(p){throw p.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+p.message,p;}}});a.H.instance=new a.H})();a.b("bindingProvider",a.H);(function(){function b(a){return function(){return a}}function c(a){return a()}function d(b){return a.a.Da(a.i.p(b),function(a,c){return function(){return b()[c]}})}function e(a,
b){return d(this.getBindings.bind(this,a,b))}function g(b,c,d){var f,e=a.e.firstChild(c),k=a.H.instance,g=k.preprocessNode;if(g){for(;f=e;)e=a.e.nextSibling(f),g.call(k,f);e=a.e.firstChild(c)}for(;f=e;)e=a.e.nextSibling(f),h(b,f,d)}function h(b,c,d){var f=!0,e=1===c.nodeType;e&&a.e.ib(c);if(e&&d||a.H.instance.nodeHasBindings(c))f=m(c,null,b,d).shouldBindDescendants;f&&!p[a.a.v(c)]&&g(b,c,!e)}function k(b){var c=[],d={},f=[];a.a.K(b,function D(e){if(!d[e]){var k=a.getBindingHandler(e);k&&(k.after&&
(f.push(e),a.a.n(k.after,function(c){if(b[c]){if(-1!==a.a.l(f,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+f.join(", "));D(c)}}),f.pop()),c.push({key:e,bb:k}));d[e]=!0}});return c}function m(b,d,f,g){var h=a.a.f.get(b,s);if(!d){if(h)throw Error("You cannot apply bindings multiple times to the same element.");a.a.f.set(b,s,!0)}!h&&g&&a.rb(b,f);var m;if(d&&"function"!==typeof d)m=d;else{var p=a.H.instance,l=p.getBindingAccessors||e;if(d||f.A){var A=
a.h(function(){(m=d?d(f,b):l.call(p,b,f))&&f.A&&f.A();return m},null,{I:b});m&&A.aa()||(A=null)}else m=a.i.p(l,p,[b,f])}var u;if(m){var w=A?function(a){return function(){return c(A()[a])}}:function(a){return m[a]},y=function(){return a.a.Da(A?A():m,c)};y.get=function(a){return m[a]&&c(w(a))};y.has=function(a){return a in m};g=k(m);a.a.n(g,function(c){var d=c.bb.init,e=c.bb.update,k=c.key;if(8===b.nodeType&&!a.e.P[k])throw Error("The binding '"+k+"' cannot be used with virtual elements");try{"function"==
typeof d&&a.i.p(function(){var a=d(b,w(k),y,f.$data,f);if(a&&a.controlsDescendantBindings){if(u!==q)throw Error("Multiple bindings ("+u+" and "+k+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=k}}),"function"==typeof e&&a.h(function(){e(b,w(k),y,f.$data,f)},null,{I:b})}catch(g){throw g.message='Unable to process binding "'+k+": "+m[k]+'"\nMessage: '+g.message,g;}})}return{shouldBindDescendants:u===q}}function f(b){return b&&
b instanceof a.G?b:new a.G(b)}a.d={};var p={script:!0};a.getBindingHandler=function(b){return a.d[b]};a.G=function(b,c,d,f){var e=this,k="function"==typeof b,g,h=a.h(function(){var g=k?b():b;c?(c.A&&c.A(),a.a.extend(e,c),h&&(e.A=h)):(e.$parents=[],e.$root=g,e.ko=a);e.$rawData=b;e.$data=g;d&&(e[d]=g);f&&f(e,c,g);return e.$data},null,{ua:function(){return g&&!a.a.Ra(g)},I:!0});h.aa()&&(e.A=h,h.equalityComparer=null,g=[],h.wb=function(b){g.push(b);a.a.C.ea(b,function(b){a.a.ia(g,b);g.length||(h.B(),
e.A=h=q)})})};a.G.prototype.createChildContext=function(b,c,d){return new a.G(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.G.prototype.extend=function(b){return new a.G(this.$rawData,this,null,function(c){a.a.extend(c,"function"==typeof b?b():b)})};var s=a.a.f.D(),l=a.a.f.D();a.rb=function(b,c){if(2==arguments.length)a.a.f.set(b,l,c),c.A&&c.A.wb(b);else return a.a.f.get(b,l)};a.pa=function(b,c,d){1===b.nodeType&&
a.e.ib(b);return m(b,c,f(d),!0)};a.xb=function(c,e,k){k=f(k);return a.pa(c,"function"===typeof e?d(e.bind(null,k,c)):a.a.Da(e,b),k)};a.Ta=function(a,b){1!==b.nodeType&&8!==b.nodeType||g(f(a),b,!0)};a.Sa=function(a,b){if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||y.document.body;h(f(a),b,!0)};a.ta=function(b){switch(b.nodeType){case 1:case 8:var c=a.rb(b);if(c)return c;if(b.parentNode)return a.ta(b.parentNode)}return q};
a.Cb=function(b){return(b=a.ta(b))?b.$data:q};a.b("bindingHandlers",a.d);a.b("applyBindings",a.Sa);a.b("applyBindingsToDescendants",a.Ta);a.b("applyBindingAccessorsToNode",a.pa);a.b("applyBindingsToNode",a.xb);a.b("contextFor",a.ta);a.b("dataFor",a.Cb)})();var M={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.K(d,function(c,d){d=a.a.c(d);var h=!1===d||null===d||d===q;h&&b.removeAttribute(c);8>=a.a.ja&&c in M?(c=M[c],h?b.removeAttribute(c):b[c]=d):h||b.setAttribute(c,
d.toString());"name"===c&&a.a.pb(b,h?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,c,d){function e(){return d.has("checkedValue")?a.a.c(d.get("checkedValue")):b.value}function g(){var k=b.checked,g=s?e():k;if(l&&(!m||k)){var h=a.i.p(c);f?p!==g?(k&&(a.a.V(h,g,!0),a.a.V(h,p,!1)),p=g):a.a.V(h,g,k):a.g.oa(h,d,"checked",g,!0)}}function h(){var d=a.a.c(c());b.checked=f?0<=a.a.l(d,e()):k?d:e()===d}var k="checkbox"==b.type,m="radio"==b.type;if(k||m){var f=k&&a.a.c(c())instanceof
Array,p=f?e():q,s=m||f,l=!1;m&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.h(g,null,{I:b});a.a.r(b,"click",g);a.h(h,null,{I:b});l=!0}}};a.g.U.checked=!0;a.d.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.d.css={update:function(b,c){var d=a.a.c(c());"object"==typeof d?a.a.K(d,function(c,d){d=a.a.c(d);a.a.ma(b,c,d)}):(d=String(d||""),a.a.ma(b,b.__ko__cssValue,!1),b.__ko__cssValue=d,a.a.ma(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):
d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,e,g){var h=c()||{};a.a.K(h,function(k){"string"==typeof k&&a.a.r(b,k,function(b){var f,h=c()[k];if(h){try{var s=a.a.Q(arguments);e=g.$data;s.unshift(e);f=h.apply(e,s)}finally{!0!==f&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}!1===d.get(k+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={hb:function(b){return function(){var c=
b(),d=a.a.Ha(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.J.Aa};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.J.Aa}}},init:function(b,c){return a.d.template.init(b,a.d.foreach.hb(c))},update:function(b,c,d,e,g){return a.d.template.update(b,a.d.foreach.hb(c),d,e,g)}};a.g.Y.foreach=!1;a.e.P.foreach=!0;a.d.hasfocus=
{init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var g=b.ownerDocument;if("activeElement"in g){var f;try{f=g.activeElement}catch(h){f=g.body}e=f===b}g=c();a.g.oa(g,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var g=e.bind(null,!0),h=e.bind(null,!1);a.a.r(b,"focus",g);a.a.r(b,"focusin",g);a.a.r(b,"blur",h);a.a.r(b,"focusout",h)},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),a.i.p(a.a.da,
null,[b,d?"focusin":"focusout"]))}};a.g.U.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.g.U.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Ka(b,c())}};var L=a.a.f.D();H("if");H("ifnot",!1,!0);H("with",!0,!1,function(a,c){return a.createChildContext(c)});a.d.options={init:function(b){if("select"!==a.a.v(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,
c,d){function e(){return a.a.ga(b.options,function(a){return a.selected})}function g(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function h(c,d){if(p.length){var f=0<=a.a.l(p,a.k.o(d[0]));a.a.qb(d[0],f);l&&!f&&a.i.p(a.a.da,null,[b,"change"])}}var k=0!=b.length&&b.multiple?b.scrollTop:null;c=a.a.c(c());var m=d.get("optionsIncludeDestroyed"),f={},p;p=b.multiple?a.a.ha(e(),a.k.o):0<=b.selectedIndex?[a.k.o(b.options[b.selectedIndex])]:[];if(c){"undefined"==typeof c.length&&(c=[c]);
var s=a.a.ga(c,function(b){return m||b===q||null===b||!a.a.c(b._destroy)});d.has("optionsCaption")&&(c=a.a.c(d.get("optionsCaption")),null!==c&&c!==q&&s.unshift(f))}else c=[];var l=!1;c=h;d.has("optionsAfterRender")&&(c=function(b,c){h(0,c);a.i.p(d.get("optionsAfterRender"),null,[c[0],b!==f?b:q])});a.a.Ja(b,s,function(b,c,e){e.length&&(p=e[0].selected?[a.k.o(e[0])]:[],l=!0);c=w.createElement("option");b===f?(a.a.Ma(c,d.get("optionsCaption")),a.k.na(c,q)):(e=g(b,d.get("optionsValue"),b),a.k.na(c,a.a.c(e)),
b=g(b,d.get("optionsText"),e),a.a.Ma(c,b));return[c]},null,c);(b.multiple?p.length&&e().length<p.length:p.length&&0<=b.selectedIndex?a.k.o(b.options[b.selectedIndex])!==p[0]:p.length||0<=b.selectedIndex)&&a.i.p(a.a.da,null,[b,"change"]);a.a.Hb(b);k&&20<Math.abs(k-b.scrollTop)&&(b.scrollTop=k)}};a.d.options.Ea=a.a.f.D();a.d.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.r(b,"change",function(){var e=c(),g=[];a.a.n(b.getElementsByTagName("option"),function(b){b.selected&&g.push(a.k.o(b))});
a.g.oa(e,d,"selectedOptions",g)})},update:function(b,c){if("select"!=a.a.v(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c());d&&"number"==typeof d.length&&a.a.n(b.getElementsByTagName("option"),function(b){var c=0<=a.a.l(d,a.k.o(b));a.a.qb(b,c)})}};a.g.U.selectedOptions=!0;a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.K(d,function(c,d){d=a.a.c(d);b.style[c]=d||""})}};a.d.submit={init:function(b,c,d,e,g){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");
a.a.r(b,"submit",function(a){var d,e=c();try{d=e.call(g.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Ma(b,c())}};a.e.P.text=!0;a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.Bb;a.a.pb(b,d)}}};a.d.uniqueName.Bb=0;a.d.value={after:["options","foreach"],init:function(b,c,d){function e(){k=!1;var e=c(),f=a.k.o(b);a.g.oa(e,d,"value",f)}var g=
["change"],h=d.get("valueUpdate"),k=!1;h&&("string"==typeof h&&(h=[h]),a.a.X(g,h),g=a.a.Va(g));!a.a.ja||"input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.l(g,"propertychange")||(a.a.r(b,"propertychange",function(){k=!0}),a.a.r(b,"blur",function(){k&&e()}));a.a.n(g,function(c){var d=e;a.a.ac(c,"after")&&(d=function(){setTimeout(e,0)},c=c.substring(5));a.a.r(b,c,d)})},update:function(b,c){var d="select"===a.a.v(b),e=a.a.c(c()),g=a.k.o(b);
e!==g&&(g=function(){a.k.na(b,e)},g(),d&&(e!==a.k.o(b)?a.i.p(a.a.da,null,[b,"change"]):setTimeout(g,0)))}};a.g.U.value=!0;a.d.visible={update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(c,d,e,g,h){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,g,h)}}})("click");a.w=function(){};a.w.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");
};a.w.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.w.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.m.j(d)}if(1==b.nodeType||8==b.nodeType)return new a.m.W(b);throw Error("Unknown template type: "+b);};a.w.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,
d)};a.w.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.w.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.w);a.Oa=function(){function b(b,c,d,k){b=a.g.Ga(b);for(var m=a.g.Y,f=0;f<b.length;f++){var p=b[f].key;if(m.hasOwnProperty(p)){var s=m[p];if("function"===typeof s){if(p=s(b[f].value))throw Error(p);}else if(!s)throw Error("This template engine does not support the '"+
p+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.g.ka(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return k.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Ib:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Oa.Ub(b,c)},
d)},Ub:function(a,g){return a.replace(c,function(a,c,d,f,e){return b(e,c,d,g)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",g)})},yb:function(b,c){return a.u.Ca(function(d,k){var m=d.nextSibling;m&&m.nodeName.toLowerCase()===c&&a.pa(m,b,k)})}}}();a.b("__tr_ambtns",a.Oa.yb);(function(){a.m={};a.m.j=function(a){this.j=a};a.m.j.prototype.text=function(){var b=a.a.v(this.j),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.j[b];var c=arguments[0];
"innerHTML"===b?a.a.Ka(this.j,c):this.j[b]=c};var b=a.a.f.D()+"_";a.m.j.prototype.data=function(c){if(1===arguments.length)return a.a.f.get(this.j,b+c);a.a.f.set(this.j,b+c,arguments[1])};var c=a.a.f.D();a.m.W=function(a){this.j=a};a.m.W.prototype=new a.m.j;a.m.W.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.j,c)||{};b.Pa===q&&b.sa&&(b.Pa=b.sa.innerHTML);return b.Pa}a.a.f.set(this.j,c,{Pa:arguments[0]})};a.m.j.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.j,
c)||{}).sa;a.a.f.set(this.j,c,{sa:arguments[0]})};a.b("templateSources",a.m);a.b("templateSources.domElement",a.m.j);a.b("templateSources.anonymousTemplate",a.m.W)})();(function(){function b(b,c,d){var e;for(c=a.e.nextSibling(c);b&&(e=b)!==c;)b=a.e.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var f=c[0],e=c[c.length-1],g=f.parentNode,h=a.H.instance,n=h.preprocessNode;if(n){b(f,e,function(a,b){var c=a.previousSibling,d=n.call(h,a);d&&(a===f&&(f=d[0]||b),a===e&&(e=d[d.length-1]||c))});c.length=
0;if(!f)return;f===e?c.push(f):(c.push(f,e),a.a.$(c,g))}b(f,e,function(b){1!==b.nodeType&&8!==b.nodeType||a.Sa(d,b)});b(f,e,function(b){1!==b.nodeType&&8!==b.nodeType||a.u.vb(b,[d])});a.a.$(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,f,h,s){s=s||{};var l=b&&d(b),l=l&&l.ownerDocument,n=s.templateEngine||g;a.Oa.Ib(f,n,l);f=n.renderTemplate(f,h,s,l);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");
l=!1;switch(e){case "replaceChildren":a.e.S(b,f);l=!0;break;case "replaceNode":a.a.nb(b,f);l=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}l&&(c(f,h),s.afterRender&&a.i.p(s.afterRender,null,[f,h.$data]));return f}var g;a.La=function(b){if(b!=q&&!(b instanceof a.w))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.Ia=function(b,c,f,h,s){f=f||{};if((f.templateEngine||g)==q)throw Error("Set a template engine before calling renderTemplate");
s=s||"replaceChildren";if(h){var l=d(h);return a.h(function(){var g=c&&c instanceof a.G?c:new a.G(a.a.c(c)),r="function"==typeof b?b(g.$data,g):b,g=e(h,s,r,g,f);"replaceNode"==s&&(h=g,l=d(h))},null,{ua:function(){return!l||!a.a.va(l)},I:l&&"replaceNode"==s?l.parentNode:l})}return a.u.Ca(function(d){a.Ia(b,c,f,d,"replaceNode")})};a.$b=function(b,d,f,g,h){function l(a,b){c(b,r);f.afterRender&&f.afterRender(b,a)}function n(a,c){r=h.createChildContext(a,f.as,function(a){a.$index=c});var d="function"==
typeof b?b(a,r):b;return e(null,"ignoreTargetNode",d,r,f)}var r;return a.h(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.ga(b,function(b){return f.includeDestroyed||b===q||null===b||!a.a.c(b._destroy)});a.i.p(a.a.Ja,null,[g,b,n,f,l])},null,{I:g})};var h=a.a.f.D();a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||d.name?a.e.Z(b):(d=a.e.childNodes(b),d=a.a.Vb(d),(new a.m.W(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,e,g){c=
a.a.c(c());d={};e=!0;var l,n=null;"string"!=typeof c&&(d=c,c=a.a.c(d.name),"if"in d&&(e=a.a.c(d["if"])),e&&"ifnot"in d&&(e=!a.a.c(d.ifnot)),l=a.a.c(d.data));"foreach"in d?n=a.$b(c||b,e&&d.foreach||[],d,b,g):e?(g="data"in d?g.createChildContext(l,d.as):g,n=a.Ia(c||b,g,d,b)):a.e.Z(b);g=n;(l=a.a.f.get(b,h))&&"function"==typeof l.B&&l.B();a.a.f.set(b,h,g&&g.aa()?g:q)}};a.g.Y.template=function(b){b=a.g.Ga(b);return 1==b.length&&b[0].unknown||a.g.Sb(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};
a.e.P.template=!0})();a.b("setTemplateEngine",a.La);a.b("renderTemplate",a.Ia);a.a.ra=function(){function a(b,d,e,g,h){var k=Math.min,m=Math.max,f=[],p,q=b.length,l,n=d.length,r=n-q||1,v=q+n+1,t,u,w;for(p=0;p<=q;p++)for(u=t,f.push(t=[]),w=k(n,p+r),l=m(0,p-1);l<=w;l++)t[l]=l?p?b[p-1]===d[l-1]?u[l-1]:k(u[l]||v,t[l-1]||v)+1:l+1:p+1;k=[];m=[];r=[];p=q;for(l=n;p||l;)n=f[p][l]-1,l&&n===f[p][l-1]?m.push(k[k.length]={status:e,value:d[--l],index:l}):p&&n===f[p-1][l]?r.push(k[k.length]={status:g,value:b[--p],
index:p}):(--l,--p,h.sparse||k.push({status:"retained",value:d[l]}));if(m.length&&r.length){b=10*q;var z;for(d=e=0;(h.dontLimitMoves||d<b)&&(z=m[e]);e++){for(g=0;f=r[g];g++)if(z.value===f.value){z.moved=f.index;f.moved=z.index;r.splice(g,1);d=g=0;break}d+=g}}return k.reverse()}return function(c,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};c=c||[];d=d||[];return c.length<=d.length?a(c,d,"added","deleted",e):a(d,c,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.ra);(function(){function b(b,
c,g,h,k){var m=[],f=a.h(function(){var f=c(g,k,a.a.$(m,b))||[];0<m.length&&(a.a.nb(m,f),h&&a.i.p(h,null,[g,f,k]));m.splice(0,m.length);a.a.X(m,f)},null,{I:b,ua:function(){return!a.a.Ra(m)}});return{R:m,h:f.aa()?f:q}}var c=a.a.f.D();a.a.Ja=function(d,e,g,h,k){function m(b,c){x=s[c];t!==c&&(z[b]=x);x.za(t++);a.a.$(x.R,d);r.push(x);w.push(x)}function f(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.n(c[d].R,function(a){b(a,d,c[d].fa)})}e=e||[];h=h||{};var p=a.a.f.get(d,c)===q,s=a.a.f.get(d,c)||[],
l=a.a.ha(s,function(a){return a.fa}),n=a.a.ra(l,e,h.dontLimitMoves),r=[],v=0,t=0,u=[],w=[];e=[];for(var z=[],l=[],x,A=0,y,B;y=n[A];A++)switch(B=y.moved,y.status){case "deleted":B===q&&(x=s[v],x.h&&x.h.B(),u.push.apply(u,a.a.$(x.R,d)),h.beforeRemove&&(e[A]=x,w.push(x)));v++;break;case "retained":m(A,v++);break;case "added":B!==q?m(A,B):(x={fa:y.value,za:a.q(t++)},r.push(x),w.push(x),p||(l[A]=x))}f(h.beforeMove,z);a.a.n(u,h.beforeRemove?a.L:a.removeNode);for(var A=0,p=a.e.firstChild(d),C;x=w[A];A++){x.R||
a.a.extend(x,b(d,g,x.fa,k,x.za));for(v=0;n=x.R[v];p=n.nextSibling,C=n,v++)n!==p&&a.e.eb(d,n,C);!x.Ob&&k&&(k(x.fa,x.R,x.za),x.Ob=!0)}f(h.beforeRemove,e);f(h.afterMove,z);f(h.afterAdd,l);a.a.f.set(d,c,r)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Ja);a.J=function(){this.allowTemplateRewriting=!1};a.J.prototype=new a.w;a.J.prototype.renderTemplateSource=function(b){var c=(9>a.a.ja?0:b.nodes)?b.nodes():null;if(c)return a.a.Q(c.cloneNode(!0).childNodes);b=b.text();return a.a.Fa(b)};a.J.Aa=
new a.J;a.La(a.J.Aa);a.b("nativeTemplateEngine",a.J);(function(){a.Ba=function(){var a=this.Rb=function(){if("undefined"==typeof u||!u.tmpl)return 0;try{if(0<=u.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,g){g=g||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=u.template(null,"{{ko_with $item.koBindingContext}}"+h+
"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=u.extend({koBindingContext:e},g.templateOptions);e=u.tmpl(h,b,e);e.appendTo(w.createElement("div"));u.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(u.tmpl.tag.ko_code={open:"__.push($1 || '');"},u.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.Ba.prototype=
new a.w;var b=new a.Ba;0<b.Rb&&a.La(b);a.b("jqueryTmplTemplateEngine",a.Ba)})()})})();})();

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

			var btns = $('#dataButtons');
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
			});



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

			btns.transition({
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
						backbtn.transition({
							perspective: '1000',
							x: '0%',
							duration: '200',
							opacity: '1',
						});
						creditsbtn.transition({
							perspective: '1000',
							x: '0%',
							opacity: '1',
							duration: '350',
						});
					}
				});

				f_text.transition({
					perspective: '1000',
					duration: '350',
					marginRight: '0%',
					paddingLeft: '2px'
				});

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

						//prefs_content.css({display: 'block'});



				prefs.transition({
					perspective: '1000',
					x: '0',
					easing: 'in',
					duration: '150',
					complete: function() {
						//spinner.transition({opacity: '1', duration: '50' });
						inTransition = false;

					}
				});
			}, 1);

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



			inTransition = true;

			self.saveGolfer();

			var backbtn = $('#pageBackButton');

			//var spinner = $('#prefsPlayerHcp');


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
			duration: '350',
			easing: 'in',
		});
	}

	self.hideCredits = function() {

		var credits = $('#credits');
		credits.transition({
			perspective: '1000',
			y: '100%',
			duration: '350',
			easing: 'out',
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
				if (self.firstRun() === true) {
					self.firstRun(false);
				}
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

		//$.mobile.changePage("#f_page", { transition: "slide", reverse: true });
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

				header_c.transition({
					perspective: '1000',
					x: '50%',
					opacity: '0',
					duration: '350',
					complete: function() {
						header_c.css({ visibility: 'hidden', display: 'none'
						});
					}
				});

				header_front.transition({
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
				});
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
				el.transition({ opacity: 1, queue: false, duration: '500ms' });
			}
			else {
				el.transition({ opacity: 0, queue: false, duration: '500ms' });
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



}

$(document).on('mobileinit', function() {
  	/*$.mobile.loader.prototype.options.theme = "b";
	$.mobile.loader.prototype.options.textVisible = true;*/
	//$.mobile.loader.prototype.options.text = "Ladataan...";


});


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


	/*window.addEventListener('orientationchange', function(e, ready) {

		if(ready) {

			if (window.orientation == "90" || window.orientation == "-90" || window.orientation == "0" || window.orientation == "360" ) {
				document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
			}
		}


		//}

	}); */



/*	document.addEventListener('focusout', function(e) {
		document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
	});*/

	$('input').bind('focus', function() {
		/*$('#root').css({ top: '23px !important' });
		$('#root').css({ top: '22px !important' });*/

	});


	$('input').bind('focusout', function() {

		setTimeout(function() {
			if(vm.launchedFromHome() == true) {
				$('#root').addClass('ios_top');
			}
		}, 10);

		/*document.body.style.top = '20px !important';
		document.body.style.paddingBottom = '20px !important';*/

		/*setTimeout(function() {
			$('#root').css({ top: '22px' });
			console.log("set to 22px");
		}, 950);

		setTimeout(function() {
			$('#root').css({ top: '44px' });
			console.log("set to 44px");
		}, 350);*/




		//$('#root').css({ top: '22px !important' });

		/*var x = (window.navigator.standalone) ? true : false;
		if(x) {*/

		//document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
		//$('#root').css({ webkitTransform = 'translate3d(0, 20px, 0)' });


		/*	setTimeout(function() {

				//$('body').css('height', '+=9999').css('height', '-=9999');





				//document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';

			}, 350);
		//}*/
	});



    /* $(window)
          .bind('orientationchange', function(){
               if (window.orientation % 180 == 0){
                   $(document.body).css("-webkit-transform-origin", "")
                       .css("-webkit-transform", "");
               }
               else {
                   if ( window.orientation > 0) { //clockwise
                     $(document.body).css("-webkit-transform-origin", "200px 190px")
                       .css("-webkit-transform",  "rotate(-90deg)");
                   }
                   else {
                     $(document.body).css("-webkit-transform-origin", "280px 190px")
                       .css("-webkit-transform",  "rotate(90deg)");
                   }
               }
           })
          .trigger('orientationchange'); */

	//ko.applyBindings(vm, document.getElementById("f_page"));
	//ko.applyBindings(vm, document.getElementById("prefs"));







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



	$('#root').on('pageshow', function() {

		if (vm.loadedRoundStartTime() !== "") {
//			$('html, body').animate({scrollTop: vm.scrollPos()}, "slow");

			$.mobile.silentScroll(vm.scrollPos());
		}
	});

	$('#courseSelect').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("courseSelect"));
	});

	$('#s_page').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("s_page"));
	});

	$('#scoreCard').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("scoreCard"));
	});


	$('#courseSelect').on('pageshow', function(e) {
		$('#courseList').listview('refresh');
	});

	$('#s_page').on('pageshow', function(e) {

 	// https://github.com/jquery/jquery-mobile/issues/4078
		//$(this).addClass('ui-page-active');

//		$("#slaidi").slider();

		/*vm.calcRoundDuration();
		var clock = setInterval(function() {
			vm.calcRoundDuration();
		} , 2000);*/

	});

	$('#s_page').on('pagehide', function() {
//		if (clock) {
	//		clearInterval(clock);
		//}
	});

	$('#prefs').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("prefs"));
		vm.hcpScroller();
	});

	$(document).off('pageinit');


});

/*!
 * Add to Homescreen v2.0.7 ~ Copyright (c) 2013 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var addToHome = (function (w) {
	var nav = w.navigator,
		isIDevice = 'platform' in nav && (/iphone|ipod|ipad/gi).test(nav.platform),
		isIPad,
		isRetina,
		isSafari,
		isStandalone,
		OSVersion,
		startX = 0,
		startY = 0,
		lastVisit = 0,
		isExpired,
		isSessionActive,
		isReturningVisitor,
		balloon,
		overrideChecks,

		positionInterval,
		closeTimeout,

		options = {
			autostart: true,			// Automatically open the balloon
			returningVisitor: false,	// Show the balloon to returning visitors only (setting this to true is HIGHLY RECCOMENDED)
			animationIn: 'drop',		// drop || bubble || fade
			animationOut: 'fade',		// drop || bubble || fade
			startDelay: 2000,			// 2 seconds from page load before the balloon appears
			lifespan: 15000,			// 15 seconds before it is automatically destroyed
			bottomOffset: 14,			// Distance of the balloon from bottom
			expire: 0,					// Minutes to wait before showing the popup again (0 = always displayed)
			message: '',				// Customize your message or force a language ('' = automatic)
			touchIcon: false,			// Display the touch icon
			arrow: true,				// Display the balloon arrow
			hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
			closeButton: true,			// Let the user close the balloon
			iterations: 100				// Internal/debug use
		},

		intl = {
			ar:    '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
			ca_es: 'Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d\'inici</strong>.',
			cs_cz: 'Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.',
			da_dk: 'Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
			de_de: 'Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.',
			el_gr: 'Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.',
			en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
			es_es: 'Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.',
			fi_fi: 'Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.',
			fr_fr: 'Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l\'écran d\'accueil</strong>.',
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hr_hr: 'Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.',
			hu_hu: 'Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.',
			it_it: 'Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.',
			ja_jp: 'このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。',
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: 'Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>',
			nl_nl: 'Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.',
			pl_pl: 'Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.',
			pt_br: 'Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.',
			pt_pt: 'Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.',
			ru_ru: 'Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.',
			sv_se: 'Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
			th_th: 'ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>',
			tr_tr: 'Bu uygulamayı %device\'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.',
			uk_ua: 'Встановіть цей веб сайт на Ваш %device: натисніть %icon, а потім <strong>На початковий екран</strong>.',
			zh_cn: '您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。',
			zh_tw: '您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。'
		};

	function init () {
		// Preliminary check, all further checks are performed on iDevices only
		if ( !isIDevice ) return;

		var now = Date.now(),
			i;

		// Merge local with global options
		if ( w.addToHomeConfig ) {
			for ( i in w.addToHomeConfig ) {
				options[i] = w.addToHomeConfig[i];
			}
		}
		if ( !options.autostart ) options.hookOnLoad = false;

		isIPad = (/ipad/gi).test(nav.platform);
		isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
		isSafari = (/Safari/i).test(nav.appVersion) && !(/CriOS/i).test(nav.appVersion);
		isStandalone = nav.standalone;
		OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
		OSVersion = OSVersion && OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;

		lastVisit = +w.localStorage.getItem('addToHome');

		isSessionActive = w.sessionStorage.getItem('addToHomeSession');
		isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28*24*60*60*1000 > now : true;

		if ( !lastVisit ) lastVisit = now;

		// If it is expired we need to reissue a new balloon
		isExpired = isReturningVisitor && lastVisit <= now;

		if ( options.hookOnLoad ) w.addEventListener('load', loaded, false);
		else if ( !options.hookOnLoad && options.autostart ) loaded();
	}

	function loaded () {
		w.removeEventListener('load', loaded, false);

		if ( !isReturningVisitor ) w.localStorage.setItem('addToHome', Date.now());
		else if ( options.expire && isExpired ) w.localStorage.setItem('addToHome', Date.now() + options.expire * 60000);

		if ( !overrideChecks && ( !isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor ) ) return;

		var touchIcon = '',
			platform = nav.platform.split(' ')[0],
			language = nav.language.replace('-', '_');

		balloon = document.createElement('div');
		balloon.id = 'addToHomeScreen';
		balloon.style.cssText += 'left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:' + (OSVersion < 5 ? 'absolute' : 'fixed');

		// Localize message
		if ( options.message in intl ) {		// You may force a language despite the user's locale
			language = options.message;
			options.message = '';
		}
		if ( options.message === '' ) {			// We look for a suitable language (defaulted to en_us)
			options.message = language in intl ? intl[language] : intl['en_us'];
		}

		if ( options.touchIcon ) {
			touchIcon = isRetina ?
				document.querySelector('head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon]') :
				document.querySelector('head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');

			if ( touchIcon ) {
				touchIcon = '<span style="background-image:url(' + touchIcon.href + ')" class="addToHomeTouchIcon"></span>';
			}
		}

		balloon.className = (isIPad ? 'addToHomeIpad' : 'addToHomeIphone') + (touchIcon ? ' addToHomeWide' : '');
		balloon.innerHTML = touchIcon +
			options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') +
			(options.arrow ? '<span class="addToHomeArrow"></span>' : '') +
			(options.closeButton ? '<span class="addToHomeClose">\u00D7</span>' : '');

		document.body.appendChild(balloon);

		// Add the close action
		if ( options.closeButton ) balloon.addEventListener('click', clicked, false);

		if ( !isIPad && OSVersion >= 6 ) window.addEventListener('orientationchange', orientationCheck, false);

		setTimeout(show, options.startDelay);
	}

	function show () {
		var duration,
			iPadXShift = 208;

		// Set the initial position
		if ( isIPad ) {
			if ( OSVersion < 5 ) {
				startY = w.scrollY;
				startX = w.scrollX;
			} else if ( OSVersion < 6 ) {
				iPadXShift = 160;
			}

			balloon.style.top = startY + options.bottomOffset + 'px';
			balloon.style.left = startX + iPadXShift - Math.round(balloon.offsetWidth / 2) + 'px';

			switch ( options.animationIn ) {
				case 'drop':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.opacity = '0';
					balloon.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		} else {
			startY = w.innerHeight + w.scrollY;

			if ( OSVersion < 5 ) {
				startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
				balloon.style.left = startX + 'px';
				balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + 'px';
			} else {
				balloon.style.left = '50%';
				balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 ? 40 : 0 ) + 'px';
				balloon.style.bottom = options.bottomOffset + 'px';
			}

			switch (options.animationIn) {
				case 'drop':
					duration = '1s';
					balloon.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
					break;
				case 'bubble':
					duration = '0.6s';
					balloon.style.webkitTransform = 'translate3d(0,' + (balloon.offsetHeight + options.bottomOffset + 50) + 'px,0)';
					break;
				default:
					duration = '1s';
					balloon.style.opacity = '0';
			}
		}

		balloon.offsetHeight;	// repaint trick
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.opacity = '1';
		balloon.style.webkitTransform = 'translate3d(0,0,0)';
		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);

		closeTimeout = setTimeout(close, options.lifespan);
	}

	function manualShow (override) {
		if ( !isIDevice || balloon ) return;

		overrideChecks = override;
		loaded();
	}

	function close () {
		clearInterval( positionInterval );
		clearTimeout( closeTimeout );
		closeTimeout = null;

		// check if the popup is displayed and prevent errors
		if ( !balloon ) return;

		var posY = 0,
			posX = 0,
			opacity = '1',
			duration = '0';

		if ( options.closeButton ) balloon.removeEventListener('click', clicked, false);
		if ( !isIPad && OSVersion >= 6 ) window.removeEventListener('orientationchange', orientationCheck, false);

		if ( OSVersion < 5 ) {
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth)/2) - startX;
		}

		balloon.style.webkitTransitionProperty = '-webkit-transform,opacity';

		switch ( options.animationOut ) {
			case 'drop':
				if ( isIPad ) {
					duration = '0.4s';
					opacity = '0';
					posY += 50;
				} else {
					duration = '0.6s';
					posY += balloon.offsetHeight + options.bottomOffset + 50;
				}
				break;
			case 'bubble':
				if ( isIPad ) {
					duration = '0.8s';
					posY -= balloon.offsetHeight + options.bottomOffset + 50;
				} else {
					duration = '0.4s';
					opacity = '0';
					posY -= 50;
				}
				break;
			default:
				duration = '0.8s';
				opacity = '0';
		}

		balloon.addEventListener('webkitTransitionEnd', transitionEnd, false);
		balloon.style.opacity = opacity;
		balloon.style.webkitTransitionDuration = duration;
		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}


	function clicked () {
		w.sessionStorage.setItem('addToHomeSession', '1');
		isSessionActive = true;
		close();
	}

	function transitionEnd () {
		balloon.removeEventListener('webkitTransitionEnd', transitionEnd, false);

		balloon.style.webkitTransitionProperty = '-webkit-transform';
		balloon.style.webkitTransitionDuration = '0.2s';

		// We reached the end!
		if ( !closeTimeout ) {
			balloon.parentNode.removeChild(balloon);
			balloon = null;
			return;
		}

		// On iOS 4 we start checking the element position
		if ( OSVersion < 5 && closeTimeout ) positionInterval = setInterval(setPosition, options.iterations);
	}

	function setPosition () {
		var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
			posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
			posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;

		// Screen didn't move
		if ( posY == matrix.m42 && posX == matrix.m41 ) return;

		balloon.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
	}

	// Clear local and session storages (this is useful primarily in development)
	function reset () {
		w.localStorage.removeItem('addToHome');
		w.sessionStorage.removeItem('addToHomeSession');
	}

	function orientationCheck () {
		balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - ( w.orientation%180 && OSVersion >= 6 ? 40 : 0 ) + 'px';
	}

	// Bootstrap!
	init();

	return {
		show: manualShow,
		close: close,
		reset: reset
	};
})(window);

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