import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default ({
  overlayClassName,
  ...restProps
}) => {
  return (
    <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...restProps} />
  )
}
