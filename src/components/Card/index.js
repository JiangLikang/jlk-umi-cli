import React, { PureComponent } from 'react';
import { Card, Icon } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export default class CardWrap extends PureComponent {
  state = {
    extend: false
  }

  handleExpand = () => {
    const { extend } = this.state;
    this.setState({
      extend: !extend
    })
  }

  render () {
    const { children, ...restProps } = this.props;
    const { extend } = this.state;
    const cls = classnames({
      [styles.fullScreen]: !!extend
    });

    if(!restProps.extra) {
      restProps.extra = (<span key="fullscreen" onClick={this.handleExpand}><Icon type={extend ? 'shrink' : 'arrows-alt'} /></span>)
    }

    return (
      <div className={cls}>
        <Card {...restProps}>
          {children}
        </Card>
      </div>
    )
  }
}
