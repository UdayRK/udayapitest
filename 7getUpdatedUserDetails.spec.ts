import { test, expect } from '@playwright/test';

test.describe('Get Updated User Details API', () => {

  const endpoint = "https://automationexercise.com/api/getUserDetailByEmail";

  test('TC-01:Verify user can view updated account details in response', async ({ request }) => {

    const email = "testudapp@gmail.com";

    const response = await request.get(`${endpoint}?email=${email}`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log("User Details:", JSON.stringify(body, null, 2));

    expect(body.responseCode).toBe(200);
    expect(body.user).toBeDefined();

  });

  test('TC-02:Verify response contains all user details fields', async ({ request }) => {

    const email = "testudapp@gmail.com";

    const response = await request.get(`${endpoint}?email=${email}`);

    const body = await response.json();

    const user = body.user;

    console.log("User Fields:", JSON.stringify(user, null, 2));

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('title');
    expect(user).toHaveProperty('birth_day');
    expect(user).toHaveProperty('birth_month');
    expect(user).toHaveProperty('birth_year');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('company');
    expect(user).toHaveProperty('address1');
    expect(user).toHaveProperty('address2');
    expect(user).toHaveProperty('country');
    expect(user).toHaveProperty('state');
    expect(user).toHaveProperty('city');
    expect(user).toHaveProperty('zipcode');

  });

  test('TC-03:Verify 404 error for invalid or non-existing email', async ({ request }) => {

    const invalidEmail = "invaliduser123@test.com";

    const response = await request.get(`${endpoint}?email=${invalidEmail}`);

    const body = await response.json();

    console.log("Error Response:", JSON.stringify(body, null, 2));

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain("Account not found");

  });

});