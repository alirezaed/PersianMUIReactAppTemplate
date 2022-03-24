import { format } from 'date-fns-jalali';

export const parseDate = (val) => format(Date.parse(val), 'hh:mm:ss yyyy/MM/dd');
