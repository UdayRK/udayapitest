import { test, expect } from '@playwright/test';

test.describe('Delete Account API', () => {

  const endpoint = "https://automationexercise.com/api/deleteAccount";

  const validEmail = "test.udapp@gmail.com";
  const validPassword = "test123@";

  test('TC-01:Verify user can view delete account response', async ({ request }) => {

    const response = await request.delete(endpoint, {
      form: {
        email: validEmail,
        password: validPassword
      }
    });

    const body = await response.json();

    console.log("Delete Response:", JSON.stringify(body, null, 2));

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("Account deleted");

  });

  test('TC-02:Verify 404 error when email does not exist', async ({ request }) => {

    const response = await request.delete(endpoint, {
      form: {
        email: "nonexistingemail123@test.com",
        password: validPassword
      }
    });

    const body = await response.json();

    console.log("Invalid Email Response:", JSON.stringify(body, null, 2));

    expect(body.responseCode).toBe(404);

  });

  test('TC-03:Verify 404 error when password is invalid', async ({ request }) => {

    const response = await request.delete(endpoint, {
      form: {
        email: validEmail,
        password: "wrongpassword"
      }
    });

    const body = await response.json();

    console.log("Invalid Password Response:", JSON.stringify(body, null, 2));

    expect(body.responseCode).toBe(404);

  });

});