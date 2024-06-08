import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/id';
const rupiahFormatter = (amount: number): string => {
  if (typeof amount == 'undefined') {
    return 'Rp0';
  }
  const formattedAmount = amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedAmount.replace('IDR', 'Rp').trim();
};

const shortenProductName = (name: string): string => {
  const maxLength = 35;
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  } else {
    return name;
  }
};

const capitalCaseAndRemoveUnderscore = (str: string): string => {
  const camelCased = _.camelCase(str);

  // Then, convert to start case to capitalize the first letter of each word
  const capitalCased = _.startCase(camelCased);

  return capitalCased;
};

const dateFormatter = (date: string): string => {
  moment.locale('id'); // Set locale globally
  const tanggal = moment(date);
  return tanggal.format('LL');
};

export {
  rupiahFormatter,
  shortenProductName,
  dateFormatter,
  capitalCaseAndRemoveUnderscore,
};
