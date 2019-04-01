'use strict';

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
    } else if (exchange === 'fatbtc') {
        let tabs = document.querySelectorAll('#navbarSupportedContent li');
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
    } else if (exchange === 'fatbtc') {
        return 'https://www.fatbtc.com/balance?currency=BTC&Tab=2';//TODO: get withdrawal url
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
    } else if (exchange === 'fatbtc') {
        return url.find('/balance');//TODO: get withdrawal url
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
    } else if (exchange === 'fatbtc') {
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
    } else if (exchange === 'fatbtc') {
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
            url === 'https://www.binance.com/' + hl
        );
    } else if (exchange === 'zb') {
        return (
            url === 'https://web.zb.com/globalmarket' ||
            url === 'https://www.zb.com/globalmarket'
        );
    } else if (exchange === 'fatbtc') {
        return (
            url === 'https://www.fatbtc.com'
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
    } else if (exchange === 'fatbtc') {
        let tabActive = document.querySelector('#navbarSupportedContent li.active');
        return tabActive.innerText.replace(' Market', '').toLowerCase();
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
    } else if (exchange === 'fatbtc') {
        return document.querySelectorAll('.AreaBox .FCNY_box');
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
    } else if (exchange === 'fatbtc') {
        return 'https://www.fatbtc.com/trading/trade/pro/' + code.replace('/', '_');
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
