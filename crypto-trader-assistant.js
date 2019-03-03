'use strict';
/** prototypes.js **/
String.prototype.find = function(chr) {
    return this.indexOf(chr) === -1 ? false : true;
};

Number.prototype.countDecimals = function() {
    if (Math.floor(this.valueOf()) === this.valueOf() || isInt(this.valueOf())) return 0;
    return this.toString().split(".")[1].length || 0;
};

Number.prototype.toFix = function(n) {
    return parseFloat(this.toString().substring(0, (this.toString().indexOf(".") + n)));
};

Array.prototype.unique = function() {
    return this.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
};
/** /prototypes.js **/



/** helpers.j **/
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

function getUrl() {
    return window.location.href;
}

function getExchangeName() {
    let url = getUrl();
    if (!empty(url) && url.find('https://www.hbg.com')) {
        return 'hbg';
    } else if (!empty(url) && url.find('https://www.binance.com')) {
        return 'binance';
    }  else if (!empty(url) && (url.find('https://web.zb.com/') || url.find('https://web.zb.cn/') || url.find('https://www.zb.com/'))) {
        return 'zb';
    } else {
        return false;
    }
}
/** /helpers.js **/



/** lang.js **/
const languages = {
    'zb': {
        'en': {
            'Time Interval': 'Time Interval',
            'Price Change': 'Price Change',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Refresh',
            'Currency': 'Currency',
            'Last Price': 'Last Price',
            'Volume': 'Volume',
            'Volume Change': 'Volume Change',
            'Since Opened': 'Since Opened',
            'Acum': 'Accum',
            'AVG': 'AVG',
            'Hide': 'Hide',
            'Show': 'Show',
            'Calculator': 'Calculator',
            'Price': 'Price',
            'Buy': 'Buy',
            'Sell': 'Sell',
            'High': 'High',
            'Low': 'Low',
            'Last': 'Last',
            'Change': 'Change',
            'Improve': 'Improve',
            'Trades': 'Trades',
            'Help Us to Improve': 'Help Us to Improve',
            'WorkingOn': 'We are working fast to give you the best trading tool ever made for huobi global. Our goal is to bring you a unified tool through web and mobile apps that detect early the pump and dump\'s cryptos',
            'Make a donation': 'Please give us your suggestions on how can we improve the browser extension and the mobile app in our <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. You can make a donation, too.'
        },
        'cn': {
            'Time Interval': '時間間隔',
            'Price Change': '價格變動',
            'Min': '最低限度',
            'Max': '最大值',
            'Refresh': 'Refresh',
            'Currency': '貨幣',
            'Last Price': '最後價格',
            'Volume': '量',
            'Volume Change': '成交量變化',
            'Since Opened': '自開業以來',
            'Acum': '積累',
            'AVG': '平均',
            'Hide': '隱藏',
            'Show': '節目',
            'Calculator': '計算器',
            'Price': '價錢',
            'Buy': '購買',
            'Sell': '賣',
            'High': '最高价',
            'Low': '最低价',
            'Last': '持續',
            'Change': '涨幅',
            'Improve': '提高',
            'Trades': '交易',
            'Help Us to Improve': '帮助我们改进',
            'WorkingOn': '我们正在努力为您提供有史以来为huobi global制作的最佳交易工具. 我们的目标是通过早期检测到的网络和移动应用为您提供统一的工具 the pump and dump\'s cryptos',
            'Make a donation': '请告诉我们您如何在我们的 <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. 中改进浏览器扩展和移动应用程序的建议. 你也可以捐款'
        }
    },
    'hbg': {
        'en-us': {
            'Time Interval': 'Time Interval',
            'Price Change': 'Price Change',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Refresh',
            'Currency': 'Currency',
            'Last Price': 'Last Price',
            'Volume': 'Volume',
            'Volume Change': 'Volume Change',
            'Since Opened': 'Since Opened',
            'Acum': 'Accum',
            'AVG': 'AVG',
            'Hide': 'Hide',
            'Show': 'Show',
            'Calculator': 'Calculator',
            'Price': 'Price',
            'Buy': 'Buy',
            'Sell': 'Sell',
            'High': 'High',
            'Low': 'Low',
            'Last': 'Last',
            'Change': 'Change',
            'Improve': 'Improve',
            'Trades': 'Trades',
            'Help Us to Improve': 'Help Us to Improve',
            'WorkingOn': 'We are working fast to give you the best trading tool ever made for huobi global. Our goal is to bring you a unified tool through web and mobile apps that detect early the pump and dump\'s cryptos',
            'Make a donation': 'Please give us your suggestions on how can we improve the browser extension and the mobile app in our <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. You can make a donation, too.'
        },
        'th-th': {
            'Time Interval': 'ช่วงเวลา',
            'Price Change': 'การเปลี่ยนแปลงราคา',
            'Min': 'ขั้นต่ำ',
            'Max': 'สูงสุด',
            'Refresh': 'รีเฟรช',
            'Currency': 'เงินตรา',
            'Last Price': 'ราคาล่าสุด',
            'Volume': 'ปริมาณ',
            'Volume Change': 'เปลี่ยนระดับเสียง',
            'Since Opened': 'ตั้งแต่เปิด',
            'Acum': 'สะสม',
            'AVG': 'AVG',
            'Hide': 'ปิดบัง',
            'Show': 'แสดง',
            'Calculator': 'เครื่องคิดเลข',
            'Price': 'ราคา',
            'Buy': 'ซื้อ',
            'Sell': 'ขาย',
            'High': 'สูง',
            'Low': 'ต่ำ',
            'Last': 'สุดท้าย',
            'Change': 'เปลี่ยนแปลง',
            'Improve': 'ปรับปรุง',
            'Trades': 'การซื้อขาย',
            'Help Us to Improve': 'ช่วยเราปรับปรุง',
            'WorkingOn': 'เรากำลังทำงานอย่างรวดเร็วเพื่อมอบเครื่องมือการซื้อขายที่ดีที่สุดสำหรับ huobi ทั่วโลก เป้าหมายของเราคือการนำเครื่องมือแบบครบวงจรมาให้คุณผ่านเว็บและแอพมือถือที่ตรวจจับการเข้ารหัสลับของปั๊มและการถ่ายโอนข้อมูลในช่วงต้น',
            'Make a donation': 'โปรดให้คำแนะนำกับเราเกี่ยวกับวิธีที่เราสามารถปรับปรุงส่วนขยายเบราว์เซอร์และแอพมือถือในของเรา <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. คุณสามารถบริจาคได้เช่นกัน.'
        },
        'tr-tr': {
            'Time Interval': 'Zaman aralığı',
            'Price Change': 'fiyat değişiklikleri',
            'Min': 'Asgari',
            'Max': 'Maksimum',
            'Refresh': 'Yenile',
            'Currency': 'Para birimi',
            'Last Price': 'Son fiyat',
            'Volume': 'Hacim',
            'Volume Change': 'Hacim Değişimi',
            'Since Opened': 'Açıldığından beri',
            'Acum': 'Birikmiş',
            'AVG': 'AVG',
            'Hide': 'Saklamak',
            'Show': 'Göstermek',
            'Calculator': 'Hesap makinesi',
            'Price': 'Fiyat',
            'Buy': 'Satın almak',
            'Sell': 'Satmak',
            'High': 'Yüksek',
            'Low': 'Düşük',
            'Last': 'Son',
            'Change': 'Değişiklik',
            'Improve': 'Iyileştirmek',
            'Trades': 'İşlemler',
            'Help Us to Improve': 'Geliştirmemize Yardım Edin',
            'WorkingOn': 'Size şimdiye kadar huobi global için üretilmiş en iyi yatırım aracını sunmak için hızlı çalışıyoruz. Amacımız, pompanın ve boşaltma kriptolarının erken dönemlerini tespit eden web ve mobil uygulamalar aracılığıyla size birleşik bir araç sunmaktır.',
            'Make a donation': 'Lütfen bize tarayıcı uzantısını ve mobil uygulamamızı <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Siz de bağış yapabilirsiniz.'
        },
        'vi-vi': {
            'Time Interval': 'Khoảng thời gian',
            'Price Change': 'Thay đổi giá',
            'Min': 'Tối thiểu',
            'Max': 'Tối đa',
            'Refresh': 'Làm tươi',
            'Currency': 'Tiền tệ',
            'Last Price': 'Giá cuối cùng',
            'Volume': 'Âm lượng',
            'Volume Change': 'Thay đổi âm lượng',
            'Since Opened': 'Kể từ khi mở',
            'Acum': 'Tích lũy',
            'AVG': 'AVG',
            'Hide': 'Ẩn giấu',
            'Show': 'Chỉ',
            'Calculator': 'Máy tính',
            'Price': 'Giá bán',
            'Buy': 'Mua',
            'Sell': 'Bán',
            'High': 'Cao',
            'Low': 'Thấp',
            'Last': 'Cuối cùng',
            'Change': 'Thay đổi',
            'Improve': 'Cải tiến',
            'Trades': 'Giao dịch',
            'Help Us to Improve': 'Giúp chúng tôi cải thiện',
            'WorkingOn': 'Chúng tôi đang làm việc nhanh chóng để cung cấp cho bạn công cụ giao dịch tốt nhất từng được tạo ra cho huobi toàn cầu. Mục tiêu của chúng tôi là mang đến cho bạn một công cụ hợp nhất thông qua các ứng dụng web và di động phát hiện sớm tiền điện tử của máy bơm',
            'Make a donation': 'Vui lòng cho chúng tôi đề xuất của bạn về cách chúng tôi có thể cải thiện tiện ích mở rộng trình duyệt và ứng dụng di động trong <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Bạn cũng có thể đóng góp.'
        },
        'pt-br': {
            'Time Interval': 'Intervalo de tempo',
            'Price Change': 'Mudança de preço',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Atualizar',
            'Currency': 'Moeda',
            'Last Price': 'Último preço',
            'Volume': 'Volume',
            'Volume Change': 'Mudança de volume',
            'Since Opened': 'Desde que abriu',
            'Acum': 'Acumulado',
            'AVG': 'AVG',
            'Hide': 'Ocultar',
            'Show': 'Exposição',
            'Calculator': 'Calculadora',
            'Price': 'Preço',
            'Buy': 'Comprar',
            'Sell': 'Vender',
            'High': 'Alto',
            'Low': 'Baixo',
            'Last': 'Último',
            'Change': 'Mudança',
            'Improve': 'Melhorar',
            'Trades': 'Comércios',
            'Help Us to Improve': 'Ajude-nos a melhorar',
            'WorkingOn': 'Estamos trabalhando rapidamente para oferecer a melhor ferramenta de negociação já feita para o mundo huobi. Nosso objetivo é trazer a você uma ferramenta unificada através de aplicativos web e móveis que detectam precocemente os criptos de bombas e lixões',
            'Make a donation': 'Por favor, dê-nos as suas sugestões sobre como podemos melhorar a extensão do navegador e o aplicativo móvel em nosso <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Você pode fazer uma doação também.'
        },
        'pt-pt': {
            'Time Interval': 'Time Interval',
            'Price Change': 'Mudança de preço',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Atualizar',
            'Currency': 'Moeda',
            'Last Price': 'Último preço',
            'Volume': 'Volume',
            'Volume Change': 'Mudança de volume',
            'Since Opened': 'Desde que abriu',
            'Acum': 'Acumulado',
            'AVG': 'AVG',
            'Hide': 'Ocultar',
            'Show': 'Exposição',
            'Calculator': 'Calculadora',
            'Price': 'Preço',
            'Buy': 'Comprar',
            'Sell': 'Vender',
            'High': 'Alto',
            'Low': 'Baixo',
            'Last': 'Último',
            'Change': 'Mudança',
            'Improve': 'Melhorar',
            'Trades': 'Comércios',
            'Help Us to Improve': 'Ajude-nos a melhorar',
            'WorkingOn': 'Estamos trabalhando rapidamente para oferecer a melhor ferramenta de negociação já feita para o mundo huobi. Nosso objetivo é trazer a você uma ferramenta unificada através de aplicativos web e móveis que detectam precocemente os criptos de bombas e lixões',
            'Make a donation': 'Por favor, dê-nos as suas sugestões sobre como podemos melhorar a extensão do navegador e o aplicativo móvel em nosso <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Você pode fazer uma doação também.'
        },
        'fr-fr': {
            'Time Interval': 'Intervalle de temps',
            'Price Change': 'Changement de prix',
            'Min': 'Le minimum',
            'Max': 'Le maximum',
            'Refresh': 'Rafraîchir',
            'Currency': 'Devise',
            'Last Price': 'Dernier prix',
            'Volume': 'Le volume',
            'Volume Change': 'Changement de volume',
            'Since Opened': 'Depuis l\'ouverture',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Cacher',
            'Show': 'Spectacle',
            'Calculator': 'Calculatrice',
            'Price': 'Prix',
            'Buy': 'Acheter',
            'Sell': 'Vendre',
            'High': 'élevé',
            'Low': 'Low',
            'Last': 'Durer',
            'Change': 'Changement',
            'Improve': 'Améliorer',
            'Trades': 'Métiers',
            'Help Us to Improve': 'Aidez-nous à améliorer',
            'WorkingOn': 'Nous travaillons rapidement pour vous offrir le meilleur outil de trading jamais créé pour huobi global. Notre objectif est de vous fournir un outil unifié via des applications Web et mobiles qui détecte rapidement les cryptos de la pompe et du vidage.',
            'Make a donation': 'S\'il vous plaît nous donner vos suggestions sur comment pouvons-nous améliorer l\'extension du navigateur et l\'application mobile dans notre <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Vous pouvez aussi faire un don.'
        },
        'de-de': {
            'Time Interval': 'Tijdsinterval',
            'Price Change': 'Prijs verandering',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Verversen',
            'Currency': 'Valuta',
            'Last Price': 'Laatste prijs',
            'Volume': 'Volume',
            'Volume Change': 'Volumewijziging',
            'Since Opened': 'Sinds geopend',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Verbergen',
            'Show': 'Laten zien',
            'Calculator': 'Rekenmachine',
            'Price': 'Prijs',
            'Buy': 'Kopen',
            'Sell': 'Verkopen',
            'High': 'Hoog',
            'Low': 'Laag',
            'Last': 'Laatste',
            'Change': 'Verandering',
            'Improve': 'Verbeteren',
            'Trades': 'Trades',
            'Help Us to Improve': 'Help ons om te verbeteren',
            'WorkingOn': 'We werken er hard aan om u de beste trading tool te geven die ooit voor huobi global is gemaakt. Ons doel is om u een uniform hulpmiddel te bieden via web- en mobiele apps die de pomp en de cryptos van de dump vroegtijdig detecteren',
            'Make a donation': 'Geef ons uw suggesties over hoe we de browserextensie en de mobiele app in onze kunnen verbeteren <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. U kunt ook een gift doen.'
        },
        'ko-kr': {
            'Time Interval': '시간 간격',
            'Price Change': '가격 변동',
            'Min': '최저한의',
            'Max': '최고',
            'Refresh': '새롭게 하다',
            'Currency': '통화',
            'Last Price': '마지막 가격',
            'Volume': '음량',
            'Volume Change': '볼륨 변경',
            'Since Opened': '이후 개설 됨',
            'Acum': '누적 된',
            'AVG': '평균',
            'Hide': '숨는 장소',
            'Show': '보여 주다',
            'Calculator': '계산자',
            'Price': '가격',
            'Buy': '사다',
            'Sell': '팔다',
            'High': '높은',
            'Low': '낮은',
            'Last': '마지막',
            'Change': '변화',
            'Improve': '돌리다',
            'Trades': '거래',
            'Help Us to Improve': '개선 할 수 있도록 도와주세요.',
            'WorkingOn': '우리는 huobi 글로벌을 위해 만들어진 최고의 거래 도구를 제공하기 위해 빠르게 작업하고 있습니다. 우리의 목표 초기에 펌프 및 덤프의 암호를 감지하는 웹 및 모바일 앱을 통해 통합 도구를 제공하는 것입니다.',
            'Make a donation': '제안 해주세요.에있는 브라우저 확장 프로그램과 모바일 앱을 어떻게 개선 할 수 있을까요 그만큼 <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. 기부도 할 수 있습니다.'
        },
        'ru-ru': {
            'Time Interval': 'интервал времени',
            'Price Change': 'Изменение цены',
            'Min': 'минимальный',
            'Max': 'максимальная',
            'Refresh': 'обновление',
            'Currency': 'валюта',
            'Last Price': 'Последняя цена',
            'Volume': 'объем',
            'Volume Change': 'Изменение громкости',
            'Since Opened': 'С момента открытия',
            'Acum': 'накопленный',
            'AVG': 'средний',
            'Hide': 'Спрятать',
            'Show': 'Шоу',
            'Calculator': 'Калькулятор',
            'Price': 'цена',
            'Buy': 'купить',
            'Sell': 'продавать',
            'High': 'высоко',
            'Low': 'Низкий',
            'Last': 'Прошлой',
            'Change': '+ Изменить',
            'Improve': 'улучшать',
            'Trades': 'Торги',
            'Help Us to Improve': 'Помогите нам улучшить',
            'WorkingOn': 'Мы работаем быстро, чтобы предоставить вам лучший торговый инструмент, когда-либо созданный для huobi global. Наша цель - предоставить вам унифицированный инструмент с помощью веб-приложений и мобильных приложений, которые на ранних этапах обнаруживают криптографическую информацию о насосах и дампах.',
            'Make a donation': 'Пожалуйста, дайте нам свои предложения о том, как мы можем улучшить расширение браузера и мобильное приложение в нашем <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Вы можете сделать пожертвование тоже.'
        },
        'es-es': {
            'Time Interval': 'Intervalo de Tiempo',
            'Price Change': 'Cambio del Precio',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Refrescar',
            'Currency': 'Moneda',
            'Last Price': 'Ultimo Precio',
            'Volume': 'Volumen',
            'Volume Change': 'Cambio del Volumen',
            'Since Opened': 'Desde Abriste',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Ocultar',
            'Show': 'Mostrar',
            'Calculator': 'Calculator',
            'Price': 'Precio',
            'Buy': 'Comprar',
            'Sell': 'Vender',
            'High': 'Alto',
            'Low': 'Bajo',
            'Last': 'Ultimo',
            'Change': 'Cambio',
            'Improve': 'Mejorar',
            'Trades': 'Transacciones',
            'Help Us to Improve': 'Ay&uacute;danos a Mejorar',
            'WorkingOn': 'Estamos trabajando rápido para ofrecerle la mejor herramienta comercial jamás creada para huobi global. Nuestro objetivo es ofrecerle una herramienta unificada a través de aplicaciones web y móviles que detectan a tiempo las subidas y bajadas de las cryptos.',
            'Make a donation': 'Por favor, danos tus sugerencias sobre cómo podemos mejorar la extensión del navegador y la aplicación móvil en nuestros <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. También puedes hacer una donación.'
        },
        'zh-cn': {
            'Time Interval': '時間間隔',
            'Price Change': '價格變動',
            'Min': '最低限度',
            'Max': '最大值',
            'Refresh': 'Refresh',
            'Currency': '貨幣',
            'Last Price': '最後價格',
            'Volume': '量',
            'Volume Change': '成交量變化',
            'Since Opened': '自開業以來',
            'Acum': '積累',
            'AVG': '平均',
            'Hide': '隱藏',
            'Show': '節目',
            'Calculator': '計算器',
            'Price': '價錢',
            'Buy': '購買',
            'Sell': '賣',
            'High': '最高价',
            'Low': '最低价',
            'Last': '持續',
            'Change': '涨幅',
            'Improve': '提高',
            'Trades': '交易',
            'Help Us to Improve': '帮助我们改进',
            'WorkingOn': '我们正在努力为您提供有史以来为huobi global制作的最佳交易工具. 我们的目标是通过早期检测到的网络和移动应用为您提供统一的工具 the pump and dump\'s cryptos',
            'Make a donation': '请告诉我们您如何在我们的 <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. 中改进浏览器扩展和移动应用程序的建议. 你也可以捐款'
        }
    },
    'binance': {
        'en': {
            'Time Interval': 'Time Interval',
            'Price Change': 'Price Change',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Refresh',
            'Currency': 'Currency',
            'Last Price': 'Last Price',
            'Volume': 'Volume',
            'Volume Change': 'Volume Change',
            'Since Opened': 'Since Opened',
            'Acum': 'Accum',
            'AVG': 'AVG',
            'Hide': 'Hide',
            'Show': 'Show',
            'Calculator': 'Calculator',
            'Price': 'Price',
            'Buy': 'Buy',
            'Sell': 'Sell',
            'High': 'High',
            'Low': 'Low',
            'Last': 'Last',
            'Change': 'Change',
            'Improve': 'Improve',
            'Trades': 'Trades',
            'Help Us to Improve': 'Help Us to Improve',
            'WorkingOn': 'We are working fast to give you the best trading tool ever made for huobi global. Our goal is to bring you a unified tool through web and mobile apps that detect early the pump and dump\'s cryptos',
            'Make a donation': 'Please give us your suggestions on how can we improve the browser extension and the mobile app in our <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. You can make a donation, too.'
        },
        'tr': {
            'Time Interval': 'Zaman aralığı',
            'Price Change': 'fiyat değişiklikleri',
            'Min': 'Asgari',
            'Max': 'Maksimum',
            'Refresh': 'Yenile',
            'Currency': 'Para birimi',
            'Last Price': 'Son fiyat',
            'Volume': 'Hacim',
            'Volume Change': 'Hacim Değişimi',
            'Since Opened': 'Açıldığından beri',
            'Acum': 'Birikmiş',
            'AVG': 'AVG',
            'Hide': 'Saklamak',
            'Show': 'Göstermek',
            'Calculator': 'Hesap makinesi',
            'Price': 'Fiyat',
            'Buy': 'Satın almak',
            'Sell': 'Satmak',
            'High': 'Yüksek',
            'Low': 'Düşük',
            'Last': 'Son',
            'Change': 'Değişiklik',
            'Improve': 'Iyileştirmek',
            'Trades': 'İşlemler',
            'Help Us to Improve': 'Geliştirmemize Yardım Edin',
            'WorkingOn': 'Size şimdiye kadar huobi global için üretilmiş en iyi yatırım aracını sunmak için hızlı çalışıyoruz. Amacımız, pompanın ve boşaltma kriptolarının erken dönemlerini tespit eden web ve mobil uygulamalar aracılığıyla size birleşik bir araç sunmaktır.',
            'Make a donation': 'Lütfen bize tarayıcı uzantısını ve mobil uygulamamızı <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Siz de bağış yapabilirsiniz.'
        },
        'vn': {
            'Time Interval': 'Khoảng thời gian',
            'Price Change': 'Thay đổi giá',
            'Min': 'Tối thiểu',
            'Max': 'Tối đa',
            'Refresh': 'Làm tươi',
            'Currency': 'Tiền tệ',
            'Last Price': 'Giá cuối cùng',
            'Volume': 'Âm lượng',
            'Volume Change': 'Thay đổi âm lượng',
            'Since Opened': 'Kể từ khi mở',
            'Acum': 'Tích lũy',
            'AVG': 'AVG',
            'Hide': 'Ẩn giấu',
            'Show': 'Chỉ',
            'Calculator': 'Máy tính',
            'Price': 'Giá bán',
            'Buy': 'Mua',
            'Sell': 'Bán',
            'High': 'Cao',
            'Low': 'Thấp',
            'Last': 'Cuối cùng',
            'Change': 'Thay đổi',
            'Improve': 'Cải tiến',
            'Trades': 'Giao dịch',
            'Help Us to Improve': 'Giúp chúng tôi cải thiện',
            'WorkingOn': 'Chúng tôi đang làm việc nhanh chóng để cung cấp cho bạn công cụ giao dịch tốt nhất từng được tạo ra cho huobi toàn cầu. Mục tiêu của chúng tôi là mang đến cho bạn một công cụ hợp nhất thông qua các ứng dụng web và di động phát hiện sớm tiền điện tử của máy bơm',
            'Make a donation': 'Vui lòng cho chúng tôi đề xuất của bạn về cách chúng tôi có thể cải thiện tiện ích mở rộng trình duyệt và ứng dụng di động trong <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Bạn cũng có thể đóng góp.'
        },
        'pt': {
            'Time Interval': 'Intervalo de tempo',
            'Price Change': 'Mudança de preço',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Atualizar',
            'Currency': 'Moeda',
            'Last Price': 'Último preço',
            'Volume': 'Volume',
            'Volume Change': 'Mudança de volume',
            'Since Opened': 'Desde que abriu',
            'Acum': 'Acumulado',
            'AVG': 'AVG',
            'Hide': 'Ocultar',
            'Show': 'Exposição',
            'Calculator': 'Calculadora',
            'Price': 'Preço',
            'Buy': 'Comprar',
            'Sell': 'Vender',
            'High': 'Alto',
            'Low': 'Baixo',
            'Last': 'Último',
            'Change': 'Mudança',
            'Improve': 'Melhorar',
            'Trades': 'Comércios',
            'Help Us to Improve': 'Ajude-nos a melhorar',
            'WorkingOn': 'Estamos trabalhando rapidamente para oferecer a melhor ferramenta de negociação já feita para o mundo huobi. Nosso objetivo é trazer a você uma ferramenta unificada através de aplicativos web e móveis que detectam precocemente os criptos de bombas e lixões',
            'Make a donation': 'Por favor, dê-nos as suas sugestões sobre como podemos melhorar a extensão do navegador e o aplicativo móvel em nosso <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Você pode fazer uma doação também.'
        },
        'fr': {
            'Time Interval': 'Intervalle de temps',
            'Price Change': 'Changement de prix',
            'Min': 'Le minimum',
            'Max': 'Le maximum',
            'Refresh': 'Rafraîchir',
            'Currency': 'Devise',
            'Last Price': 'Dernier prix',
            'Volume': 'Le volume',
            'Volume Change': 'Changement de volume',
            'Since Opened': 'Depuis l\'ouverture',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Cacher',
            'Show': 'Spectacle',
            'Calculator': 'Calculatrice',
            'Price': 'Prix',
            'Buy': 'Acheter',
            'Sell': 'Vendre',
            'High': 'élevé',
            'Low': 'Low',
            'Last': 'Durer',
            'Change': 'Changement',
            'Improve': 'Améliorer',
            'Trades': 'Métiers',
            'Help Us to Improve': 'Aidez-nous à améliorer',
            'WorkingOn': 'Nous travaillons rapidement pour vous offrir le meilleur outil de trading jamais créé pour huobi global. Notre objectif est de vous fournir un outil unifié via des applications Web et mobiles qui détecte rapidement les cryptos de la pompe et du vidage.',
            'Make a donation': 'S\'il vous plaît nous donner vos suggestions sur comment pouvons-nous améliorer l\'extension du navigateur et l\'application mobile dans notre <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Vous pouvez aussi faire un don.'
        },
        'de': {
            'Time Interval': 'Tijdsinterval',
            'Price Change': 'Prijs verandering',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Verversen',
            'Currency': 'Valuta',
            'Last Price': 'Laatste prijs',
            'Volume': 'Volume',
            'Volume Change': 'Volumewijziging',
            'Since Opened': 'Sinds geopend',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Verbergen',
            'Show': 'Laten zien',
            'Calculator': 'Rekenmachine',
            'Price': 'Prijs',
            'Buy': 'Kopen',
            'Sell': 'Verkopen',
            'High': 'Hoog',
            'Low': 'Laag',
            'Last': 'Laatste',
            'Change': 'Verandering',
            'Improve': 'Verbeteren',
            'Trades': 'Trades',
            'Help Us to Improve': 'Help ons om te verbeteren',
            'WorkingOn': 'We werken er hard aan om u de beste trading tool te geven die ooit voor huobi global is gemaakt. Ons doel is om u een uniform hulpmiddel te bieden via web- en mobiele apps die de pomp en de cryptos van de dump vroegtijdig detecteren',
            'Make a donation': 'Geef ons uw suggesties over hoe we de browserextensie en de mobiele app in onze kunnen verbeteren <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. U kunt ook een gift doen.'
        },
        'kr': {
            'Time Interval': '시간 간격',
            'Price Change': '가격 변동',
            'Min': '최저한의',
            'Max': '최고',
            'Refresh': '새롭게 하다',
            'Currency': '통화',
            'Last Price': '마지막 가격',
            'Volume': '음량',
            'Volume Change': '볼륨 변경',
            'Since Opened': '이후 개설 됨',
            'Acum': '누적 된',
            'AVG': '평균',
            'Hide': '숨는 장소',
            'Show': '보여 주다',
            'Calculator': '계산자',
            'Price': '가격',
            'Buy': '사다',
            'Sell': '팔다',
            'High': '높은',
            'Low': '낮은',
            'Last': '마지막',
            'Change': '변화',
            'Improve': '돌리다',
            'Trades': '거래',
            'Help Us to Improve': '개선 할 수 있도록 도와주세요.',
            'WorkingOn': '우리는 huobi 글로벌을 위해 만들어진 최고의 거래 도구를 제공하기 위해 빠르게 작업하고 있습니다. 우리의 목표 초기에 펌프 및 덤프의 암호를 감지하는 웹 및 모바일 앱을 통해 통합 도구를 제공하는 것입니다.',
            'Make a donation': '제안 해주세요.에있는 브라우저 확장 프로그램과 모바일 앱을 어떻게 개선 할 수 있을까요 그만큼 <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. 기부도 할 수 있습니다.'
        },
        'ru': {
            'Time Interval': 'интервал времени',
            'Price Change': 'Изменение цены',
            'Min': 'минимальный',
            'Max': 'максимальная',
            'Refresh': 'обновление',
            'Currency': 'валюта',
            'Last Price': 'Последняя цена',
            'Volume': 'объем',
            'Volume Change': 'Изменение громкости',
            'Since Opened': 'С момента открытия',
            'Acum': 'накопленный',
            'AVG': 'средний',
            'Hide': 'Спрятать',
            'Show': 'Шоу',
            'Calculator': 'Калькулятор',
            'Price': 'цена',
            'Buy': 'купить',
            'Sell': 'продавать',
            'High': 'высоко',
            'Low': 'Низкий',
            'Last': 'Прошлой',
            'Change': '+ Изменить',
            'Improve': 'улучшать',
            'Trades': 'Торги',
            'Help Us to Improve': 'Помогите нам улучшить',
            'WorkingOn': 'Мы работаем быстро, чтобы предоставить вам лучший торговый инструмент, когда-либо созданный для huobi global. Наша цель - предоставить вам унифицированный инструмент с помощью веб-приложений и мобильных приложений, которые на ранних этапах обнаруживают криптографическую информацию о насосах и дампах.',
            'Make a donation': 'Пожалуйста, дайте нам свои предложения о том, как мы можем улучшить расширение браузера и мобильное приложение в нашем <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. Вы можете сделать пожертвование тоже.'
        },
        'es': {
            'Time Interval': 'Intervalo de Tiempo',
            'Price Change': 'Cambio del Precio',
            'Min': 'Min',
            'Max': 'Max',
            'Refresh': 'Refrescar',
            'Currency': 'Moneda',
            'Last Price': 'Ultimo Precio',
            'Volume': 'Volumen',
            'Volume Change': 'Cambio del Volumen',
            'Since Opened': 'Desde Abriste',
            'Acum': 'Acum',
            'AVG': 'AVG',
            'Hide': 'Ocultar',
            'Show': 'Mostrar',
            'Calculator': 'Calculator',
            'Price': 'Precio',
            'Buy': 'Comprar',
            'Sell': 'Vender',
            'High': 'Alto',
            'Low': 'Bajo',
            'Last': 'Ultimo',
            'Change': 'Cambio',
            'Improve': 'Mejorar',
            'Trades': 'Transacciones',
            'Help Us to Improve': 'Ay&uacute;danos a Mejorar',
            'WorkingOn': 'Estamos trabajando rápido para ofrecerle la mejor herramienta comercial jamás creada para huobi global. Nuestro objetivo es ofrecerle una herramienta unificada a través de aplicaciones web y móviles que detectan a tiempo las subidas y bajadas de las cryptos.',
            'Make a donation': 'Por favor, danos tus sugerencias sobre cómo podemos mejorar la extensión del navegador y la aplicación móvil en nuestros <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. También puedes hacer una donación.'
        },
        'cn': {
            'Time Interval': '時間間隔',
            'Price Change': '價格變動',
            'Min': '最低限度',
            'Max': '最大值',
            'Refresh': 'Refresh',
            'Currency': '貨幣',
            'Last Price': '最後價格',
            'Volume': '量',
            'Volume Change': '成交量變化',
            'Since Opened': '自開業以來',
            'Acum': '積累',
            'AVG': '平均',
            'Hide': '隱藏',
            'Show': '節目',
            'Calculator': '計算器',
            'Price': '價錢',
            'Buy': '購買',
            'Sell': '賣',
            'High': '最高价',
            'Low': '最低价',
            'Last': '持續',
            'Change': '涨幅',
            'Improve': '提高',
            'Trades': '交易',
            'Help Us to Improve': '帮助我们改进',
            'WorkingOn': '我们正在努力为您提供有史以来为huobi global制作的最佳交易工具. 我们的目标是通过早期检测到的网络和移动应用为您提供统一的工具 the pump and dump\'s cryptos',
            'Make a donation': '请告诉我们您如何在我们的 <a href="https://github.com/yosietserga" target="_blank">Github Repos</a>. 中改进浏览器扩展和移动应用程序的建议. 你也可以捐款'
        }
    }
};

const exchange = getExchangeName();
const url = getUrl();
let __langs, defaultLang, __hl;

if (exchange == 'hbg') {
      __langs = ['en-us', 'th-th', 'tr-tr', 'vi-vi', 'pt-br', 'pt-pt', 'fr-fr', 'de-de', 'ko-kr', 'ru-ru', 'es-es', 'zh-cn'];
      defaultLang = 'zh-cn';
	__hl = isset(localStorage.lang) && !empty(localStorage.lang) && __langs.indexOf( localStorage.lang ) != -1 ? localStorage.lang : null;
} else if (exchange == 'binance') {
      __langs = ['en','tr','vn','pt','fr','de','kr','ru','es','cn'];
      defaultLang = 'en';
	__hl = isset(localStorage.lang) && !empty(localStorage.lang) && __langs.indexOf( localStorage.lang ) != -1 ? localStorage.lang : null;
} else if (exchange == 'zb') {
      __langs = ['en','cn'];
      defaultLang = 'en';
	__hl = isset(GLOBAL.LAN) && !empty(GLOBAL.LAN) && __langs.indexOf( GLOBAL.LAN ) != -1 ? GLOBAL.LAN : null;
}

const hl = __hl ? __hl : defaultLang;
const lang = languages[ exchange ][ hl ];
/** /lang.js **/

/** functions **/
function bindEventsRichMaker() {
    let exchange = getExchangeName();
    if (exchange === 'hbg') {
		window.addEventListener("hashchange", function(e) {
		    refresh();
		    runRichMaker();
		}, false);
    } else if (exchange === 'binance') {
        let tabs = document.querySelectorAll('.sc-19iu9g1-1');
		for(let k in tabs) {
			if (typeof tabs[k] === 'object') {
				tabs[k].onclick = function(e){
				    refresh();
				    runRichMaker();
				};
			}
		}
    } else if (exchange === 'zb') {
        let tabs = document.querySelectorAll('#marketData .tab');
		for(let k in tabs) {
			if (typeof tabs[k] === 'object') {
				tabs[k].onclick = function(e){
				    refresh();
				    runRichMaker();
				};
			}
		}
    }
}

function getWithdrawalUrl() {
    let exchange = getExchangeName();
    if (exchange === 'hbg') {
        return 'https://www.hbg.com/' + hl + '/finance';
    } else if (exchange === 'binance') {
        return 'https://www.binance.com/userCenter/withdrawal.html';
    } else if (exchange === 'zb') {
        return 'https://web.zb.com/asset/payout/BTC';//TODO: get withdrawal url
    }
}

function validateWithdrawalUrl() {
    let exchange = getExchangeName();
    let url = getUrl();
    if (exchange === 'hbg') {
        return url.find('/finance');
    } else if (exchange === 'binance') {
        return url.find('userCenter/withdrawal');
    } else if (exchange === 'zb') {
        return url.find('/asset/payout');//TODO: get withdrawal url
    } else {
        return false;
    }
}

function getStyleRGBA() {
    let exchange = getExchangeName();
    if (exchange === 'hbg') {
        return 'rgba(30, 41, 67, 0.93)';
    } else if (exchange === 'binance') {
        return 'rgba(34, 34, 34, 0.93)';
    } else {
        return 'rgba(0, 0, 0, 0.93)';
    }
}

function getStyleTop() {
    let exchange = getExchangeName();
    if (exchange === 'hbg') {
        return '50px';
    } else if (exchange === 'binance') {
        return '50px';
    } else if (exchange === 'zb') {
        return '50px';
    } else {
        return 0;
    }
}

function getStyleLeft() {
    let exchange = getExchangeName();
    if (exchange === 'hbg') {
        return '10px';
    } else if (exchange === 'binance') {
        return '10px';
    } else if (exchange === 'zb') {
        return '10px';
    } else {
        return 0;
    }
}

// Dashboard Panel functions
function validateDashboardUrl() {
    let exchange = getExchangeName();
    let url = getUrl();
    if (exchange === 'hbg') {
        return url.find('/markets') && (url.find('#btc') || url.find('#eth') || url.find('#usdt'));
    } else if (exchange === 'binance') {
        return (
            url === 'https://www.binance.com' ||
            url === 'https://www.binance.com/' ||
            url === 'https://www.binance.com/' + hl
        );
    } else if (exchange === 'zb') {
        return (
            url === 'https://web.zb.com/globalmarket' ||
            url === 'https://www.zb.com/globalmarket'
        );
    } else {
        return false;
    }
}

function getBase() {
    let exchange = getExchangeName();
    let url = getUrl();
    if (exchange === 'hbg') {
        return url.find('#eth') ? 'eth' : url.find('#usdt') ? 'usdt' : 'btc';
    } else if (exchange === 'binance') {
        let tabActive = document.querySelector('.eUtyaR');
        return tabActive.innerText.replace(' Markets', '').toLowerCase();
    } else if (exchange === 'zb') {
        let tabActive = document.querySelector('#marketData .tab.active');
        return tabActive.innerText.replace(' Markets', '').toLowerCase();
    } else {
        return false;
    }
}

function getRows(b) {
    let exchange = getExchangeName();

    if (!validateDashboardUrl()) return false;

    if (exchange === 'hbg') {
        return document.querySelectorAll('#symbol_list dd');
    } else if (exchange === 'binance') {
        return document.querySelectorAll('.ReactVirtualized__Table__row');
    } else if (exchange === 'zb') {
        return document.querySelectorAll('#marketData .data-table .tbody .tr');
    } else {
        return false;
    }
}

function getTradeUrl(code) {
    let exchange = getExchangeName();

    if (!validateDashboardUrl()) return false;

    if (exchange === 'hbg') {
        let base = getBase();
        return 'https://www.hbg.com/' + hl + '/exchange/?s=' + code.replace(base, '_' + base);
    } else if (exchange === 'binance') {
        return 'https://www.binance.com/' + hl + '/trade/pro/' + code.replace('/', '_');
    } else if (exchange === 'zb') {
    	let url = getUrl();
        return url.find('https://web') ? 'https://web.zb.com/trade/kline/' + code.replace('/', '_') : 'https://trans.zb.com/markets/zbbtc' + code.replace('/', '');
    } else {
        return false;
    }
}

function renderTradeLink(row, code) {
    let exchange = getExchangeName();

    if (!validateDashboardUrl()) return false;

    if (exchange === 'hbg') {
        if (!document.querySelector('#exchangeTo' + code)) {
            let link = document.createElement('a');
            link.id = 'exchangeTo' + code;
            link.setAttribute('href', getTradeUrl(code));
            link.setAttribute('target', '_blank');
            link.innerText = 'Trade';
            row.children[1].appendChild(link);
        }
    } else if (exchange === 'binance') {
        let parent = row.parentNode.querySelector('a');
        parent.setAttribute('href', getTradeUrl(code));
        parent.setAttribute('target', '_blank');
    } else if (exchange === 'zb') {
    	//nothing to do 
    } else {
        return false;
    }
}

function getRowData(r) {
    let code, priceBTC, priceUSD, percent, volume;

    let exchange = getExchangeName();

    if (!validateDashboardUrl()) return false;

    if (exchange === 'hbg') {
        let base = getBase();
        code = isset(r) ? r.getAttribute('data-symbol') : '';
        priceBTC = isset(r.children[2].children[0]) ? r.children[2].children[0].innerText : '';
        priceUSD = isset(r.children[2].children[1]) ? r.children[2].children[1].innerText.replace(/[^0-9.]/ig, '').trim() : '';
        percent = isset(r.children[3].children[0]) ? r.children[3].children[0].innerText.replace(/[^0-9.]/ig, '').trim() : '';
        volume = (base === 'usdt') ? parseFloat(r.children[6].innerText.replace(',', '')) : parseFloat(r.children[6].innerText.replace(',', '')) * parseFloat(priceBTC);
    } else if (exchange === 'binance') {
        code = isset(r.children[1]) ? r.children[1].getAttribute('title') : '';
        priceBTC = isset(r.children[3].children[0].children[0]) ? r.children[3].children[0].children[0].innerText : '';
        priceUSD = isset(r.children[3].children[0].children[1]) ? r.children[3].children[0].children[1].innerText.replace('/ $', '') : '';
        percent = isset(r.children[4].children[0]) ? r.children[4].children[0].innerText.replace('%', '') : '';
        volume = isset(r.children[7]) ? r.children[7].innerText : '';
    } else if (exchange === 'zb') {
        code = isset(r.children[1]) ? r.children[0].children[0].children[1].innerText + r.children[0].children[0].children[2].innerText.replace(' / ', '/') : '';
        priceBTC = isset(r.children[2].children[0]) ? r.children[2].children[0].innerText : '';
        priceUSD = '';
        percent = isset(r.children[3].children[0]) ? r.children[3].children[0].innerText.replace('%', '') : '';
        volume = isset(r.children[6].children[0]) ? parseFloat(r.children[6].children[0].innerText.replace(/A-Za-z/ig, '')) * parseFloat(priceBTC) : '';
    }

    return {
        code,
        priceBTC,
        priceUSD,
        percent,
        volume
    };
}

// Exchange or Trade Panel functions
function validateTradeUrl() {
    let exchange = getExchangeName();
    let url = getUrl();
    if (exchange === 'hbg') {
        return url.find('/exchange');
    } else if (exchange === 'binance') {
        return url.find('/trade/pro');
    } else if (exchange === 'zb') {
        return url.find('/trade/kline') || url.find('/markets');
    } else {
        return false;
    }
}

function getExPrice() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg') {
        return document.querySelector('.price-container .price').innerText.trim();
    } else if (exchange === 'binance') {
        let el = document.querySelectorAll('.ibuANF');
        return isset(el[0].children[0].children[1].children[0]) ? el[0].children[0].children[1].children[0].innerText : false;
    } else if (exchange === 'zb') {
        return document.querySelector('.coin-price').innerText.trim();
    } else {
        return false;
    }
}

function getExPercent() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg') {
        return document.querySelector('.change').innerText.replace(/[^0-9.]/ig, '').trim();
    } else if (exchange === 'binance') {
        let el = document.querySelectorAll('.ibuANF');
        return el[0].children[1].children[1].children[1].innerText.replace(/[\+\-%]/g, '').trim();
    } else if (exchange === 'zb') {
        let p = document.querySelector('.coin-price-item').children[0].children[1].innerText;
        return p.replace(/[\+\-%]/g, '').trim();
    } else {
        return false;
    }
}

function getExVolume() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg') {
        return document.querySelector('.ticker > .amount > dd').innerText.replace(/[^0-9.]/ig, '').trim();
    } else if (exchange === 'binance') {
        let el = document.querySelectorAll('.ibuANF');
        return el[0].children[4].children[1].innerText.replace(/[A-Z,]/g, '').trim();
    } else if (exchange === 'zb') {
        let v = document.querySelector('.coin-price-item').children[3].children[1].innerText;
        return v.find('K') ? v.replace('K','') * 1000 : v.replace('K','');
    } else {
        return false;
    }
}

function getExVolumeQuoted() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg' || exchange === 'zb') {
        let base = getExBase();
        let vol = getExVolume();
        let price = getExPrice();
        return base === 'USDT' ? parseFloat(vol) : (parseFloat(vol) * parseFloat(price)).toFixed(8);
    } else if (exchange === 'binance') {
        return getExVolume();
    } else {
        return false;
    }
}

function getExTrades() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;
    
    let minVol = getMinBuyVolume();
    let allP = [];
    let allV = [];
    let allT = [];
    let lastTrade = {
        price: 0,
        volume: 0,
        time: 0
    };

    const getAvgTrades = () => {
	
        let sumP = 0;
        for (let i in allP) {
            if (typeof allP[i] != 'undefined' && !isNaN(allP[i]))
                sumP = sumP * 1 + parseFloat(allP[i]) * 1;
        }

        let sumV = 0;
        for (let i in allV) {
            if (typeof allV[i] != 'undefined' && !isNaN(allV[i]))
                sumV = sumV * 1 + parseFloat(allV[i]) * 1;
        }

        let avgT = 0;
        if (Array.isArray(allT) && allT.length > 0) {
            avgT = getAVGInterval(allT);
        }

        let avgTrades = {
            price: (sumP / allP.length).toFixed(10),
            volume: (sumV / allV.length).toFixed(10),
            time: avgT
        };
        
        return avgTrades;
    };
    
    if (exchange === 'hbg') {
        let trades = document.querySelectorAll('.market-trades .mod-body p');
        
        for (let i in trades) {
            let t = trades[i];
            if (typeof t === 'object') {
            	if (i==0) {
		            lastTrade = {
		                price: t.children[0].innerText,
		                volume: (t.children[1].innerText * t.children[0].innerText).toFixed(10),
		                time: t.children[2].innerText
		            };
            	}
                let p = t.children[0].innerText;
                let v = (t.children[1].innerText * t.children[0].innerText).toFixed(10);
                let T = t.children[2].innerText;

                if (v > minVol) {
                    allP.push(parseFloat(p));
                    allV.push(parseFloat(v));
                    allT.push(T);
                }
            }
        }
        
        return {
            trades,
            lastTrade,
            avgTrades:getAvgTrades( trades )
        };
    } else if (exchange === 'binance') {
        let trades = document.querySelectorAll('.cbahSo .ReactVirtualized__Table__row');
        
        for (let i in trades) {
            let t = trades[i];
            if (typeof t === 'object') {
            	if (i==0) {
		            lastTrade = {
		                price: t.children[0].innerText,
		                volume: (t.children[1].innerText * t.children[0].innerText).toFixed(10),
		                time: t.children[2].innerText
		            };
            	}
                let p = t.children[0].innerText;
                let v = (t.children[1].innerText * t.children[0].innerText).toFixed(10);
                let T = t.children[2].innerText;

                if (v > minVol) {
                    allP.push(parseFloat(p));
                    allV.push(parseFloat(v));
                    allT.push(T);
                }
            }
        }

        return {
            trades,
            lastTrade,
            avgTrades:getAvgTrades( trades )
        };
    } else if (exchange === 'zb') {
    	let trades = document.querySelector('.trades');
    	if (trades) {
	        Object.entries(document.querySelector('.trades').children).forEach((v,i) => {
	            let t = v[1];
	            
	            if (typeof t === 'object' && !isNaN(i)) {
	            	if (i==0) {
			            lastTrade = {
			                price: t.children[1].innerText,
			                volume: (t.children[2].innerText * t.children[1].innerText).toFixed(10),
			                time: t.children[0].innerText
			            };
	            	}
	                let p = t.children[1].innerText;
	                let v = (t.children[2].innerText * t.children[1].innerText).toFixed(10);
	                let T = t.children[0].innerText;
	
	                if (v > minVol) {
	                    allP.push(parseFloat(p));
	                    allV.push(parseFloat(v));
	                    allT.push(T);
	                }
	            }
	        });
    	}
        return {
            trades,
            lastTrade,
            avgTrades:getAvgTrades( trades )
        };
    } else {
        return false;
    }
}

function getExSymbol() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg') {
        return document.querySelector('.symbol-name').innerText.trim();
    } else if (exchange === 'binance') {
        let _currencyCode = document.querySelectorAll('[property="og:title"]');
        let currencyStr = _currencyCode[0].getAttribute('content').split('|');
        return currencyStr[0].trim();
    } else if (exchange === 'zb') {
        let currencyStr = document.querySelector('.market-name').innerText.replace('/ ', '/')
;
        return currencyStr.trim();
    } else {
        return false;
    }
}

function getMinBuyVolume() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg' || exchange === 'binance' || exchange === 'zb') {
        let base = getExBase();
        return base === 'BTC' ? 0.001 : (base === 'ETH') ? 0.03 : 10;
    } else {
        return false;
    }
}

function getExBase() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg' || exchange === 'binance' || exchange === 'zb') {
        let code = getExSymbol();
        let ___symbols = code.split('/');
        let base = '';
        if (Array.isArray(___symbols)) return ___symbols[1];
        return false;
    } else {
        return false;
    }
}

function checkExLoaded() {
    let exchange = getExchangeName();

    if (!validateTradeUrl()) return false;

    if (exchange === 'hbg') {
        return getExPrice() && '---/---' !== getExSymbol();
    } else if (exchange === 'binance') {
        return getExPrice();
    } else if (exchange === 'zb') {
        return getExPrice();
    } else {
        return false;
    }
}
/** /functions **/













/*######################################################*/
const ___version = '1.0.0';
let settings = {};
let pLast = {};
let __cData = {};
let t = '',
    lastCode = '';
let obj, x, y, prev_x, prev_y;
var sorting = sorting || '';
let lastSort, order = false;
let audio = new Audio('https://soundbible.com/grab.php?id=2218&type=mp3');

/** helpers.js  **/
/** /helpers.js  **/

function buymeabeer() {
    let url = getUrl();
    if (validateWithdrawalUrl()) {

        myWrapper();

        const styleH1 = 'padding-left:10px;font-size:2rem;font-weight:bold;width:700px;';
        const stylep = 'padding-left:10px;font-size:1rem;font-weight:normal;width:400px;';
        const styleHidden = 'opacity:0.1;height:1px;width:1px;border:none;position:absolute;';
        const styleButton = 'float:left;color:#fff;margin:auto 10px;padding:2px 3px;background:rgba(66, 244, 146,1);border:none;border-radius:3px;cursor:pointer;';
        const styleHideButton = 'background:#ffd170;padding:2px;margin:1px;border:none;position:absolute;right:10px;top:10px;';

        appendToMyWrapper(
            '<div style="position:relative;">' +
            '<h1 style="' + styleH1 + '">' + lang['Help Us to Improve'] + '</h1>' +
            '<button id="hideShowButton" style="' + styleHideButton + '">' + lang['Hide'] + ' / ' + lang['Show'] + '</button>' +
            '</div>'
        );
        appendToMyWrapper('<p style="' + stylep + '">' + lang['WorkingOn'] + '</p>');
        appendToMyWrapper('<p style="' + stylep + '">' + lang['Make a donation'] + '</p><br /><hr /><br />');

        const addAddress = (symbol, address, tag = null) => {
            appendToMyWrapper(
                '<div style="display:block;width:700px;height:30px;">' +
                '<h2 style="float:left;font-weight:bold;width:50px;padding:5px 10px;">' + symbol + '</h2>' +
                '<p style="float:left;width:350px;padding:5px 10px;">' + address + '</p>' +
                '<input style="' + styleHidden + '" type="text" value="' + address + '" id="donate' + symbol + 'Address" />' +
                '<input style="' + styleButton + '" type="button" value="copy" id="copyDonate' + symbol + 'Address" />' +
                (tag ?
                    '<p style="float:left;width:100px;padding:5px 10px;">' + tag + '</p>' +
                    '<input style="' + styleHidden + '" type="text" value="' + tag + '" id="donate' + symbol + 'Tag" />' +
                    '<input style="' + styleButton + '" type="button" value="copy tag" id="copyDonate' + symbol + 'Tag" />' : '') +
                '</div>'
            );

            let buttonCopyAddress = document.querySelector('#copyDonate' + symbol + 'Address');

            buttonCopyAddress.onclick = function(e) {
                let walletAddress = document.querySelector('#donate' + symbol + 'Address');
                walletAddress.select();
                document.execCommand("copy");
                alert("Copied " + symbol + " Address");
            }

            if (tag) {
                let buttonCopyTag = document.querySelector('#copyDonate' + symbol + 'Tag');

                buttonCopyTag.onclick = function(e) {
                    let walletTag = document.querySelector('#donate' + symbol + 'Tag');
                    walletTag.select();
                    document.execCommand("copy");
                    alert("Copied " + symbol + " Tag");
                }
            }
        }

        addAddress('BTC', '1FgpJpTHDuBgSe1CrTQE6HYR1xSJDn6ZsM');
        addAddress('DASH', 'XsLzYmqeDmW135a8kXU5ALS4M3B3gREyJ6');
        addAddress('ETH', '0x0A34857AC57976846D62F58E68bfB2B5eb9e6732');
        addAddress('LTC', 'LdQB3fPacYpZBGGg7QDsaqiY31E5g5RQyn');
        addAddress('BCH', '1AaZbaKhcFvpzks3UKjyECnUzNLf4NS5hu');
        addAddress('BTG', 'GJ8vC45q7CqgtsV9pkdAwbXhpFYx5A2SRt');
        addAddress('XRP', 'rKfzfrk1RsUxWmHimWyNwk8AoWHoFneu4m', '1970342557');

        document.getElementById("hideShowButton").onclick = slideToggle;
    }
}
buymeabeer();

runRichMaker();
bindEventsRichMaker();

function initDashboardBTCTpl(s) {
    myWrapper();
    appendToMyWrapper(
        '<p class="monitorLoaded">' + lang['Time Interval'] + ': ' + s.interval + ' seconds</p>' +
        '<p>' + lang['Price Change'] + ' ' + lang['Min'] + ': ' + s.percentProfit + '%</p>' +
        '<a href="' + getWithdrawalUrl() + '" target="_blank" style="font-size:12px;color:#fff;background:rgba(66, 244, 146,1);padding:5px;margin:10px;border:none;cursor:pointer;position:absolute;right:100px;text-transform:uppercase;line-height:16px;">' + lang['Improve'] + '</a>' +
        '<button id="refreshButton" style="font-size:12px;color:#fff;background:#ffd170;padding:5px;margin:10px;border:none;cursor:pointer;position:absolute;right:10px;text-transform:uppercase;line-height:16px;">' + lang['Refresh'] + '</button>' +
        '<div style="clear:both;float:none;width:100%;height:1px;display:block;border:solid 1px #000;"></div>'
    );

    appendToMyWrapper(
        '<div style="float:left;width:50px;">&nbsp;</div>' +

        '<div style="font-size:12px;float:left;width:100px;text-align:center;">' + lang['Currency'] + '</div>' +

        '<div data-sorting="change" style="font-size:12px;cursor:pointer;float:left;width:80px;text-align:center;">' + lang['Price Change'] + ' %</div>' +

        '<div style="font-size:12px;float:left;width:160px;text-align:center;">' + lang['Last Price'] + '</div>' +

        '<div data-sorting="volume" style="font-size:12px;cursor:pointer;float:left;width:100px;text-align:center;">' + lang['Volume'] + '</div>' +

        '<div data-sorting="volumeDiff" style="font-size:12px;cursor:pointer;float:left;width:100px;text-align:center;">' + lang['Volume Change'] + ' ' + lang['Acum'] + ' %</div>' +

        '<div data-sorting="volumeDiffProgressiveAVG" style="font-size:12px;cursor:pointer;float:left;width:100px;text-align:center;">' + lang['Volume Change'] + ' ' + lang['AVG'] + ' %</div>' +

        '<div data-sorting="volumeDiffProgressive" style="font-size:12px;cursor:pointer;float:left;width:100px;text-align:center;">' + lang['Volume Change'] + ' %</div>' +

        '<div style="clear:both;float:none;width:100%;height:1px;display:block;border:solid 1px #000;"></div>'
    );
}

function bindDashboardBTCTpl() {
    document.querySelector('[data-sorting="change"]').onclick = () => {
        sortOrderTpl('change', true);
    };
    document.querySelector('[data-sorting="volume"]').onclick = () => {
        sortOrderTpl('volume', true);
    };
    document.querySelector('[data-sorting="volumeDiff"]').onclick = () => {
        sortOrderTpl('volumeDiff', true);
    };
    document.querySelector('[data-sorting="volumeDiffProgressive"]').onclick = () => {
        sortOrderTpl('volumeDiffProgressive', true);
    };
    document.getElementById("refreshButton").addEventListener("click", refresh);
}

function initConfig(settings) {
    Object.keys(settings).forEach(k => {
        set('config_' + k, settings[k]);
    });
}

function initDashboardBTC(s) {
    initConfig(s);
    initDashboardBTCTpl(s);
    bindDashboardBTCTpl(s);
}

function initTraderAssistantBTCTpl(s) {
    myWrapper();
    appendToMyWrapper('<div style="text-align:center;">' +
        '<a href="' + getWithdrawalUrl() + '" target="_blank" style="background:rgba(66, 244, 146,1);padding:2px;margin:1px;border:none;color:#fff;padding:5px;cursor:pointer;text-transform:uppercase;">' + lang['Improve'] + '</a>' +
        '<button id="hideShowButton" style="background:#ffd170;padding:6px;margin:1px;border:none;">' + lang['Hide'] + ' / ' + lang['Show'] + '</button>' +
        '</div>');

    appendToMyWrapper('<div style="color:[avgDumpColor];text-align:center;">' +
        '<hr />' + lang['Calculator'] + '<br />' +
        '<input style="border:solid 1px #000;background:#111;width:99%;display:block;" type="percent" name="percentProfit" placeholder="percent" step="0.1" value="' + s.percentProfit + '%" />'

        +
        '<input style="border:solid 1px #000;background:#111;width:99%;display:block;" type="number" name="priceBuyBTC" placeholder="' + lang['Buy'] + ' ' + lang['Price'] + '" step="0.00000001" />'

        +
        '<input style="border:solid 1px #000;background:#111;width:99%;display:block;" type="number" name="priceSellBTC"  placeholder="' + lang['Sell'] + ' ' + lang['Price'] + '" step="0.00000001" />'

        +
        '<hr />' +
        '</div>');
}

function bindTraderAssistantBTCTpl() {
    document.querySelector('input[name="percentProfit"]').onchange = __calculatorBTC;
    document.querySelector('input[name="priceBuyBTC"]').onchange = __calculatorBTC;
    document.querySelector('input[name="priceSellBTC"]').onchange = __calculatorBTC;
    document.getElementById("hideShowButton").onclick = slideToggle;
}

function initTraderAssistantBTC(s) {
    initConfig(s);
    initTraderAssistantBTCTpl(s);
    bindTraderAssistantBTCTpl(s);
}

function runRichMaker(e) {
    let url = getUrl();
    if (validateDashboardUrl()) {
        let base = getBase();
        settings = {
            interval: 1,
            percentProfit: 5,
            occurrences: 10,
            progreesive: false,
            dumpColor: 'rgba(244, 65, 65, 1)',
            pumpColor: 'rgba(66, 244, 146,1)'
        };
        set('config_max_tabs_opened', 5);
        if (!document.querySelector('.monitorLoaded')) {
            initDashboardBTC(settings);
        }
        walkCurrencies(base);
        makeMeRichBTC(base);
        setInterval(() => {
            makeMeRichBTC(base);
        }, 1000 * settings.interval);
    } else if (validateTradeUrl()) {
        settings = {
            interval: 1,
            percentProfit: 4,
            quantity: 0.001,
            progreesive: false,
            buy_button: false,
            sell_button: false,
            dumpColor: 'rgba(239, 0, 0, 1)',
            pumpColor: 'rgba(65, 244, 181, 1)',
        };

        initTraderAssistantBTC(settings);
        tradingAssistantBTC();
        setInterval(tradingAssistantBTC, 1000 * settings.interval);
    }
}

function tradingAssistantBTC() {
    let priceBTC = getExPrice();
    let code = getExSymbol();

    if (checkExLoaded()) {
        let base = getExBase();
        let percent = getExPercent();
        let vol = getExVolume();
        let volumeBTC = getExVolumeQuoted();
        const { trades, lastTrade, avgTrades } = getExTrades();

        addChange({
            id: generateId(),
            code: code,
            priceBuyBTC: (priceBTC * 1).toFixed(10),
            priceSellBTC: (priceBTC * 1 * (settings.percentProfit / 100 + 1)).toFixed(8),
            percentChange: percent * 1,
            percentDiff: 0,
            volumeBTC: volumeBTC,

            //trades: trades,//TODO: use less memory and cpu load
            lastTrade: lastTrade,
            avgTrades: avgTrades,
            
            percentProfit: settings.percentProfit,
            priceSellBTC: (priceBTC * (settings.percentProfit / 100 + 1)).toFixed(8)
        });

        if (Object.keys(pLast).length === 0) {
            pLast[code] = pLast[code] || {};
            pLast[code].percentChange = percent;
            pLast[code].priceBTC = parseFloat(priceBTC);
        } else {
            if (!pLast[code].percentChange) pLast[code].percentChange = percent;
            if (!pLast[code].priceBTC) pLast[code].priceBTC = parseFloat(priceBTC);
            if (!pLast[code].volumeBTC) pLast[code].volumeBTC = parseFloat(volumeBTC);
            if (!pLast[code].volume) pLast[code].volume = parseFloat(vol);

            var diff = percent - pLast[code].percentChange;

            pLast[code].highPrice = pLast[code].highPrice || lastTrade.price;
            pLast[code].lowPrice = pLast[code].lowPrice || lastTrade.price;

            pLast[code].highVol = pLast[code].highVol || lastTrade.volume;
            pLast[code].lowVol = pLast[code].lowVol || lastTrade.volume;

            if (lastTrade.price > pLast[code].highPrice) {
                pLast[code].highPrice = lastTrade.price;
                pLast[code].highVol = lastTrade.volume;
            } else {
                pLast[code].highPrice = pLast[code].highPrice;
                pLast[code].highVol = lastTrade.volume;
            }

            if (lastTrade.price < pLast[code].lowPrice) {
                pLast[code].lowPrice = lastTrade.price;
                pLast[code].lowVol = lastTrade.volume;
            } else {
                pLast[code].lowPrice = pLast[code].lowPrice;
                pLast[code].lowVol = pLast[code].lowVol;
            }
            
            let volPercentChange = ((vol - pLast[code].volume) * 100 / pLast[code].volume).toFixed(2);
            let volChange = (parseFloat(vol - pLast[code].volume) * parseFloat(priceBTC)).toFixed(8);

            tradingAssistantBTCTpl({
                domId: '__' + code + '__',
                code: code,
                base: base,
                volumeBTC: volumeBTC,
                highPrice: pLast[code].highPrice,
                highVol: pLast[code].highVol,
                lowPrice: pLast[code].lowPrice,
                lowVol: pLast[code].lowVol,
                priceBTC: pLast[code].priceBTC,
                priceBuyBTC: (priceBTC * 1).toFixed(10),
                priceSellBTC: (priceBTC * 1 * (settings.percentProfit / 100 + 1)).toFixed(10),
                percentDiff: diff,
                volPercentDiff: volPercentChange,
                volDiff: volChange,
                lastTrade: lastTrade,
                avgTrades: avgTrades,
                avg: getAVGChanges(code)
            });

            if (settings.buy_button) updateBuy((priceBTC * 1).toFixed(8), settings.quantity);
            if (settings.sell_button) updateSell((priceBTC * 1 * (settings.percentProfit / 100 + 1)).toFixed(8), settings.quantity);

        }
    }
}

function tradingAssistantBTCTpl(data) {
    var pumping = document.getElementById(data.domId);
    var codeId = '';

    let tm = '';
    if (data.avgTrades.time > 60) {
        let clock = (data.avgTrades.time / 60).toFixed(2).split('.');
        let h = clock[0];
        let m = (clock.length === 2) ? (60 / 100 * clock[1]).toFixed(0) > 10 ? (60 / 100 * clock[1]).toFixed(0) : '0' + (60 / 100 * clock[1]).toFixed(0) : '00';
        tm = h + ':' + m + 'm';
    } else {
        tm = data.avgTrades.time + 's';
    }
    var t =
        '<div id="assistantWrapper' + codeId + '">' +
        '<div style="text-align:center;">' +
        '<button id="refreshButton' + data.code + '" style="background:#ffd170;padding:5px;margin:5px;border:none;cursor:pointer;text-align:center;font-size:11px;text-transform:uppercase;">' + lang['Refresh'] + '</button>' +
        '</div>' +
        '<div style="text-align:center;">' +
        data.code +
        '</div>'

        +
        '<div style="text-align:center;font-size:16px;">' + lang['Price Change'] + '</div>'

        +
        '<div style="text-align:center;color:[dumpColor]">' +
        '&nbsp;&nbsp;&nbsp;<h1>&nbsp;' + data.percentDiff.toFixed(2) + '%</h1>&nbsp;&nbsp;&nbsp;' +
        '<small style="text-align:center;font-size:10px;">' + (data.priceBTC * 1).toFixed(10) + '</small>' +
        '</div>'

        +
        '<div style="font-size:12px;font-weight:bold;color:' + settings.dumpColor + ';text-align:center;">' +
        (data.priceBuyBTC * 1).toFixed(10) +
        '</div>'

        +
        '<div style="font-size:12px;font-weight:bold;color:' + settings.pumpColor + ';text-align:center;">' +
        (data.priceSellBTC * 1).toFixed(10) +
        '</div>'

        +
        '<br />'

        +
        '<div style="text-align:center;font-size:16px;">' + lang['Volume'] + ' ' + data.base + '</div>' +
        '<div style="text-align:center;font-size:14px;">24H ' + lang['Change'] + '</div>' +
        '<div style="text-align:center;color:[dumpColor]">' +
        '<small style="text-align:center;font-size:10px;">' + parseFloat(data.volumeBTC) + ' (%' + data.volPercentDiff + ')</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="text-align:center;font-size:14px;">' + lang['Since Opened'] + '</div>' +
        '<div style="text-align:center;color:[dumpColor]">' +
        '<small style="text-align:center;font-size:10px;">' + parseFloat(data.volDiff) + ' (%' + data.volPercentDiff + ')</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="color:#fff;text-align:center;">' +
        '<div style="text-align:center;font-size:16px;">' + lang['Trades'] + '</div>' +
        '<div style="text-align:center;font-size:14px;text-transform:uppercase;">' + lang['Last'] + '</div>'

        +
        '<small style="text-align:left;font-size:10px;">' +
        'P: ' +
        data.lastTrade.price +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'V: ' +
        data.lastTrade.volume +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'T: ' +
        data.lastTrade.time +
        '</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="color:#fff;text-align:center;">' +
        '<div style="text-align:center;font-size:14px;text-transform:uppercase;">' + lang['High'] + '</div>'

        +
        '<small style="text-align:left;font-size:10px;">' +
        'P: ' +
        data.highPrice +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'V: ' +
        data.highVol +
        '</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="color:#fff;text-align:center;">' +
        '<div style="text-align:center;font-size:14px;text-transform:uppercase;">' + lang['Low'] + '</div>'

        +
        '<small style="text-align:left;font-size:10px;">' +
        'P: ' +
        data.lowPrice +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'V: ' +
        data.lowVol +
        '</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="color:#fff;text-align:center;">' +
        '<div style="text-align:center;font-size:14px;">' + lang['AVG'] + ' > ' + (data.base === 'BTC' ? '0.001' : (data.base === 'ETH') ? '0.03' : '10') + ' ' + data.base + '</div>'

        +
        '<small style="text-align:left;font-size:10px;">' +
        'P: ' +
        data.avgTrades.price +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'V: ' +
        data.avgTrades.volume +
        '</small>' +
        '<br />' +
        '<small style="text-align:left;font-size:10px;">' +
        'T: ' +
        tm +
        '</small>' +
        '</div>';

    if (settings.buy_button) {
        t += '<div style="width:90%;display:block;" class="s1c2873k-0 hHVmux s62mpio-0 VtEjA" height="34">' +
            '<div class="s62mpio-0-sc-hwwEjo dYgBSK">' +
            '<button class="s1lt5gnu-1 jVhUbE" type="button" onClick="toBuy(' + (data.priceBuyBTC * 1).toFixed(8) + ')">' + lang['Buy'] + '</button>' +
            '</div>' +
            '</div>';
    }

    if (settings.sell_button) {
        t += '<div style="width:90%;display:block;" class="s1c2873k-0 hHVmux s62mpio-0 VtEjA" height="34">' +
            '<div class="s62mpio-0-sc-hwwEjo dYgBSK">' +
            '<button class="s1lt5gnu-1 eqSfye" type="button" onClick="toSell(' + (data.priceSellBTC).toFixed(8) + ')">' + lang['Sell'] + '</button>' +
            '</div>' +
            '</div>';
    }
    t += '</div>';

    if (data.percentDiff >= data.percentProfit) {
        t = t.replace('[dumpColor]', settings.pumpColor);
    } else if (data.percentDiff <= -data.percentProfit) {
        t = t.replace('[dumpColor]', settings.dumpColor);
    } else {
        t = t.replace('[dumpColor]', '#fff');
    }

    //removeFromMyWrapper(data.domId);
    appendToMyWrapper(t, data.domId);
    document.getElementById("refreshButton" + data.code).addEventListener('click', (e) => {
        refresh(data.code);
    });
}

function __calculatorBTC(e) {
    let that = e.target;

    let percent = document.querySelector('input[name="percentProfit"]');
    let priceBuy = document.querySelector('input[name="priceBuyBTC"]');
    let priceSell = document.querySelector('input[name="priceSellBTC"]');

    let priceBuyBTC = priceBuy.value;
    let priceSellBTC = priceSell.value;
    let percentValue = percent.value.replace('%', '');

    if (that == priceBuy) {
        if (percentValue.length > 0)
            priceSell.value = (priceBuyBTC * 1 * (percentValue / 100 + 1)).toFixed(10);
        else
            percent.value = ((priceSellBTC - priceBuyBTC) * 100 / priceSellBTC).toFixed(2) +'%';
    } else if (that == priceSell) {
        if (percentValue.length > 0)
            priceBuy.value = (priceSellBTC * 1 / (percentValue / 100 + 1)).toFixed(10);
        else
            percent.value = ((priceSellBTC - priceBuyBTC) * 100 / priceSellBTC).toFixed(2) +'%';
    } else if (that == percent) {
        if (priceBuyBTC.length > 0)
            priceSell.value = (priceBuyBTC * 1 * (percentValue / 100 + 1)).toFixed(10);
        else
            priceBuy.value = (priceSellBTC * 1 / (percentValue / 100 + 1)).toFixed(10);
    }
}

function refresh(c = null) {
    let rows = document.querySelectorAll('#myPumpWrapper li:nth-child(n+3)');
    rows.forEach((v, k) => {
        v.parentNode.removeChild(v);
    });

    t = '';
    lastCode = '';

    let base = getBase();

    if (!isset(c)) {
        pLast = {};
        __cData = {};
        sorting = '';
        lastSort = '';
        order = false;

        walkCurrencies(base);
    } else {
        pLast[c] = {};
        __cData[c] = {};
    }
}

async function makeMeRichBTC() {
    let base = getBase();

    walkCurrencies(base);
    var rows = getRows(base);

    rows.forEach(row => {
        const { code } = getRowData(row);

        let actual = getActualChange(code);
        let last = getLastChange(code);

        if (actual && last) {

            if (actual.volumeDiffProgressive > 0) {
                if (typeof __cData[code].occurrences == 'undefined') __cData[code].occurrences = 0;
                __cData[code].occurrences++;
                if (last.percentDiff >= actual.percentProfit && __cData[code].occurrences >= settings.occurrences) {
                    __cData[code].occurrences = 0;
                    openTab(code);
                }
            }

            if (last.percentDiff >= actual.percentProfit || last.percentDiff < actual.percentProfit) {
                makeMeRichTplBTC({
                    domRow: row,
                    base: base,
                    domId: '__' + code + '__',
                    code: actual.code,
                    linkToTrade: actual.linkToTrade,

                    priceBuyBTC: actual.priceBuyBTC,
                    priceBuyUSD: actual.priceBuyUSD,

                    priceSellBTC: actual.priceSellBTC,
                    priceSellUSD: actual.priceSellUSD,

                    avg: getAVGChanges(actual.code),
                    volumeBTC: actual.volumeBTC,
                    volumeDiff: actual.volumeDiff,
                    volumeDiffProgressive: actual.volumeDiffProgressive,
                    percentDiff: last.percentDiff,
                    percentProfit: actual.percentProfit,

                });
            }
        }
    });
    sortOrderTpl(sorting);
}

function makeMeRichTplBTC(data) {
    let pumping = document.getElementById(data.domId);
    let t = '<a style="float:left;width:50px;color: [dumpColor]" href="' + data.linkToTrade + '" target="_blank"> [TRADE] </a>'

        +
        '<div style="float:left;width:100px;">' +
        '&nbsp;&nbsp;[symbol]&nbsp;&nbsp;' +
        data.code.replace(data.base, '/' + data.base).toUpperCase() +
        '</div>'

        +
        '<div style="float:left;width:80px;[bold]" data-change="' + data.percentDiff.toFixed(2) + '">' +
        '&nbsp;&nbsp;&nbsp;' + data.percentDiff.toFixed(2) + '%&nbsp;&nbsp;&nbsp;' +
        '</div>'

        +
        ((data.base === 'usdt') ?
            '<div style="float:left;width:160px;text-align:center;">' +
            '$' + parseFloat(data.priceBuyBTC) +
            '</div>' :
            '<div style="float:left;width:160px;text-align:center;">' +
            data.priceBuyBTC +
            '&nbsp;&nbsp;' +
            '/ $' + data.priceBuyUSD +
            '</div>'
        )
        /*
        +'<div style="float:left;width:160px;text-align:center;">'
            + data.priceSellBTC
            + '&nbsp;&nbsp;'
            + '/ $'+ data.priceSellUSD
        +'</div>'
  
        +'<div style="float:left;width:100px;color:[avgDumpColor];text-align:center;" data-avg="'+ data.volumeBTC +'">'
            + data.avg.avgPercentDiff.toFixed(2)
            + '%'
        +'</div>'
  
        +'<div style="float:left;width:200px;text-align:center;">'
            + '<span style="color:'+ settings.dumpColor +'">'
            + data.avg.avgPriceBuyBTC.toFixed(8)
            + '</span>'
            
            + '&nbsp;&nbsp;/&nbsp;&nbsp;'
            
            + '<span style="color:'+ settings.pumpColor +'">'
            + data.avg.avgPriceSellBTC.toFixed(8)
            + '</span>'
        +'</div>'
        */
        +

        '<div style="float:left;width:100px;" data-volume="' + data.volumeBTC + '">' +
        ((data.base === 'usdt') ? data.volumeBTC : data.volumeBTC.toFixed(8))

        +
        '</div>'

        +
        '<div style="float:left;width:100px;text-align:center;color:[volumeDiffColor]" data-volumeDiff="' + data.volumeDiff + '">' +
        data.volumeDiff +
        '%' +
        '</div>'

        +
        '<div style="float:left;width:100px;text-align:center;color:[volumeDiffColor]" data-volumeDiffProgressiveAVG="' + data.avg.avgVolumeDiffProgressive + '">' +
        data.avg.avgVolumeDiffProgressive +
        '%' +
        '</div>'

        +
        '<div style="float:left;width:100px;text-align:center;color:[volumeDiffColor]" data-volumeDiffProgressive="' + data.volumeDiffProgressive + '">' +
        data.volumeDiffProgressive +
        '%' +
        '</div>'

        +
        '<div style="clear:both;float:none;width:100%;height:1px;display:block;border:solid 1px #555;"></div>';

    if (data.volumeDiff > 0) {
        t = t.replace('[volumeDiffColor]', settings.pumpColor);
    } else if (data.volumeDiff < 0) {
        t = t.replace('[volumeDiffColor]', settings.dumpColor);
    }

    if (data.avg.avgPercentDiff >= data.percentProfit) {
        t = t.replace('[avgDumpColor]', settings.pumpColor);
    } else if (data.avg.avgPercentDiff <= -data.percentProfit) {
        t = t.replace('[avgDumpColor]', settings.dumpColor);
    }

    if (data.percentDiff >= data.percentProfit) {
        t = t.replace('[symbol]', ' + ');
        if (data.percentDiff >= (data.percentProfit * 3)) {
            t = t.replace('[dumpColor]', 'yellow;font-weight:bold;');
        } else {
            t = t.replace('[dumpColor]', settings.pumpColor);
        }

        if (data.percentDiff >= (data.percentProfit * 2)) {
            t = t.replace('[bold]', 'fontWeight:bold;color:' + settings.pumpColor + ';');
        } else {
            t = t.replace('[bold]', '');
        }

        if (pumping) {
            pumping.innerHTML = t;
        } else {
            appendToMyWrapper(t, data.domId, {
                'class': '__currency__'
            });
        }

        data.domRow.style.backgroundColor = settings.pumpColor;
    } else if (data.percentDiff <= -settings.percentProfit) {
        t = t.replace('[dumpColor]', settings.dumpColor);
        t = t.replace('[symbol]', ' - ');
        if (data.percentDiff <= (-settings.percentProfit * 2)) {
            t = t.replace('[bold]', 'fontWeight:bold;color:' + settings.dumpColor + ';');
        } else {
            t = t.replace('[bold]', '');
        }

        if (pumping) {
            pumping.innerHTML = t;
        } else {
            appendToMyWrapper(t, data.domId, {
                'class': '__currency__'
            });
        }

        data.domRow.style.backgroundColor = settings.dumpColor;
    } else {
        data.domRow.style.backgroundColor = 'transparent';
        removeFromMyWrapper(data.domId);
    }
}

function openTab(code) {
    if (!get('tabs_opened')) set('tabs_opened', {});

    let url = getTradeUrl(code);
    let tabs_opened = get('tabs_opened');
    let config_max_tabs_opened = get('config_max_tabs_opened');
    
	const playAudio = async () => {
		audio = await new Audio('https://soundbible.com/grab.php?id=2218&type=mp3');
		await audio.play();
	};
	
    const o = url => {
        if (Object.keys(tabs_opened).length < config_max_tabs_opened) {
            set('tabs_opened', window.open(url, '_blank'), code);
            
            window.addEventListener("beforeunload", function(e) {
                del('tabs_opened', code);
            });
        }
    };

    if (typeof tabs_opened[code] == 'undefined' || tabs_opened[code].closed) {
        o(url);
    }
}

function sortOrderTpl(s, o) {
    if (typeof s == 'undefined' || !s) s = 'change';
    if (typeof o == 'undefined') o = false;
    sorting = s;

    if (lastSort == sorting && o) {
        order = !order;
    } else {
        lastSort = sorting;
    }

    var wrapper = document.getElementById('myPumpWrapper');

    [].slice.call(document.querySelectorAll('.__currency__'))
        .sort((a, b) => {
            let diffA = a.querySelector('[data-' + sorting + ']').getAttribute('data-' + sorting);
            let diffB = b.querySelector('[data-' + sorting + ']').getAttribute('data-' + sorting);

            if (sorting == 'volume') {
                diffA = diffA.replace(',', '');
                diffB = diffB.replace(',', '');
            }

            if (order) {
                return diffA - diffB;
            } else {
                return diffB - diffA;
            }


        }).forEach(li => {
            wrapper.appendChild(li);
        });
}

function addChange(data) {
    if (!data || typeof data.code == 'undefined') return;

    pLast[data.code] = pLast[data.code] || {};
    __cData[data.code] = __cData[data.code] || {};
    __cData[data.code].actual = __cData[data.code].actual || {};
    __cData[data.code].historic = __cData[data.code].historic || {};
    __cData[data.code].occurrences = __cData[data.code].occurrences || 0;

    __cData[data.code].last = __cData[data.code].actual;
    __cData[data.code].actual = data;

    __cData[data.code].actual.volumeDiff = 0;
    __cData[data.code].actual.volumeDiffProgressive = 0;

    __cData[data.code].last.percentDiff = data.percentChange - (pLast[data.code].percentChange * 1);
    __cData[data.code].last.percentDiffProgressive = data.percentChange - __cData[data.code].last.percentChange;

    if (__cData[data.code].last.volumeBTC) {
        let vDiff = parseFloat(data.volumeBTC) - parseFloat(pLast[data.code].volumeBTC);
        let vDiffP = vDiff / parseFloat(data.volumeBTC) * 100;
        __cData[data.code].actual.volumeDiff = vDiffP.toFixed(4);


        vDiff = parseFloat(data.volumeBTC) - parseFloat(__cData[data.code].last.volumeBTC);
        vDiffP = vDiff / parseFloat(data.volumeBTC) * 100;
        __cData[data.code].actual.volumeDiffProgressive = vDiffP.toFixed(6);
    }

    __cData[data.code].historic[data.id] = __cData[data.code].actual;
}

function getActualChange(code) {
    if (!__cData || !code) return;
    return isset(__cData[code]) ? __cData[code].actual : null;
}

function getLastChange(code) {
    if (!__cData || !code) return;
    return isset(__cData[code]) ? __cData[code].last : null;
}

function getChange(code, id) {
    if (!__cData || !code || !id) return;
    return __cData[code].historic[id];
}

function getChanges(code) {
    if (!__cData) return;
    if (!code) return __cData;
    if (code) return __cData[code].historic;
}

function getAVGChanges(code) {
    if (!__cData || !code || !__cData[code].historic || Object.keys(pLast).length === 0) return;

    var h = __cData[code].historic;

    var sumPriceBuyBTC = 0,
        sumPriceSellBTC = 0,
        sumPercentDiff = 0,
        sumVolumeDiff = 0,
        sumVolumeDiffProgressive = 0,
        counter = 0;

    for (var k in h) {
        var item = h[k];

        sumPriceBuyBTC = (sumPriceBuyBTC + item.priceBuyBTC * 1);
        sumPriceSellBTC = (sumPriceSellBTC + item.priceSellBTC * 1);
        sumPercentDiff = (sumPercentDiff + item.percentDiff * 1);
        sumVolumeDiff = (sumVolumeDiff + item.volumeDiff * 1);
        sumVolumeDiffProgressive = sumVolumeDiffProgressive * 1 + item.volumeDiffProgressive * 1;
        counter++;
    }

    var avgPriceBuyBTC = sumPriceBuyBTC / counter;
    var avgPriceSellBTC = sumPriceSellBTC / counter;
    var avgPercentDiff = sumPercentDiff / counter;
    var avgVolumeDiff = sumVolumeDiff / counter;
    var avgVolumeDiffProgressive = (sumVolumeDiffProgressive * 1) / counter;

    return {
        avgPriceBuyBTC: avgPriceBuyBTC,
        avgPriceSellBTC: avgPriceSellBTC,
        avgPercentDiff: avgPercentDiff,
        avgVolumeDiff: avgVolumeDiff,
        avgVolumeDiffProgressive: (avgVolumeDiffProgressive * 1).toFixed(6),

        sumPriceBuyBTC: sumPriceBuyBTC,
        sumPriceSellBTC: sumPriceSellBTC,
        sumPercentDiff: sumPercentDiff,
        sumVolumeDiff: sumVolumeDiff,
        sumVolumeDiffProgressive: (sumVolumeDiffProgressive * 1).toFixed(6),

        counter: counter
    };
}

function walkCurrencies(base = 'btc') {
    var rows = getRows(base);
    var firstRun = false;

    if (Object.keys(pLast).length === 0) {
        firstRun = true;
    }

    rows.forEach(row => {
        var parent = row.parentNode.querySelector('a');
        const {
            code,
            priceBTC,
            priceUSD,
            percent,
            volume
        } = getRowData(row);

        if (firstRun && !pLast[code]) {
            pLast[code] = pLast[code] || {};
        }

        if (typeof pLast[code] != 'undefined') {
            if (typeof pLast[code].linkToTrade == 'undefined') {
                pLast[code].linkToTrade = getTradeUrl(code, base);
            }

            if (typeof pLast[code].percentDiff == 'undefined') pLast[code].percentDiff = 0;
            if (typeof pLast[code].percentChange == 'undefined' && !isNaN(priceBTC)) pLast[code].percentChange = parseFloat(percent);
            if (typeof pLast[code].priceBTC == 'undefined' && !isNaN(priceBTC)) pLast[code].priceBTC = parseFloat(priceBTC);
            if (typeof pLast[code].volumeBTC == 'undefined' && !isNaN(volume)) pLast[code].volumeBTC = parseFloat(volume);

            renderTradeLink(row, code);
            addChange({
                id: generateId(),
                code: code,
                priceBuyBTC: (priceBTC * 1).toFixed(8),
                priceBuyUSD: (priceUSD * 1).toFixed(2),
                volumeBTC: parseFloat(volume),
                percentChange: percent * 1,
                percentDiff: 0,
                percentProfit: settings.percentProfit,
                priceSellBTC: (priceBTC * (settings.percentProfit / 100 + 1)).toFixed(8),
                priceSellUSD: (priceUSD * (settings.percentProfit / 100 + 1)).toFixed(2),
                linkToTrade: pLast[code].linkToTrade,
            });
        }

    });
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

/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function(elem, selector) {

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
