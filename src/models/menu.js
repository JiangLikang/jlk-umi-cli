import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';

const formatter = (data, parentName) => {
  return data.map(item => {
      if(!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if(parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }), // 国际化
        locale
      };

      if(item.routes) {
        const children = formatter(item.routes, locale);
        result.children = children;
      }

      delete result.routes;
      return result;
    })
    .filter(item => item)
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const getSubMenu = item => {
  if(item.children && !item.hideInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children)
    }
  }
  return item;
}

const filterMenuData = data => {
  if(!data) {
    return [];
  }
  return data
    .filter(item => item.name && !item.hideInMenu)
    .map(item => getSubMenu(item))
    .filter(item => item)
}

// 获取面包屑映射
const getBreadcrumbNameMap = data => {
  const routerMap = {};
  const flattenMenuData = data => {
    data.forEach(item => {
      if(item.children) {
        flattenMenuData(item.children);
      }
      routerMap[item.path] = item;
    });
  }
  flattenMenuData(data);
  return routerMap;
}
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: 'menu',
  state: {
    menuData: [],
    breadcrumbNameMap: {}
  },
  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes } = payload;
      const menuData = filterMenuData(memoizeOneFormatter(routes));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData)
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
