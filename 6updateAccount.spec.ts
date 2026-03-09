import { test, expect } from '@playwright/test';

const endpoint = "https://automationexercise.com/api/updateAccount";

const basePayload = {
        name: "test12",
        email: "test.udapp6@gmail.com",
        password: "test123@",
        title: "Mr",
        birth_day: "21",
        birth_month: "02",
        birth_year: "1991",
        first_name: "test",
        last_name: "KI",
        company: "",
        address1: "xyz",
        address2: "",
        country: "india",
        state: "Kerala",
        city: "Kochi",
        zipcode: "500088"
    };

test.describe("Update Account API", () => {

  test('TC-01:Verify user can update account with valid details', async ({ request }) => {

    const response = await request.put(endpoint, {
      form: basePayload
    });

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User updated!");
  });

  test('TC-02:Verify update with partial fields', async ({ request }) => {

    const payload = {
      email: basePayload.email,
      password: basePayload.password,
      name: "UpdatedName"
    };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-03:Verify name accepts numeric and special characters', async ({ request }) => {

    const payload = { ...basePayload, name: "test@123" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-04:Verify error when name is blank', async ({ request }) => {

    const payload = { ...basePayload, name: "" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).not.toBe(200);
  });

  test('TC-05:Verify error with invalid email', async ({ request }) => {

    const payload = { ...basePayload, email: "invalidemail" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).not.toBe(200);
  });

  test('TC-06:Verify error when email is blank', async ({ request }) => {

    const payload = { ...basePayload, email: "" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).not.toBe(200);
  });

  test('TC-07:Verify password accepts less than 5 characters', async ({ request }) => {

    const payload = { ...basePayload, password: "123" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-08:Verify birth fields accept numeric only', async ({ request }) => {

    const payload = {
      ...basePayload,
      birth_date: "15",
      birth_month: "06",
      birth_year: "1990"
    };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-09:Verify address1 accepts alphanumeric', async ({ request }) => {

    const payload = { ...basePayload, address1: "Street@123#A" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-10:Verify zipcode numeric only', async ({ request }) => {

    const payload = { ...basePayload, zipcode: "560001" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).toBe(200);
  });

  test('TC-11:Verify error for mobile number with alphabets', async ({ request }) => {

    const payload = { ...basePayload, mobile_number: "abc123" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).not.toBe(200);
  });

  test('TC-12:Verify error updating non-existing user', async ({ request }) => {

    const payload = { ...basePayload, email: "nonexisting123@test.com" };

    const response = await request.put(endpoint, { form: payload });
    const body = await response.json();

    console.log(body);
    expect(body.responseCode).not.toBe(200);
  });

});