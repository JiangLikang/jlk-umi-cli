import React from 'react';
import SiderBar from './SiderBar';

const SiderBarWrapper = React.memo(props => {
  // console.log('menu props', props);
  return (
    <SiderBar {...props} />
  )
});

export default SiderBarWrapper;
