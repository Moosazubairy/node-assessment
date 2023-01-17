const fs = require("fs");
const getCurrentStock = require("../src/index");

describe("getCurrentStock", () => {
  let stockJSON, transactionsJSON;

  beforeAll(() => {
    stockJSON = JSON.parse(fs.readFileSync("./stock.json", "utf8"));
    transactionsJSON = JSON.parse(
      fs.readFileSync("./transactions.json", "utf8")
    );
  });

  test("should return the current stock for a valid SKU", async () => {
    const sku = "12345";
    const expectedQty =
      stockJSON.find((item) => item.sku === sku).qty +
      transactionsJSON
        .filter((transaction) => transaction.sku === sku)
        .reduce((acc, curr) => acc + curr.qty, 0);

    const result = await getCurrentStock(sku);

    expect(result).toEqual({ sku, qty: expectedQty });
  });

  test("should throw an error for an invalid SKU", async () => {
    // Given
    const sku = "invalid_sku";

    // When
    try {
      await getCurrentStock(sku);
      // Then
      fail();
    } catch (error) {
      expect(error.message).toEqual(`SKU ${sku} not found in ${stockPath}`);
    }
  });
});
