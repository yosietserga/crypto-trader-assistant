'use strict';

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
        '<a href="' + getWithdrawalUrl() + '" target="_blank" style="font-size:12px;color:#fff;background:rgba(66, 244, 146,1);padding:5px;margin:10px;border:none;cursor:pointer;position:absolute;right:100px;text-transform:uppercase;line-height:16px;top:10px;">' + lang['Improve'] + '</a>' +
        '<button id="refreshButton" style="font-size:12px;color:#fff;background:#ffd170;padding:5px;margin:10px;border:none;cursor:pointer;position:absolute;right:10px;text-transform:uppercase;line-height:16px;top:10px;">' + lang['Refresh'] + '</button>' +
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
            percentProfit: 1,
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

    if (empty(lastSymbol)) lastSymbol = code;
    
    if (lastSymbol != code) {
        lastSymbol = code;
        refresh();
    }

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
            pLast[code].priceBTC = getFloat(priceBTC);
        } else {
            if (!pLast[code].percentChange) pLast[code].percentChange = percent;
            if (!pLast[code].priceBTC) pLast[code].priceBTC = getFloat(priceBTC);
            if (!pLast[code].volumeBTC) pLast[code].volumeBTC = getFloat(volumeBTC);
            if (!pLast[code].volume) pLast[code].volume = getFloat(vol);

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
            let volChange = (getFloat(vol - pLast[code].volume) * getFloat(priceBTC)).toFixed(8);

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
        '<small style="text-align:center;font-size:10px;">' + getFloat(data.volumeBTC) + ' (%' + data.volPercentDiff + ')</small>' +
        '</div>'

        +
        '<br />'

        +
        '<div style="text-align:center;font-size:14px;">' + lang['Since Opened'] + '</div>' +
        '<div style="text-align:center;color:[dumpColor]">' +
        '<small style="text-align:center;font-size:10px;">' + getFloat(data.volDiff) + ' (%' + data.volPercentDiff + ')</small>' +
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
            '$' + getFloat(data.priceBuyBTC) +
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
        let vDiff = getFloat(data.volumeBTC) - getFloat(pLast[data.code].volumeBTC);
        let vDiffP = vDiff / getFloat(data.volumeBTC) * 100;
        __cData[data.code].actual.volumeDiff = vDiffP.toFixed(4);


        vDiff = getFloat(data.volumeBTC) - getFloat(__cData[data.code].last.volumeBTC);
        vDiffP = vDiff / getFloat(data.volumeBTC) * 100;
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
            if (typeof pLast[code].percentChange == 'undefined' && !isNaN(priceBTC)) pLast[code].percentChange = getFloat(percent);
            if (typeof pLast[code].priceBTC == 'undefined' && !isNaN(priceBTC)) pLast[code].priceBTC = getFloat(priceBTC);
            if (typeof pLast[code].volumeBTC == 'undefined' && !isNaN(volume)) pLast[code].volumeBTC = getFloat(volume);
            console.log(code);
            renderTradeLink(row, code);

            addChange({
                id: generateId(),
                code: code,
                priceBuyBTC: (priceBTC * 1).toFixed(8),
                priceBuyUSD: (priceUSD * 1).toFixed(2),
                volumeBTC: getFloat(volume),
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
