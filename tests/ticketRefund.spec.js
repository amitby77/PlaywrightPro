import { test, expect } from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill('amitbyale77@gmail.com');
  await page.getByLabel('Password').fill('Sai@4321');

  await page.locator('#login-btn').click();
  await expect(page.getByText('Browse Events').nth(1)).toBeVisible();
}




test('Single ticket booking is eligible for refund', async ({ page }) => {

  // Step 1 Login
  await loginAndGoToBooking(page);

  // Step 2 Book first event
  await page.goto(`${BASE_URL}/events`);

  const firstEvent = page.getByTestId('event-card').first();

  await firstEvent.getByTestId('book-now-btn').click();

  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill('test@email.com');
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Step 3 Navigate to bookings
  await page.getByText('View My Bookings').click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await page.getByText('View Details').first().click();

  await expect(page.getByText('Booking Information')).toBeVisible();

  // Step 4 Validate booking ref
  const bookingRef = (await page.locator('.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm').first().innerText()).trim();

  const eventTitle = (await page.locator('h1').first().innerText()).trim();

  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5 Check refund eligibility
  await page.locator('#check-refund-btn').click();

  await expect(page.locator('#refund-spinner')).toBeVisible();

  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  // Step 6 Validate result
  const result = page.locator('#refund-result');

  await expect(result).toBeVisible();

  await expect(result).toContainText('Eligible for refund');

  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
});

test('Group ticket booking is NOT eligible for refund', async ({ page }) => {

  await loginAndGoToBooking(page);

  await page.goto(`${BASE_URL}/events`);

  const firstEvent = page.getByTestId('event-card').first();

  await firstEvent.getByTestId('book-now-btn').click();

  // Increase ticket quantity to 3
  const plusButton = page.locator('button:has-text("+")');

  await plusButton.click();
  await plusButton.click();

  await page.getByLabel('Full Name').fill('Test User');

  await page.locator('#customer-email').fill('test@email.com');

  await page.getByPlaceholder('+91 98765 43210')
    .fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Go to bookings
  await page.getByText('View My Bookings').click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await page.getByText('View Details').first().click();

  await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking reference logic
  const bookingRef = (await page.locator('.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm').first().innerText()).trim();

  const eventTitle = (await page.locator('h1').innerText()).trim();

  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Refund check
  await page.locator('#check-refund-btn').click();

  await expect(page.locator('#refund-spinner')).toBeVisible();

  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  // Validate result
  const result = page.locator('#refund-result');

  await expect(result).toBeVisible();

  await expect(result).toContainText('Not eligible for refund');

  await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
});