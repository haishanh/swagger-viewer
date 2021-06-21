import { useRouter } from 'next/router';
import * as React from 'react';

import { buildSpecLink } from '$lib/utils/route.util';

import s0 from './EnterNewSpecUrl.module.scss';
import Input from './Input';

const { useState, useCallback } = React;

export default function EnterNewSepcUrl() {
  const [value, setValue] = useState('');

  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === '') return;
    const to = buildSpecLink(value);
    router.push(to);
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
