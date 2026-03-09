import { test, expect } from '@playwright/test';

test.describe('search Products API', () => {

const endpoint = 'https://automationexercise.com/api/searchProduct';


test('TC-01 :To Verify Search product with valid keyword', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'top' }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.products.length).toBeGreaterThan(0);
});



test('TC-02 :To Verify Search product using uppercase keyword', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'TOP' }
  });

  const body = await response.json();

  expect(body.products.length).toBeGreaterThan(0);
});



test('TC-03 :To Verify Search using partial keyword', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 't' }
  });

  const body = await response.json();

  expect(body.products.length).toBeGreaterThan(0);
});



test('TC-04 :To verify Invalid keyword returns blank array', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'invalidproduct123' }
  });

  const body = await response.json();

  expect(body.products.length).toBe(0);
});



test('TC-05 :To Verify Exact product name returns product details', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'Blue Top' }
  });

  const body = await response.json();

  expect(body.products[0].name).toContain('Top');
});



test('TC-06 : Blank search parameter returns all products', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: '' }
  });

  const body = await response.json();

  expect(body.products.length).toBeGreaterThan(0);
});


test('TC-07 :To verify Missing request body returns 400 error', async ({ request }) => {

  const response = await request.post(endpoint);

  const body = await response.json();

  expect(body.responseCode).toBe(400);
});



test('TC-08 :To verify Search using special characters', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: '&' }
  });

  const body = await response.json();

  expect(body.products).toBeDefined();
});



test('TC-09 : To verify Products sorted by product id', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'top' }
  });

  const body = await response.json();

  const ids = body.products.map((p: any) => p.id);

  const sortedIds = [...ids].sort((a, b) => a - b);

  expect(ids).toEqual(sortedIds);
});



test('TC10 :To verify Keyword with leading/trailing spaces', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: ' top ' }
  });

  const body = await response.json();

  expect(body.responseCode).toBe(200);
});



test('TC-11 :To verify Validate response schema and price > 0', async ({ request }) => {

  const response = await request.post(endpoint, {
    form: { search_product: 'top' }
  });

  const body = await response.json();

  body.products.forEach((product: any) => {

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');

    const price = parseInt(product.price.replace(/\D/g, ''));

    expect(price).toBeGreaterThan(0);

  });

});

});