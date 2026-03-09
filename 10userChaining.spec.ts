import { test, expect } from '@playwright/test';

test.describe('User API Chaining Flow', () => {

const baseURL = "https://automationexercise.com/api";

const email = `user${Date.now()}@test.com`;
const password = "test123";

test('Create → Get → Update → Login → Delete user flow', async ({ request }) => {

  //  Create User
  const createResponse = await request.post(`${baseURL}/createAccount`, {
    form: {
      name: "TestUser",
      email: email,
      password: password,
      title: "Mr",
      birth_date: "10",
      birth_month: "05",
      birth_year: "1995",
      firstname: "John",
      lastname: "Doe",
      company: "ABC Corp",
      address1: "Street 1",
      address2: "Street 2",
      country: "India",
      zipcode: "500088",
      state: "Kerala",
      city: "Kochi",
      mobile_number: "9876543210"
    }
  });

  const createBody = await createResponse.json();
  console.log("Create User Response:", createBody);

  expect(createBody.responseCode).toBe(201);



  //  Fetch User Details
  const getResponse = await request.get(
    `${baseURL}/getUserDetailByEmail?email=${email}`
  );

  const getBody = await getResponse.json();
  console.log("User Details:", getBody);

  expect(getBody.responseCode).toBe(200);
  expect(getBody.user.email).toBe(email);



  //  Update User Details
  const updateResponse = await request.put(`${baseURL}/updateAccount`, {
    form: {
      name: "UpdatedUser",
      email: email,
      password: password,
      firstname: "Updated",
      lastname: "User",
      address1: "Updated Street",
      country: "India",
      state: "Kerala",
      city: "Kochi",
      zipcode: "500099",
      mobile_number: "9999999999"
    }
  });

  const updateBody = await updateResponse.json();
  console.log("Update Response:", updateBody);

  expect(updateBody.responseCode).toBe(200);



  // 4 Login with Updated User
  const loginResponse = await request.post(`${baseURL}/verifyLogin`, {
    form: {
      email: email,
      password: password
    }
  });

  const loginBody = await loginResponse.json();
  console.log("Login Response:", loginBody);

  expect(loginBody.responseCode).toBe(200);
  expect(loginBody.message).toContain("User exists");



  //  Delete User
  const deleteResponse = await request.delete(`${baseURL}/deleteAccount`, {
    form: {
      email: email,
      password: password
    }
  });

  const deleteBody = await deleteResponse.json();
  console.log("Delete Response:", deleteBody);

  expect(deleteBody.responseCode).toBe(200);

});

});