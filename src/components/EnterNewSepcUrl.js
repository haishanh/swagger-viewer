import React from 'react';
import { useNavigate } from 'react-router-dom';

import s0 from './EnterNewSepcUrl.module.css';
import Input from './Input';

const { useState, useCallback } = React;

export default function EnterNewSepcUrl() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (value === '') return;
    navigate('/' + encodeURIComponent(value));
  }

  const onChange = useCallback((e) => {
    const { value } = e.target;
    setValue(value);
  }, []);

  return (
    <>
      <form className={s0.inputWrapper} onSubmit={onSubmit}>
        <Input
          name="url"
          placeholder="Type in the url of the swagger spec file"
          value={value}
          onChange={onChange}
        />
      </form>
    </>
  );
}
