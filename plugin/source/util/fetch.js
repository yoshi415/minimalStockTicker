import 'babel-polyfill';

export default async (symbols) => {
  const symbol = symbols.length === 1 ? symbols[0] : symbols.join(',');
  const url = `https://finance.yahoo.com/webservice/v1/symbols/${symbol}/quote?format=json&view=detail`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('running', data)
    return data.list.resources;
  } catch (error) {
    console.log(`Error fetching ${symbol}`, error);
  }
}