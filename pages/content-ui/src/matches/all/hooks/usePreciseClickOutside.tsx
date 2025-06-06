import { useEffect } from 'react';

type RefTarget = HTMLElement | null;
type Ref = React.RefObject<RefTarget>;

export default function usePreciseClickOutside(ref: Ref, onClickOutside: () => void) {
  useEffect(() => {
    const handle = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      const rootNode = ref.current.getRootNode?.() ?? null;
      const composedPath = event.composedPath?.() ?? [];

      // 精准判断是否事件发生在当前 ref 或其 ShadowRoot 内
      const isInside =
        composedPath.includes(ref.current) || (rootNode ? composedPath.includes(rootNode as EventTarget) : false);

      if (!isInside) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);

    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [ref, onClickOutside]);
}
