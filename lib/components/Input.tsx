import PropTypes from 'prop-types';
import React from 'react';

import s0 from './Input.module.scss';

export default function Input(props) {
  return <input className={s0.input} {...props} />;
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};
