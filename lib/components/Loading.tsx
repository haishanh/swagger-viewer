import React from 'react';

import s0 from './Loading.module.css';

const Loading = ({ height }) => {
  const style = height ? { height } : {};
  return (
    <div className={s0.loading} style={style}>
      <div className="loading1" />
    </div>
  );
};

export default Loading;
