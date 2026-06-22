import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill('amitbyale77@gmail.com');
  await page.getByLabel('Password').fill('Sai@4321');

  await page.locator('#login-btn').click();
  //await page.locator('data-testid="user-email-display"').waitFor()

  await expect(page.getByText('Browse Events').nth(1)).toBeVisible();
}

function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toISOString().slice(0,16);
}

test('Create event and verify seat reduction after booking', async ({ page }) => {

  // Step 1 Login
  await login(page);

  // Step 2 Create Event
  await page.goto(`${BASE_URL}/admin/events`);

  const eventTitle = `Test Event ${Date.now()}`;

  await page.locator('#event-title-input').fill(eventTitle);

  await page.locator('#admin-event-form textarea')
    .fill('Automation created test event');

  await page.getByLabel('City').fill('Pune');

  await page.getByLabel('Venue').fill('Automation Hall');

  await page.getByLabel('Event Date & Time').fill(futureDateValue());

  await page.getByLabel('Price ($)').fill('100');

  await page.getByLabel('Total Seats').fill('50');

  await page.locator('#add-event-btn').click();

  await expect(page.getByText('Event created!')).toBeVisible();


  // Step 3 Find event and capture seats
  await page.goto(`${BASE_URL}/events`);

  const cards = page.getByTestId('event-card');

  await expect(cards.first()).toBeVisible();

  const eventCard = cards.filter({ hasText: eventTitle });

  await expect(eventCard).toBeVisible({ timeout: 5000 });

  const seatText = await eventCard.locator('text=seat').innerText();

  const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0]);


  // Step 4 Start booking
  await eventCard.getByTestId('book-now-btn').click();


  // Step 5 Fill booking form
  await expect(page.locator('#ticket-count')).toHaveText('1');

  await page.getByLabel('Full Name').fill('Test User');

  await page.locator('#customer-email').fill('test@email.com');

  await page.getByPlaceholder('+91 98765 43210')
    .fill('9876543210');

  await page.locator('.confirm-booking-btn').click();


  // Step 6 Verify booking confirmation
  const bookingRefElement = page.locator('.booking-ref').first();

  await expect(bookingRefElement).toBeVisible();

  const bookingRef = (await bookingRefElement.innerText()).trim();


  // Step 7 Verify My Bookings
  await page.getByText('View My Bookings').click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  const matchedCard = bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef })
  });

  await expect(matchedCard).toBeVisible();

  await expect(matchedCard).toContainText(eventTitle);


  // Step 8 Verify seat reduction
  await page.goto(`${BASE_URL}/events`);

  await expect(cards.first()).toBeVisible();

  const eventCardAfter = cards.filter({ hasText: eventTitle });

  await expect(eventCardAfter).toBeVisible();

  const seatTextAfter = await eventCardAfter.locator('text=seat').innerText();

  const seatsAfterBooking = parseInt(seatTextAfter.match(/\d+/)[0]);

  await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});