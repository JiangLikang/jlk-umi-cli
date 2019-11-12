import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import pathToRegexp from 'path-to-regexp';
import { formatMessage } from 'umi/locale';

const matchParamsPath = (pathname, breadcrumbNameMap) => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname))
  return breadcrumbNameMap[pathKey];
}

const matchParamsPathWrap = memoizeOne(matchParamsPath, isEqual)

const getPageTitleFn = (pathname, breadcrumbNameMap, isDocument) => {
  const currentRouterData = matchParamsPathWrap(pathname, breadcrumbNameMap);
  if(!currentRouterData) {
    return formatMessage({ id: 'title' });
  }
  const pageName = formatMessage({
    id: currentRouterData.locale || currentRouterData.name,
    defaultMessage: currentRouterData.name
  });
  if(isDocument) {
    return `${pageName} - ${formatMessage({ id: 'title' })}`;
  }
  return `${pageName}`;
}

const getPageTitleWrap = memoizeOne(getPageTitleFn);

export const getPageTitle = (pathname, breadcrumbNameMap, isDocument) => {
  return getPageTitleWrap(pathname, breadcrumbNameMap, isDocument);
}

