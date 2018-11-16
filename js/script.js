let exchangeRates = [];
const baseURL = "https://api.exchangeratesapi.io/latest?base="
let baseAcronym = "EUR";
let fetchURL = baseURL + baseAcronym;
const colorPalete = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9']
let count = 0;

function fetchCurrencyData() {
  fetch(fetchURL)
    .then(response => response.json())
    .then(fetchedData => {
      rawData = fetchedData;
      exchangesBase = fetchedData.base;
      exchangeRates = fetchedData.rates;
      //console.log(rawData);
      //console.log(exchangesBase);
      //console.log(exchangeRates);
      displaySelect();
      displayData();
    });
}

function displaySelect() {
  let selectOutput = document.querySelector('#selectBase');
  //Event listenter
  selectOutput.addEventListener("change", rerender, false);
  for (let key in exchangeRates) {
    let item = exchangeRates[key];
    let newSelect = document.createElement('option');
    newSelect.textContent = key;
    selectOutput.appendChild(newSelect);
  };
};

function displayData() {
  let output = document.querySelector('#output');
  output.innerHTML = '';
  //Find the minimum value
  let exchangeArray = Object.values(exchangeRates);
  let minimumValue = Math.min.apply(null, exchangeArray);
  //console.log(minimumValue);
  for (let key in exchangeRates) {
    //Select column color
    if (count < 20) {
      columnColor = colorPalete[count];
      count = count + 1;
    } else {
      count = 0;
    };
    //Begin building content
    let item = exchangeRates[key];
    //Ensure tallest column is not taller than graph
    let propotionalRate = minimumValue / item;
    //Set column height
    let proportionalHeight = 'height:' + 300 * propotionalRate + 'px';
    //Column
    let currencyBar = document.createElement('div');
    currencyBar.setAttribute('class', 'currencyBar');
    let backgroundColorCol = 'background-color:' + columnColor;
    currencyBar.style.cssText = proportionalHeight + "; " + backgroundColorCol;
    currencyBar.setAttribute('alt', item);
    //Label
    let currencyBarLabel = document.createElement('div');
    currencyBarLabel.setAttribute('class', 'currencyBarLabel');
    let currencyBarLabelSpan = document.createElement('span');
    currencyBarLabelSpan.textContent = item;
    currencyBarLabel.textContent = key;
    currencyBarLabel.appendChild(currencyBarLabelSpan);
    //Container
    let currencyContainer = document.createElement('div');
    currencyContainer.setAttribute('class', 'currencyContainer');
    currencyContainer.appendChild(currencyBar);
    currencyContainer.appendChild(currencyBarLabel);
    //Append to #output
    output.appendChild(currencyContainer);
  }
};

function rerender() {
  let output = document.querySelector('#output');
  output.innerHTML = '';
  let input = document.querySelector('#selectBase');
  let value = input.value;
  baseAcronym = input.value;
  console.log(baseAcronym);
  fetchURL = baseURL + baseAcronym;
  console.log(fetchURL);
  fetchCurrencyData();
}
