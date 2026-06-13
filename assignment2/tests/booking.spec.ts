import { test, expect } from '@playwright/test';
import { ApiUtils, BookingPayload } from './api-utils/ApiUtils';

let bookingId: number;

const bookingPayload: BookingPayload = {
  firstname: 'Api',
  lastname: 'Tester',
  totalprice: 275,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-06-18',
    checkout: '2026-06-25',
  },
  additionalneeds: 'Breakfast',
};

const BOOKING_URL = 'https://restful-booker.herokuapp.com/booking';

test.describe.serial('Booking API Integration', () => {
  test.beforeAll(async () => {
    const bookingResponse = await ApiUtils.createBooking(bookingPayload);
    bookingId = bookingResponse.bookingid;
  });

  test('@api GET booking returns expected name', async ({ request }) => {
    const response = await request.get(`${BOOKING_URL}/${bookingId}`);
    expect(response.ok()).toBeTruthy();
    const booking = (await response.json()) as BookingPayload;
    expect(booking.firstname).toBe(bookingPayload.firstname);
    expect(booking.lastname).toBe(bookingPayload.lastname);
  });

  test('@web Load booking page with auth token', async ({ page }) => {
    const auth = await ApiUtils.getToken();
    await page.addInitScript((token: string) => {
      window.localStorage.setItem('token', token);
    }, auth.token);
    await page.route('https://restful-booker.herokuapp.com/booking/*', async (route) => {
      const request = route.request();
      await route.continue({
        headers: {
          ...request.headers(),
          accept: 'application/json',
        },
      });
    });
    const response = await page.goto(`${BOOKING_URL}/${bookingId}`);
    expect(response?.ok()).toBeTruthy();
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain(bookingPayload.firstname);
  });
});
