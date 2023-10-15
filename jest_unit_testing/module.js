class ShareSaleException extends Error {
    constructor(message) {
      super(message);
    }
}
class StockPortfolio {
    constructor() {
      this.symbols = [];
      this.shares = [];
    }
  
    isEmpty() {
        return this.symbols.length === 0;
    }

    countSymbols() {
        return this.symbols.length;
    }

    purchaseStock(symbol, shares) {
        const index = this.symbols.indexOf(symbol);
        if (index !== -1) {
          this.shares[index] += shares;
        } else if(shares !== 0) {
            this.symbols.push(symbol);
            this.shares.push(shares);
        }
    }

    getShares(symbol){
        const index = this.symbols.indexOf(symbol);
        return this.shares[index];
    }

    sellStock(symbol, shares) {
        const index = this.symbols.indexOf(symbol);
        if (index === -1) {
          throw new Error('Ticker symbol does not exist in Portfolio');
        } else if (shares > this.shares[index]) {
            throw new ShareSaleException('Not enough shares to sell');
        } else {
          this.shares[index] -= shares;
          if (this.shares[index] === 0) {
            this.symbols.splice(index, 1);
            this.shares.splice(index, 1);
          }
        }
      }
    
  }
export default { StockPortfolio, ShareSaleException };