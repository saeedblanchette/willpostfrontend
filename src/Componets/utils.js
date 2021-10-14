import  { useRef, useState } from 'react';

export  function useAsyncReference(value) {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  function updateState(newState) {
    if (!Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender(s => !s);
    }
  }

  return [ ref , updateState];
}
