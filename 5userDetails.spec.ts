import { test, expect } from '@playwright/test';

test.describe('User Details API', () => {

const endpoint = "https://automationexercise.com/api/getUserDetailByEmail";

test('TC-01:Verify user can view added account details', async ({ request }) => {

  const email = "testudapp@gmail.com";

  const response = await request.get(`${endpoint}?email=${email}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);
  expect(body.user).toBeDefined();

  expect(body.user).toHaveProperty('id');
  expect(body.user).toHaveProperty('name');
  expect(body.user).toHaveProperty('email');

  console.log("User Details:", body.user);

  console.log("User ID:", body.user.id);
  console.log("User Name:", body.user.name);
  console.log("User Email:", body.user.email);
  console.log("User City:", body.user.city);

});


test.describe('Get User Details API - Negative Test', () => {


  test('TC-02:Verify API returns 404 when email does not exist', async ({ request }) => {

    const email = "testudapp100@gmail.com";

    const response = await request.get(`${endpoint}?email=${email}`);

    const responseBody = await response.json();

    console.log("Response Body:", JSON.stringify(responseBody, null, 2));

    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message)
      .toBe("Account not found with this email, try another email!");

  });

});

});
