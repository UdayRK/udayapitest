import { test, expect } from '@playwright/test';

test.describe('Products API', () => {

  test('TC-01 : To verify user can fetch all product details using GET method', async ({ request }) => {

    // Send GET request
    const response = await request.get('https://automationexercise.com/api/productsList');
    //console.log(await response.json()); 

    // Validating HTTP status
    expect(response.status()).toBe(200);

    // Converting response to JSON
    const responseBody = await response.json();

    // Validating API response code
    expect(responseBody.responseCode).toBe(200);

    // Validating products array exists
    expect(responseBody.products).toBeDefined();

    // Validating products list is not empty
    expect(responseBody.products.length).toBeGreaterThan(0);

    
    const firstProduct = responseBody.products[0];

    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');



  });



test('TC-02: Verify category object contains usertype and category', async ({ request }) => {

  // Send GET request
  const response = await request.get(
    'https://automationexercise.com/api/productsList'
  );

  console.log(await response.json())

  // Validating status code
  expect(response.status()).toBe(200);

  // Parse response
  const responseBody = await response.json();

  // Getting first product
  const firstProduct = responseBody.products[0];

  // Validating category object exists
  expect(firstProduct.category).toBeDefined();

  // Validating category.category field
  expect(firstProduct.category).toHaveProperty('category');

  // Validating category.usertype exists
  expect(firstProduct.category).toHaveProperty('usertype');

  // Validating nested usertype value
  expect(firstProduct.category.usertype).toHaveProperty('usertype');

});

test('TC-03: Verify product id values are unique and no duplicates exist', async ({ request }) => {

  // Send GET request to fetch products
  const response = await request.get(
    'https://automationexercise.com/api/productsList'
  );

//console.log(await response.json())

  // Parse response body
  const responseBody = await response.json();

  // Extracting all product IDs
  const productIds = responseBody.products.map((product: any) => product.id);

  // Converting array to Set (removes duplicates)
  const uniqueIds = new Set(productIds);

  // Validating no duplicate IDs exist
  expect(uniqueIds.size).toBe(productIds.length);

});

test('TC-04: Verify 404 error is displayed when accessing an invalid URL', async ({ request }) => {

  // Sending request to invalid endpoint
  const response = await request.get(
    'https://automationexercise.com/api/products'
  );

  // Validating HTTP status code is 404
  expect(response.status()).toBe(404);

});

test('TC05 - Verify POST method is not allowed for productsList', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/productsList'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});

});
