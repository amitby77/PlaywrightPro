import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = `${BASE_URL}/api`;

// ---------------- USERS ----------------
const YAHOO_USER = {
  email: 'yahoo_test_user@yahoo.com',
  password: 'Test@12345'
};

const GMAIL_USER = {
  email: 'gmail_test_user@gmail.com',
  password: 'Test@12345'
};

// ---------------- HELPER FUNCTION ----------------

async function loginAs(page, user) {

  await page.goto(`${BASE_URL}/login`);

  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);

  await page.getByRole('button', { name: /Sign in/i }).click();

  await page.waitForLoadState('networkidle');
}

// ======================================================
// TEST
// ======================================================

test('Gmail user cannot access Yahoo user booking', async ({ page, request }) => {

  // ---------------- STEP 1
  // Login as Yahoo user via API
  // ----------------

  const loginRes = await request.post(`${API_URL}/auth/login`, {
  data: {
    email: YAHOO_USER.email,
    password: YAHOO_USER.password
  }
});

console.log("Status:", loginRes.status());
console.log("Response:", await loginRes.text());

expect(loginRes.ok()).toBeTruthy();
  // ---------------- STEP 2
  // Fetch events to get eventId
  // ----------------

  const eventsRes = await request.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(eventsRes.ok()).toBeTruthy();

  const eventsData = await eventsRes.json();
  const eventId = eventsData.data[0].id;

  // ---------------- STEP 3
  // Create booking as Yahoo user
  // ----------------

  const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      eventId: eventId,
      customerName: 'Yahoo User',
      customerEmail: YAHOO_USER.email,
      customerPhone: '9876543210',
      quantity: 1
    }
  });

  expect(bookingRes.ok()).toBeTruthy();

  const bookingData = await bookingRes.json();
  const yahooBookingId = bookingData.data.id;

  // ---------------- STEP 4
  // Login as Gmail user via UI
  // ----------------

  await loginAs(page, GMAIL_USER);

  // ---------------- STEP 5
  // Navigate to Yahoo booking page
  // ----------------

  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
    waitUntil: 'networkidle'
  });

  // ---------------- STEP 6
  // Validate Access Denied
  // ----------------

  await expect(page.getByText('Access Denied')).toBeVisible();

  await expect(
    page.getByText('You are not authorized to view this booking')
  ).toBeVisible();

});