import React, { PureComponent } from 'react';
import classnames from 'classnames';
import styles from './index.less';

export default class FooterFixed extends PureComponent {
  state = {
    width: undefined
  }

  resizeFooterFixed = () => {
    const sider = document.querySelector('.ant-layout-sider');
    if (sider == null) {
      return;
    }
    const width = `calc(100% - ${sider.style.width})`;
    const { width: stateWidth } = this.state;
    if (stateWidth !== width) {
      this.setState({ width });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterFixed);
    this.resizeFooterFixed();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterFixed)
  }

  render() {
    const {
      className,
      extra,
      children,
      ...restProps
    } = this.props;
    const { width } = this.state;

    return (
      <div className={classnames(className, styles.toolbar)} style={{ width }} {...restProps}>
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    )
  }
}
