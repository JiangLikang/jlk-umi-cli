import { Layout } from 'antd';
import gw from '../../assets/copy.png';

const { Footer } = Layout;

export default () => {
  return (
    <Footer style={{ textAlign: 'center', padding: 12 }}>
      <img src={gw} alt="浙公网安备" style={{ marginRight: 10, verticalAlign: 'top'}} />
      <span style={{ color: "#999" }}>浙公网安备 33010902000631号 | 浙ICP备14026855号-4</span>
    </Footer>
  )
}
