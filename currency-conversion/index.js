'use strict';
(function() {
  window.addEventListener('load', init);

  function init() {
    id('convert').addEventListener('click', convertCurrency);
    addDisclaimer();
  }

  async function convertCurrency() {
    let result = id('result');
    result.innerHTML = '';
    let currency = id('fromCurrency').value;
    const amountParaPreText = "1 Bitcoin = ";

    try {
      const data = await getData();
      const time = data.time.updated;
      const amount = data.bpi[currency].rate_float;

      let timePara = gen('p');
      timePara.textContent = time;

      let amountPara = gen('p');
      amountPara.textContent = amountParaPreText + amount.toLocaleString() + " " + currency;

      result.appendChild(timePara);
      result.appendChild(amountPara);
    } catch (err) {
      result.textContent = "Error: Could not fetch current Bitcoin price";
      console.error(err);
    }
  }

  async function addDisclaimer() {
    try {
      const data = await getData();
      let disclaimer = data.disclaimer;
      let para = gen('p');
      para.textContent = disclaimer;
      id('disclaimer').appendChild(para);
    } catch (err) {
      id('disclaimer').textContent = "Error loading disclaimer";
      console.error(err);
    }
  }

  async function getData() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    if (!response.ok) {
      throw new Error("System Error");
    }
    const data = await response.json();
    return data;
  }

  function id(item) {
    return document.getElementById(item);
  }

  function gen(item) {
    return document.createElement(item);
  }
})();