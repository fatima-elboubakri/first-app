

export function getProducts() {
  // Implementation for fetching products
  const url =  process.env.NEXT_PUBLIC_API_URL + '/product/lost';
  const products =  fetch(url).then((response) => response.json());
  return products;
}