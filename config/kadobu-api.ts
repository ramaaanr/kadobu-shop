const BASE_API = process.env.NEXT_PUBLIC_API_URL;
const API_PENJUAL = `${BASE_API}/penjual`;
const API_TOKO = `${BASE_API}/toko`;
const API_PRODUCT = `${BASE_API}/katalogs`;
const API_ORDER = `${BASE_API}/order`;
const API_STATISTIC = `${BASE_API}/statistik`;
const API_KEY: any = process.env.API_KEY;
const HEADERS = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};
const HEADERS_PUBLIC = {
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  'Content-Type': 'application/json',
};

export {
  BASE_API,
  API_PENJUAL,
  API_TOKO,
  API_PRODUCT,
  HEADERS,
  API_ORDER,
  HEADERS_PUBLIC,
  API_STATISTIC,
};
