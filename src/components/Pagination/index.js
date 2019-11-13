// 分页
import { Pagination } from 'antd';

export default props => {
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: false,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total, range) => `${range[0]}-${range[1]}, 共 ${total} 条`,
    ...props
  }

  return (
    <div style={{ marginTop: 24, textAlign: 'right' }} >
      <Pagination {...paginationProps} />
    </div>
  )
}
