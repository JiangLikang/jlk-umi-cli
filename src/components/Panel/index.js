import { PageHeader } from 'antd';
import { connect } from 'dva';
import { PageBody } from '@/components';
import { getPageTitle } from '@/utils';

const Panel = ({
  children,
  location,
  breadcrumbNameMap,
  titleExtra = '',
  ...restProps
}) => {
  const title = location ? getPageTitle(location.pathname, breadcrumbNameMap) + titleExtra : titleExtra;
  const pageHeaderProps = {
    title,
    ...restProps
  }

  return (
    <>
      {title ? <PageHeader {...pageHeaderProps} /> : null}
      <PageBody>
        {children}
      </PageBody>
    </>
  )
}

export default connect(({ menu }) => ({ ...menu }))(Panel);
