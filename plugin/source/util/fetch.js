import 'babel-polyfill';

export default async (symbols) => {
  if (symbols.length > 0) {
    const symbol = symbols.length === 1 ? symbols[0] : symbols.join(',');
    const url = `http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=ac1`

    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      console.log(`Error fetching ${symbol}`, error);
    }
  }
};