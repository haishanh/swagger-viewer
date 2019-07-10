import React from 'react';
import Input from './Input';
import { useHistory } from './HistoryProvider';

import s0 from './EnterNewSepcUrl.module.css';

const { useState, useCallback } = React;

export default function EnterNewSepcUrl() {
  const [value, setValue] = useState('');
  const history = useHistory();
  function handleOnKeyDown(e) {
    // enter keyCode is 13
    if (e.keyCode !== 13) return;
    if (value === '') return;
    history.push('/' + encodeURIComponent(value));
  }
  const onChange = useCallback(e => {
    const { value } = e.target;
    setValue(value);
  }, []);

  return (
    <>
      <div className={s0.inputWrapper} onKeyDown={handleOnKeyDown}>
        <Input
          placeholder="Type in the url of the swagger spec file"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
