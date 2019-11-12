import { Modal } from 'antd';

export default ({
  ...restProps
}) => {

  return (
    <Modal {...restProps}
        >
          <p>{'这里可以放置一些内容'}</p>
    </Modal>
  )
}

