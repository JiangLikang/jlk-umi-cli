import React, { PureComponent } from 'react';
import { Layout, BackTop } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Header, SiderBar } from '@/components';
import logo from '@/assets/logo.png';
import { getPageTitle } from '@/utils';
import './index.less';

const { Content } = Layout;

class PageLayout extends PureComponent {
  componentDidMount() {
    const { dispatch, route: { routes } } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes }
    });
    dispatch({
      type: 'setting/getSetting',
    });
  }

  getContext() {
    const { location, menu: { breadcrumbNameMap } } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { setting, collapsed } = this.props;
    if(setting.fixSiderbar) {
      return {
        paddingLeft: collapsed ? '80px' : '256px'
      }
    }
    return null;
  }

  render() {
    const nav = window.localStorage.getItem('nav');
    const {
      dispatch,
      location,
      children,
      collapsed,
      setting,
      menu: { menuData, breadcrumbNameMap }
    } = this.props;

    const siderBarProps = {
      location,
      logo,
      collapsed,
      menuData,
      ...setting
    };

    const headerProps = {
      collapsed,
      onCollapse(collapsed) {
        dispatch({
          type: 'global/save',
          payload: { collapsed }
        });
      }
    }

    const layoutWrap = (
      <Layout>
        <SiderBar {...siderBarProps} />
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh'
          }}>
          <Header {...headerProps} />
          <Content>
            {children}
          </Content>
          {/* <Footer /> */}
        </Layout>
        <BackTop />
      </Layout>
    );
    const layout = (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          {children}
        </Content>
        {/* <Footer /> */}
        <BackTop />
      </Layout>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(location.pathname, breadcrumbNameMap, true)}>
          { nav === '1' ? layoutWrap : layout }
          {/* {layoutWrap } */}
        </DocumentTitle>
      </React.Fragment>
    )
  }
}

export default connect(({ global, setting, menu }) => ({
  setting, menu,
  ...global
}))(PageLayout);
