import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import Link from 'umi/link';
import PageLoading from '../PageLoading';
import styles from './SiderBar.less';
// import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

const { Sider } = Layout;
const SiderMenu = React.lazy(() => import('./SiderMenu'));


class SiderBar extends PureComponent {
  render() {
    const { logo, collapsed, ...restProps } = this.props;
    const siderClassName = classnames(styles.sider)
    const siderProps = {
      collapsed,
      width: 256,
      theme: restProps.menuTheme,
      className: siderClassName
    }
    return (
      <Sider {...siderProps}>
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{formatMessage({ id: 'title' })}</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>
          <SiderMenu {...restProps} />
        </Suspense>
      </Sider>
    )
  }
}

export default SiderBar;
