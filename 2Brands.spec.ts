import { test, expect } from '@playwright/test';

test.describe('Brands API', () => {

test('TC-01:Verify user can fetch all brand details using GET method', async ({ request }) => {

  // Send GET request to fetch brands
  const response = await request.get(
    'https://automationexercise.com/api/brandsList'
  );

  console.log(await response.json());

  // Validating HTTP status code
  expect(response.status()).toBe(200);

  // Converting response to JSON
  const responseBody = await response.json();

  // Validating API response code
  expect(responseBody.responseCode).toBe(200);

  // Validating brands array exists
  expect(responseBody.brands).toBeDefined();

  // Validating brands list is not empty
  expect(responseBody.brands.length).toBeGreaterThan(0);

  // Validating structure of first brand
  const firstBrand = responseBody.brands[0];

  expect(firstBrand).toHaveProperty('id');
  expect(firstBrand).toHaveProperty('brand');

});

test('TC-02:Verify brand id values are unique and no duplicate ids exist', async ({ request }) => {

  // Sending GET request to fetch brands
  const response = await request.get(
    'https://automationexercise.com/api/brandsList'
  );

  // Validating HTTP status code
  expect(response.status()).toBe(200);

  // Parse response body
  const responseBody = await response.json();

  // Extracting all brand IDs
  const brandIds = responseBody.brands.map((brand: any) => brand.id);

  // Converting array to Set to remove duplicates
  const uniqueIds = new Set(brandIds);

  // Validating there are no duplicate IDs
  expect(uniqueIds.size).toBe(brandIds.length);

});

test('TC-03: Verify 404 error is displayed when accessing an invalid URL', async ({ request }) => {

  const response = await request.get(
    'https://automationexercise.com/api/brands'
  );

  // Validating HTTP status code is 404
  expect(response.status()).toBe(404);

});

test('TC04 - Verify POST method is not allowed for productsList', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/brandsList'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});

});
