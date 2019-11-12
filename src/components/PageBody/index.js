import { Layout } from 'antd';

export default ({
  children
}) => {
  return (
    <Layout>
      {children ? (
        <div style={{ padding: 24 }}>
          {children}
        </div>
      ) : null}
    </Layout>
  )
}
