import 'babel-polyfill';

export default async (symbols) => {
  if (symbols.length > 0) {
    const symbol = symbols.length === 1 ? symbols[0] : symbols.join(',');
    const url = `https://finance.yahoo.com/webservice/v1/symbols/${symbol}/quote?format=json&view=detail`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.list.resources;
    } catch (error) {
      console.log(`Error fetching ${symbol}`, error);
    }
  }
};