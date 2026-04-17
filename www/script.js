const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const url = `https://open.er-api.com/v6/latest/${from}`;
  
  try {
    resultText.innerText = "Converting...";
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[to];
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedResult = formatter.format(amount * rate);
    
    resultText.innerText = `${amount} ${from} = ${formattedResult} ${to}`;
  } catch (error) {
    resultText.innerText = "Error fetching rates.";
    console.error(error);
  }
}

convertBtn.addEventListener('click', convertCurrency);

const swapBtn = document.getElementById('swapBtn');

swapBtn.addEventListener('click', () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
});
const themeToggle=document.getElementById('theme-toggle');
if (localStorage.getItem('theme')==="dark") {
  document.body.classList.add('dark-mode')
  themeToggle.innerText="☀️";
}
themeToggle.addEventListener('click',() => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme','dark');
    themeToggle.innerText="☀️ ";
  } else {
    localStorage.setItem('theme','light')
    themeToggle.innerText="🌙 ";
  }
})