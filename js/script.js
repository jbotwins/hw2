let exchangeRates = [];
//console.log(exchangeRates);
let baseURL = "https://api.exchangeratesapi.io/latest?base="
let baseAcronym = "EUR";
let fetchURL = baseURL + baseAcronym;
//console.log(fetchURL);

 function fetchCurrencyData() {
//   console.log(baseAcronym);
//   console.log(fetchURL);
  fetch(fetchURL)
    .then(response => response.json())
    .then(fetchedData => {
      rawData = fetchedData;
      exchangesBase = fetchedData.base;
      exchangeRates = fetchedData.rates;
      //console.log(rawData);
      //console.log(exchangesBase);
      //console.log(exchangeRates);
      //console.log(typeof exchangeRates);
      //state.currencyData = data;
      displaySelect();
      displayData();
    });
}

function displaySelect() {
  let selectOutput = document.querySelector('#selectBase');
  for (let key in exchangeRates) {
    let item = exchangeRates[key];
    //console.log(key);
    let newSelect = document.createElement('option');
    newSelect.textContent = key;
    selectOutput.appendChild(newSelect);
  }
};

function displayData() {
  let output = document.querySelector('#output');
  output.innerHTML = '';
  //console.log(exchangeRates);
  //console.log(typeof exchangeRates);
  //console.log(exchangeRates.rates);
  for (let key in exchangeRates) {
    let item = exchangeRates[key];
    const baseValue = 1;
    let propotionalRate = baseValue / item;
    if (propotionalRate > .5) {
      //console.log('item is: ' + item + '. ' + 'exchangeRates[key] is: ' + exchangeRates[key] + 'key is: ' + key);
      //Build proportion to Base Currency
      let proportionalHeight = 'height:' + 100 * propotionalRate + 'px';
      //console.log(proportionalHeight);
      //console.log(propotionalRate);
      // Build column
      let currencyBar = document.createElement('div');
      currencyBar.setAttribute('class', 'currencyBar');
      currencyBar.setAttribute('style', proportionalHeight);
      currencyBar.textContent = item;
      //Build column label
      let currencyBarLabel = document.createElement('div');
      currencyBarLabel.setAttribute('class', 'currencyBarLabel');
      currencyBarLabel.textContent = key;
      //Build container
      let currencyContainer = document.createElement('div');
      currencyContainer.setAttribute('class', 'currencyContainer');
      currencyContainer.appendChild(currencyBar);
      currencyContainer.appendChild(currencyBarLabel);
      //Append container to output div
      output.appendChild(currencyContainer);
    }
  }
};

function render() {
  fetchCurrencyData();
  displayData();
};

function rerender() {
  let output = document.querySelector('#output');
  output.innerHTML = '';
  let input = document.querySelector('#selectBase');
  //console.log(input);
  let value = input.value;
  //console.log(value);
  baseAcronym = input.value;
  console.log(baseAcronym);
  fetchURL = baseURL + baseAcronym;
  console.log(fetchURL);
  fetchCurrencyData();
}
