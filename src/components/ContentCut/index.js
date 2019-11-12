import React,{useState} from 'react';
import styles from './index.less';
import { Icon } from 'antd';

export default ({
  content = ''
}) => {
    const [open,setOpen] = useState(false);

    const tagOpenEvent = ()=>{
      setOpen(true);
    }

    const tagCloseEvent = ()=>{
      setOpen(false);
    }

    let show = content;
    let tagOpen = <span className={styles.tag} onClick={tagOpenEvent}>展开 <Icon type="down" /></span>;
    let tagClose = <span className={styles.tag} onClick={tagCloseEvent}>收起 <Icon type="up" /></span>;

    if( content.length > 50 ){
      if( open ){
        show = <div>{content}{tagClose}</div>;
      }else{
        show = <div>{content.substring(0,50)}{tagOpen}</div>;
      }
    }

  return (
    <div className={styles.contentCut}>{show}</div>
  )
}

