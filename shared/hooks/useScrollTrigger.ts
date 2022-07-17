import * as React from 'react';
import { MutableRefObject } from 'react';


declare global {
  interface Window {
    // pageYOffset: number;
    scrollTop: number;
  }
}

function defaultTrigger(store: MutableRefObject<number>, options: UseScrollTriggerOptions) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;

  if (target) {
    // Get vertical scroll
    store.current = target.pageYOffset !== undefined ? target.pageYOffset : target.scrollTop;
  }

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

type ScrollableElement =  Window | null ;

const defaultTarget: ScrollableElement = typeof window !== 'undefined' ? window : null;

export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: ScrollableElement;
  threshold?: number;
}

export default function useScrollTrigger(options: UseScrollTriggerOptions) {
  const { target = defaultTarget, ...other } = options;
  const getTrigger = defaultTrigger;
  const store = React.useRef<number>(0);
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other));

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target && target.addEventListener('scroll', handleScroll);
    return () => {
      target && target.removeEventListener('scroll', handleScroll);
    };
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}
