export const pagination = {
  current: 1,
  pageSize: 10,
  total: 0
}

export const timeFormat = {
  'ym': 'YYYY-MM',
  'ymd': 'YYYY-MM-DD',
  'ymdhms': 'YYYY-MM-DD HH:mm:ss',
};

export const api = '/api';

export const isDev = window.location.host.toLowerCase().indexOf('test') > -1;
