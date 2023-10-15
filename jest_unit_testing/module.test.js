import mut from './module.js'; // MUT = Module Under Test

const portfolio = new mut.StockPortfolio();

// Test to ensure that a new portfolio is empty
test('new portfolio is empty', () => {
  expect(portfolio.symbols).toEqual([]);
  expect(portfolio.shares).toEqual([]);
});

test('empty method works correctly', () => {
  const portfolio = new mut.StockPortfolio();

  expect(portfolio.isEmpty()).toBe(true);
});


test('count symbols method works correctly', () => {
  const portfolio = new mut.StockPortfolio();

  portfolio.symbols=['GME', 'RMLX']
  portfolio.shares=[5, 10]

  expect(portfolio.countSymbols()).toBe(2);
});

test('purchasing stock works correctly', () => {
  const portfolio = new mut.StockPortfolio();

  portfolio.purchaseStock('RBLX', 10);


  expect(portfolio.symbols[0]).toBe('RBLX');
  expect(portfolio.shares[0]).toBe(10);

  portfolio.purchaseStock('RBLX', 15);

  expect(portfolio.shares[0]).toBe(25);
})

test('selling stock works correctly', () => {
  const portfolio = new mut.StockPortfolio();

  portfolio.purchaseStock('RBLX', 20);

  expect(portfolio.shares[0]).toBe(20);

  portfolio.sellStock('RBLX', 10);

  expect(portfolio.shares[0]).toBe(10);
});

test('selling stock method throws error if ticker symbol does not exist', () => {
  const portfolio = new mut.StockPortfolio();

  expect(() => portfolio.sellStock('GME', 5)).toThrowError('Ticker symbol does not exist in Portfolio');
});


test('get shares works correctly', () => {
  const portfolio = new mut.StockPortfolio();

  portfolio.purchaseStock('RBLX', 20);

  expect(portfolio.getShares('RBLX')).toBe(20);

  portfolio.sellStock('RBLX', 5);

  expect(portfolio.getShares('RBLX')).toBe(15);
});


test('If symbols are in the portfolio, that means at least one stock should be owned', () => {
  const portfolio = new mut.StockPortfolio();

  // Add some stocks to the portfolio
  portfolio.purchaseStock('RBLX', 20);
  portfolio.purchaseStock('GME', 5);

  portfolio.sellStock('RBLX', 20);

  // Assert that the portfolio now only has AAPL and GOOG
  expect(portfolio.symbols).toEqual(['GME']);
  expect(portfolio.shares).toEqual([5]);
});

test('sell stock method throws an exception when attempting to sell more shares than actually owned by the portfolio.', () => {
  const portfolio = new mut.StockPortfolio();

  // Add some stocks to the portfolio
  portfolio.purchaseStock('RBLX', 20);

  // Try to sell more shares than owned
  expect(() => portfolio.sellStock('RBLX', 21)).toThrowError(mut.ShareSaleException);
});