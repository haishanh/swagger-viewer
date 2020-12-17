import { useCallback, useLayoutEffect, useRef, useState } from 'react';
/**
 * cosnt [ref, remainingHeight] = useRemainingViewPortHeight();
 *
 * return a reference, and the remaining height of the referenced dom node
 * to the bottom of the view port
 *
 */
export default function useRemainingViewPortHeight() {
  const ref = useRef(null);
  const [containerHeight, setContainerHeight] = useState(200);
  function _updateContainerHeight() {
    const { top } = ref.current.getBoundingClientRect();
    setContainerHeight(window.innerHeight - top);
  }
  const updateContainerHeight = useCallback(_updateContainerHeight, []);

  useLayoutEffect(() => {
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, [updateContainerHeight]);

  return [ref, containerHeight];
}
