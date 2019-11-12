import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import styles from './index.less';

export default ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 24,
  children,
  size,
  next = false,
  ...restProps
}) => {
  const clsString = classNames(styles.descriptionList, styles[layout], className, {
    [styles.descriptionListSmall]: size === 'small',
    [styles.descriptionListLarge]: size === 'large',
    [styles.next]: next
  });

  const column = col > 4 ? 4 : col;

  return (
    <div className={clsString} {...restProps}>
      {title && <div className={styles.title}>{title}</div>}
      <Row gutter={gutter} style={title && {padding: '0 12px'}}>
        {React.Children.map(children, child => React.cloneElement(child, { column }))}
      </Row>
    </div>
  )
}
