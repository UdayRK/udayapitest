import { test, expect } from '@playwright/test';

test.describe('Verify Login API', () => {

const endpoint = "https://automationexercise.com/api/verifyLogin";

// valid credentials
const validEmail = "testudapp@gmail.com";
const validPassword = "test123";


test('TC-01:Verify login with valid email and password', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "test.udapp6@gmail.com",
password: "test123@"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(200);
expect(body.message).toContain("User exists");

});


test('TC-02:Verify error with invalid email and valid password', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "tudapp@gmail.com",
password: "test123@"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(404);

});


test('TC-03:Verify error with valid email and invalid password', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "test.udapp6@gmail.com",
password: "te"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(404);

});


test('TC-04:Verify error with invalid email and invalid password', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "invalid@email.com",
password: "wrong123"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(404);

});


test('TC-05:Verify error when only email is entered', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "test.udapp6@gmail.com"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(400);

});


test('TC-06:Verify error when only password is entered', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
password: "test123@"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(400);

});


test('TC-07:Verify error when email and password are missing', async ({ request }) => {

const response = await request.post(endpoint,{
form:{}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(400);

});


test('TC-08:Verify error when email does not exist', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email: "nouserexists@test.com",
password: "12345"
}
});

const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(404);

});


test('TC-09:Verify "User Exists" message for successful login', async ({ request }) => {

const response = await request.post(endpoint,{
form:{
email:"test.udapp6@gmail.com",
password: "test123@"
}
});

const body = await response.json();

console.log(body);

expect(body.message).toBe("User exists!");

});

});