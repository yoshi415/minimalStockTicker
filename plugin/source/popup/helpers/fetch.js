export default async (symbol) => {
  let url = `https://finance.yahoo.com/webservice/v1/symbols/${symbol}/quote?format=json`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.list.resources[0].resource.fields;
  } catch (error) {
    console.log(`Error fetching ${symbol}`, error);
  }
}