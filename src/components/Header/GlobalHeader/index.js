import { Icon } from 'antd';
import RightContent from './RightContent';
import styles from './index.less';

export default ({
  collapsed,
  onCollapse
}) => {
  const toggle = () => {
    onCollapse(!collapsed);
  }
  const toggleFullScreen = () => {
    if(
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
      } else if(document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if(document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if(document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  return (
    <div className={styles.header}>
      <span className={styles.trigger} onClick={toggle}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <span className={styles.trigger} onClick={toggleFullScreen}>
        <Icon type="fullscreen" />
      </span>
      <RightContent />
    </div>
)
}
