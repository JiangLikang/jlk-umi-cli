import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import { isUrl } from '@/utils';
import styles from './SiderMenu.less';

const { SubMenu } = Menu;

export default ({
  menuData,
  location = {},
  ...restProps
}) => {
  const getIcon = (icon) => {
    if(typeof icon === 'string' && isUrl(icon)) {
      return (<img src={icon} alt="icon" className={styles.icon} />);
    }
    if(typeof icon === 'string') {
      return ( <Icon type={icon} /> )
    }
    return icon;
  }
  const getPath = path => {
    if(path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }
  const getMenuLink = item => {
    const { path, icon, name, target } = item;
    const newPath = getPath(path);
    const newIcon = getIcon(icon);
    if(/^https?:\/\//.test(path)){
      return (
        <a href={newPath} target={target}>
          {newIcon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link to={newPath} target={target} replace={newPath === location.pathname}>
        {newIcon}
        <span>{name}</span>
      </Link>
    )
  }
  const renderMenu = (item, parent) => {
    if(item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)){
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
          key={item.path}
        >
          {getMenu(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path}>{getMenuLink(item)}</Menu.Item>
    )
  }

  // 获得菜单子节点
  const getMenu = (data, parent) => {
    if (!data) {
      return [];
    }
    return data
      .filter(item => item.name)
      .map(item => renderMenu(item, parent))
      .filter(item => item);
  }


  const menuProps = {
    theme: restProps.menuTheme,
    mode: restProps.menuMode
  };

  return (
    <Menu {...menuProps}>
      {getMenu(menuData)}
    </Menu>
  )
}
