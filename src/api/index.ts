import { AuthApi } from './auth.api';

import { EventTypeApi } from './eventType.api';
import { PackageApi } from './package.api';

export const authApi = new AuthApi();
export const eventTypeApi = new EventTypeApi();
export const packageApi = new PackageApi();
