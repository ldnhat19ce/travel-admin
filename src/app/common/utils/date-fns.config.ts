import { DateFnsConfigurationService } from "ngx-date-fns";
import { vi } from 'date-fns/locale';

const viConfig = new DateFnsConfigurationService();
viConfig.setLocale(vi);


export const viCf = viConfig;

