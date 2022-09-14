import React, { MutableRefObject } from "react";

function defaultTrigger(store: MutableRefObject<number>, target: ScrollableElement) {
  const disableHysteresis = false;
  const threshold = 100;
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

export default function usePageScroll() {
  const store = React.useRef<number>(0);
  const target = typeof window !== 'undefined' ? window : null;
  const [trigger, setTrigger] = React.useState(() => defaultTrigger(store, target));

  React.useEffect(() => {
    const handleScroll = () => {
      !trigger && setTrigger(defaultTrigger(store, target));
    };

    target && target.addEventListener('scroll', handleScroll);
    return () => {
      target && target.removeEventListener('scroll', handleScroll);
    };
  },[target, trigger]);

  return trigger;

}