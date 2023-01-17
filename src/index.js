const fs = require("fs");

const stockPath = "./stock.json";
const transactionsPath = "./transactions.json";

const getCurrentStock = async (sku) => {
  try {
    //  Reading stock.json & transactions.json

    const stockJSON = JSON.parse(fs.readFileSync(stockPath, "utf8"));
    const transactionsJSON = JSON.parse(
      fs.readFileSync(transactionsPath, "utf8")
    );

    // Checking if the sku exists in stock.json

    const stockItem = stockJSON.find((item) => item.sku === sku);
    if (!stockItem) {
      throw new Error(`SKU ${sku} not found in ${stockPath}`);
    }

    // I'm Finding all transactions for the given sku

    const skuTransactions = transactionsJSON.filter(
      (transaction) => transaction.sku === sku
    );

    // Calculating the current stock
    let currentStock = 0;
    skuTransactions.forEach((transaction) => {
      currentStock += transaction.qty;
    });

    console.log({ sku, qty: currentStock });

    return { sku, qty: currentStock };
  } catch (error) {
    throw new Error(`Error reading files: ${error}`);
  }
};

//you can pass any sku to this function

getCurrentStock("KGD740425/40/48");
