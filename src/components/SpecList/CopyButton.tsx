import VisuallyHidden from '@reach/visually-hidden';
import copy from 'copy-text-to-clipboard';
import * as React from 'react';
import { Check, Clipboard } from 'react-feather';
import { IconButton } from 'src/components/base/IconButton';

const { useCallback, useState } = React;

type CopyButtonProps = {
  provideContent(): string;
};

export function CopyButton({ provideContent }: CopyButtonProps) {
  const [isCopying, setIsCopying] = useState(false);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isCopying) return;

      setIsCopying(true);
      e.preventDefault();
      copy(provideContent());
      setTimeout(() => setIsCopying(false), 3000);
    },
    [provideContent, isCopying]
  );

  return (
    <IconButton onClick={onClick}>
      {isCopying ? <Check size={16} /> : <Clipboard size={16} />}
      <VisuallyHidden>Copy</VisuallyHidden>
    </IconButton>
  );
}
