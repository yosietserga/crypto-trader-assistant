'use strict';

function getAVGInterval(a) {
    let diff = [];
    let dt = new Date();
    for (let i in a) {
        if (i > 0) {
            let p = a[i - 1].split(':');
            let c = a[i].split(':');

            let prev = new Date(dt.getFullYear(), (dt.getMonth() + 1), dt.getDate(), p[0], p[1], p[2]);
            let curr = new Date(dt.getFullYear(), (dt.getMonth() + 1), dt.getDate(), c[0], c[1], c[2]);

            diff.push(curr.getTime() - prev.getTime());
        }
    }
    if (!empty(diff))
        return Math.abs(parseFloat(diff.reduce(getSum) / diff.length / 1000).toFixed(2));
}

function getSum(total, num) {
    return parseFloat(total) + parseFloat(num);
}

function generateId() {
    return Math.floor((Math.random() * 1000000) + 1);
}

function getFloat(num) {
    if (empty(num)) return 0;
    if (typeof num == 'string' && num.find(',')) num = num.replace(',', '');
    return parseFloat(num);
}

function empty(mixedVar) {
    //  discuss at: http://locutus.io/php/empty/
    // original by: Philippe Baumann
    //    input by: Onno Marsman (https://twitter.com/onnomarsman)
    //    input by: LH
    //    input by: Stoyan Kyosev (http://www.svest.org/)
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Francesco
    // improved by: Marc Jansen
    // improved by: Rafał Kukawski (http://blog.kukawski.pl)
    //   example 1: empty(null)
    //   returns 1: true
    //   example 2: empty(undefined)
    //   returns 2: true
    //   example 3: empty([])
    //   returns 3: true
    //   example 4: empty({})
    //   returns 4: true
    //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
    //   returns 5: false

    var undef
    var key
    var i
    var len
    var emptyValues = [undef, null, false, 0, '', '0']

    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true
        }
    }

    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false
            }
        }
        return true
    }

    return false
}

function isset() {
    //  discuss at: http://locutus.io/php/isset/
    // original by: Kevin van Zonneveld (http://kvz.io)
    // improved by: FremyCompany
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Rafał Kukawski (http://blog.kukawski.pl)
    //   example 1: isset( undefined, true)
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' )
    //   returns 2: true

    var a = arguments
    var l = a.length
    var i = 0
    var undef

    if (l === 0) {
        throw new Error('Empty isset')
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false
        }
        i++
    }

    return true
}

function rtrim(str, charlist) {
    //  discuss at: http://locutus.io/php/rtrim/
    // original by: Kevin van Zonneveld (http://kvz.io)
    //    input by: Erkekjetter
    //    input by: rem
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //   example 1: rtrim('    Kevin van Zonneveld    ')
    //   returns 1: '    Kevin van Zonneveld'

    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '\\$1')

    var re = new RegExp('[' + charlist + ']+$', 'g')

    return (str + '').replace(re, '')
}

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function set(key, value, subkey = null) {
    if (!isset(key)) return false;

    if (subkey) {
        if (!get(key)) set(key, {});
        __cData[key][subkey] = value;
    } else {
        __cData[key] = value;
    }
}

function get(key, subkey = null) {
    if (isset(key) && isset(__cData[key]) && isset(subkey) && !empty(subkey)) {
        return __cData[key][subkey];
    } else if (isset(key) && !empty(key)) {
        return __cData[key];
    } else {
        return __cData;
    }
}

function del(key, subkey = null) {
    if (isset(key) && isset(__cData[key]) && isset(subkey) && !empty(subkey)) {
        delete __cData[key][subkey];
    } else if (isset(key) && !empty(key)) {
        delete __cData[key];
    } else {
        __cData = null;
    }
}

function doRequest(url, type, cb) {
    if (typeof url == 'undefined') return;
    if (typeof type == 'undefined') type = 'GET';
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && typeof cb == 'function') {
            cb(this.responseText, this);
        }
    };

   xhttp.open(type, url, true);
   xhttp.send();
}

function getUrl() {
    return window.location.href;
}

const cookie_prefix = 'uaslknf9823rn2f94b329_';
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = cookie_prefix + name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = cookie_prefix + name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = cookie_prefix + name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getExchangeName() {
    let url = getUrl();
    if (!empty(url) && url.find('https://www.huobi.com')) {
        return 'huobi';
    } else if (!empty(url) && url.find('https://www.binance.com')) {
        return 'binance';
    } else if (!empty(url) && (url.find('https://web.zb.com/') || url.find('https://web.zb.cn/') || url.find('https://www.zb.com/'))) {
        return 'zb';
    } else if (!empty(url) && (url.find('https://www.okex.com') || url.find('https://www.okex.me'))) {
        return 'okex';
    }  else if (!empty(url) && (url.find('https://www.fatbtc.com') || url.find('https://www.fatbtc.us'))) {
        return 'fatbtc';
    } else {
        return false;
    }
}

function removeFromMyWrapper(id) {
    if (typeof id === 'undefined') return;
    var el = document.getElementById(id);
    if (el) el.parentNode.removeChild(el);
}

function appendToMyWrapper(str, id, attributes) {
    if (typeof id === 'undefined') id = '';
    if (typeof attributes === 'undefined') attributes = {};

    var wrapper = document.getElementById('myPumpWrapper');
    var exists = document.getElementById(id);
    var li;

    if (id) {
        li = document.getElementById(id);
        if (!li) {
            li = document.createElement('li');
        }
        li.setAttribute('id', id);
    } else {
        li = document.createElement('li');
    }

    li.innerHTML = str;
    li.style.float = 'left';
    li.style.cursor = 'default';
    li.style.position = 'relative';
    li.style.background = 'rgba(0, 0, 0, 0.3)';
    li.style.padding = '4px';

    for (let k in attributes) {
        li.setAttribute(k, attributes[k]);
    }

    if (!exists) wrapper.appendChild(li);
}

function myWrapper() {
    var wrapper = document.getElementById('myPumpWrapper');

    if (!wrapper) {
        var tpl = document.createElement('ul');
        var styles = {
            position: 'absolute',
            top: getStyleTop(),
            left: getStyleLeft(),
            padding: '10px',
            backgroundColor: getStyleRGBA(),
            border: 'solid 2px #000',
            height: 'auto',
            width: 'auto',
            minHeight: '20px',
            display: 'inline-grid',
            zIndex: '999',
            color: '#eee',
            float: 'left',
            scroll: 'auto',
            cursor: 'move'
        };

        tpl.setAttribute('id', 'myPumpWrapper');

        Object.keys(styles).forEach(function(key) {
            tpl.style[key] = styles[key];
        });

        document.body.appendChild(tpl);

        //wrapper draggable
        tpl.onmousedown = myDrag;
        document.onmousemove = myMove;
        document.onmouseup = myDrop;

    }
}

// Get the immediate text (ie not that of children) of element
function getImmediateText(element){
    var text = '';

    // Text and elements are all DOM nodes. We can grab the lot of immediate descendants and cycle through them.
    for(var i = 0, l = element.childNodes.length, node; i < l, node = element.childNodes[i]; ++i){
        // nodeType 3 is text
        if(node.nodeType === 3){
            text += node.nodeValue;
        }
    }

    return text;
}

/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
function getClosest(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    return null;

};

/*
// adapted from https://codepen.io/depthdev/pen/epKDk
*/
function myDrag(e) {
    obj = e.target;

    prev_x = x - obj.offsetLeft;
    prev_y = y - obj.offsetTop;
}

function myMove(e) {
    if (e.pageX) {
        x = e.pageX; // X coordinate based on page, not viewport.
        y = e.pageY; // Y coordinate based on page, not viewport.
    }
    //  else if (e.clientX) {
    //    x=clientX; // X coordinate based on viewport.
    //    y=clientY; // Y coordinate based on viewport.
    //  }

    if (obj) {
        obj.style.left = (x - prev_x) + 'px';
        obj.style.top = (y - prev_y) + 'px';
    }
}

function myDrop(e) {
    obj = false;
}

var opent = true;

function slideToggle() {
    let ul = document.getElementById('myPumpWrapper');

    if (opent) {
        opent = false;
        ul.querySelectorAll('li:nth-child(n+2)').forEach((v, k) => {
            v.style.display = 'none';
        });
    } else {
        opent = true;
        ul.querySelectorAll('li').forEach((v, k) => {
            v.style.display = 'block';
        });
    }
}
