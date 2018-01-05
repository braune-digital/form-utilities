import { IMyDateModel } from 'ngx-mydatepicker';

import * as moment from 'moment';

export class HelperDate {

  static toUtcDate(date: IMyDateModel | string): moment.Moment {
    if (!date) return null;
    if (typeof date === 'string') {
      return moment(date).utc(true);
    } else {
      return moment(date.jsdate).utc(true);
    }
  }

  static fromUnixToUtcDate(date: number): moment.Moment {
    if (!date) return null;
    return moment.unix(date).utc(true);
  }

  static toFormattedUtcDate(date: IMyDateModel | string): string {
    if (!date) return null;
    return HelperDate.toUtcDate(date).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  static getUtcDate(): moment.Moment {
    return moment().utc();
  }

  static getFormattedUtcDate(): string {
    return HelperDate.getUtcDate().format('YYYY-MM-DDTHH:mm:ssZ');
  }
}
