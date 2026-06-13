import { request } from '@playwright/test';

export interface AuthResponse {
  token: string;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface BookingCreatedResponse {
  bookingid: number;
  booking: BookingPayload;
}

const BOOKING_API_BASE = 'https://restful-booker.herokuapp.com';

export class ApiUtils {
  static async getToken(): Promise<AuthResponse> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${BOOKING_API_BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    const body = (await response.json()) as AuthResponse;
    await apiContext.dispose();
    return body;
  }

  static async createBooking(payload: BookingPayload): Promise<BookingCreatedResponse> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${BOOKING_API_BASE}/booking`, {
      data: payload,
    });
    const body = (await response.json()) as BookingCreatedResponse;
    await apiContext.dispose();
    return body;
  }
}
