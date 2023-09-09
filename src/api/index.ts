import { AuthApi } from './auth.api';
import { BookingApi } from './booking.api';
import { EmployeeApi } from './employee.api';

import { EventTypeApi } from './eventType.api';
import { PackageApi } from './package.api';
import { PromoApi } from './promo.api';

export const authApi = new AuthApi();
export const eventTypeApi = new EventTypeApi();
export const packageApi = new PackageApi();
export const bookingApi = new BookingApi();
export const promoApi = new PromoApi();
export const employeeApi = new EmployeeApi();
