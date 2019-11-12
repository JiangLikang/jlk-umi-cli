import { Badge } from 'antd'
import styles from './index.less';

export default ({
  onMenuClick
}) => {
  let className = styles.right;

  return (
    <div className={className}>
        <a href='/' className={styles.action}>
          <Badge count={5} offset={[5,-5]}>
            代办
          </Badge>
        </a>
        <a href='/' className={styles.action}>登录</a>
        <a href='/' className={styles.action}>退出</a>
    </div>
  )
}
