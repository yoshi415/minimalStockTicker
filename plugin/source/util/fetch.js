import 'babel-polyfill';

export default async (symbols) => {
  if (symbols.length > 0) {
    const symbol = symbols.length === 1 ? symbols[0] : symbols.join(',');
    const url = `https://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=ap2d1t1`

    try {
      const response = await fetch(url);
      const data = await response.text();
      const quotes = data.split('\n');
      quotes.pop();
      return quotes.map(parseData(symbols));
    } catch (error) {
      console.log(`Error fetching ${symbol}`, error);
    }
  }
};

function parseData(symbols) {
  return (data, index) => {
    const [price, percent, date, time] = data.split(',');
    return [symbols[index].toUpperCase(), price, percent, date, time];
  }
}