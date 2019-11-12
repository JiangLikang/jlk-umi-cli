import { Layout } from 'antd';
import GlobalHeader from './GlobalHeader';

const { Header } = Layout;

export default (props) => {
  const headerProps = {
    style: { padding: 0, marginBottom: 1 }
  }
  return (
    <Header {...headerProps}>
      <GlobalHeader {...props} />
    </Header>
  )
}
