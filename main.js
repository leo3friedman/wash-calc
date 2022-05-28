const ethPrice = document.getElementById("eth-price");
const tokenPrice = document.getElementById("token-price");
const totalWashed = document.getElementById("total-washed");
const transactionSize = document.getElementById("transaction-size");
const totalDailyTradingFee = document.getElementById("total-daily-trading-fee");
const gasPerTransaction = document.getElementById("gas-per-transaction");
const totalProfit = document.getElementById("total-profit");
const profitPerTransaction = document.getElementById("profit-per-transaction");

const dailyRewards = 624902.8;
const tradingFee = 0.005;

function calcTradingReward(totalWashed, totalTradingFee) {
  return (totalWashed / totalTradingFee) * dailyRewards;
}
function calcTotalProfit(
  totalWashed,
  transactionSize,
  gasPerTransaction,
  tradingReward,
  ethPrice,
  x2y2Price
) {
  return (
    tradingReward * x2y2Price -
    totalWashed * ethPrice -
    (totalWashed / tradingFee / transactionSize) * gasPerTransaction
  );
}

document.querySelectorAll("input").forEach((input) =>
  input.addEventListener("input", function (evt) {
    totalDailyTradingFee.value = Math.max(
      totalDailyTradingFee.value,
      totalWashed.value
    );
    localStorage.setItem(this.id, this.value);
    const tradingReward = calcTradingReward(
      totalWashed.value,
      totalDailyTradingFee.value
    );
    totalProfit.innerText = calcTotalProfit(
      totalWashed.value,
      transactionSize.value,
      gasPerTransaction.value,
      tradingReward,
      parseFloat(ethPrice.innerText),
      parseFloat(tokenPrice.innerText)
    ).toFixed(2);
  })
);
window.onload = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = localStorage.getItem(input.id);
  });
  const tradingReward = calcTradingReward(
    totalWashed.value,
    totalDailyTradingFee.value
  );
  totalProfit.innerText = calcTotalProfit(
    totalWashed.value,
    transactionSize.value,
    gasPerTransaction.value,
    tradingReward,
    parseFloat(ethPrice.innerText),
    parseFloat(tokenPrice.innerText)
  ).toFixed(2);
};

fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,x2y2&vs_currencies=usd"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    ethPrice.innerText = data.ethereum.usd;
    tokenPrice.innerText = data.x2y2.usd;
  });
