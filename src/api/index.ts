import { AuthApi } from './auth.api';
import { BookingApi } from './booking.api';
import { EmployeeApi } from './employee.api';
import { EventApi } from './event.api';

import { EventTypeApi } from './eventType.api';
import { RecordsApi } from './financialRecord.api';
import { PackageApi } from './package.api';
import { PromoApi } from './promo.api';
import { StatsApi } from './stats.api';

export const authApi = new AuthApi();
export const eventTypeApi = new EventTypeApi();
export const packageApi = new PackageApi();
export const bookingApi = new BookingApi();
export const promoApi = new PromoApi();
export const employeeApi = new EmployeeApi();
export const eventApi = new EventApi();
export const statsApi = new StatsApi();
export const recordsApi = new RecordsApi();
