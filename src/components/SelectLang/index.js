import { Menu, Icon } from 'antd';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import classnames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default ({
  className
}) => {
  const changeLang = ({ key }) => {
    setLocale(key);
  }

  const selectedLang = getLocale();

  const menu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      <Menu.Item key="zh-CN">
        <span role="img" aria-label="简体中文">
          🇨🇳
        </span>{' '}
        简体中文
      </Menu.Item>
      <Menu.Item key="zh-TW">
        <span role="img" aria-label="繁体中文">
          🇭🇰
        </span>{' '}
        繁体中文
      </Menu.Item>
      <Menu.Item key="en-US">
        <span role="img" aria-label="English">
          🇬🇧
        </span>{' '}
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menu} placement="bottomRight">
      <span className={classnames(styles.dropDown, className)}>
        <Icon type="global" title={formatMessage({ id: 'navBar.lang'})} />
      </span>
    </HeaderDropdown>
  )
}
