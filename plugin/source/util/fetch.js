export default async (symbol) => {
  const url = `https://finance.yahoo.com/webservice/v1/symbols/${symbol}/quote?format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.list.resources[0].resource.fields;
  } catch (error) {
    console.log(`Error fetching ${symbol}`, error);
  }
}