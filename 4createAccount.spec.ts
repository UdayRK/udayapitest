import { test, expect } from '@playwright/test';

const endpoint = "https://automationexercise.com/api/createAccount";

function generateUser() {
  return {
    name: "TestUser",
    email: `testuser${Date.now()}@mail.com`,
    password: "Pass123!",
    title: "Mr",
    birth_date: "10",
    birth_month: "5",
    birth_year: "1995",
    firstname: "John",
    lastname: "Doe",
    company: "TestCompany",
    address1: "Street 1",
    address2: "Apartment 12",
    country: "India",
    zipcode: "500001",
    state: "Telangana",
    city: "Hyderabad",
    mobile_number: "9876543210"
  };
}

test('TC-01:Verify create account with valid details', async ({ request }) => {

  const user = generateUser();

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(201);

});

test('TC-02: Verify Duplicate username', async ({ request }) => {

  const user = generateUser();

  await request.post(endpoint,{ form: user });

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).not.toBe(201);

});


test('TC-03:Verify name with numeric and special chars', async ({ request }) => {

  const user = generateUser();

  user.name = "User123@#";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(201);

});


test('TC-04:Verify Blank name error', async ({ request }) => {

  const user = generateUser();

  user.name = "";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).not.toBe(201);

});


test('TC-05:Verify Duplicate email', async ({ request }) => {

  const user = generateUser();

  await request.post(endpoint,{ form: user });

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(400);

});


test('TC-06:Verify Invalid email format', async ({ request }) => {

  const user = generateUser();

  user.email = "invalidemail";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(400);

});


test('TC-07:Verify blank email', async ({ request }) => {

  const user = generateUser();

  user.email = "";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(400);

});


test('TC-08:Verify blank password', async ({ request }) => {

  const user = generateUser();

  user.password = "";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(400);

});


test('TC-09:Verify short password with less than 5 characters', async ({ request }) => {

  const user = generateUser();

  user.password = "123";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(201);

});


test('TC-010:Verify password with numeric + special chars', async ({ request }) => {

  const user = generateUser();

  user.password = "123@#";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(201);

});


test('TC-11:Verify birth fields accepts only numeric validation', async ({ request }) => {

  const user = generateUser();

  user.birth_date = "AA";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(400);

});


test('TC-04:Verify birth fields blank allowed', async ({ request }) => {

  const user = generateUser();

  user.birth_date = "";
  user.birth_month = "";
  user.birth_year = "";

  const response = await request.post(endpoint,{ form: user });

  const body = await response.json();

  expect(body.responseCode).toBe(201);

});