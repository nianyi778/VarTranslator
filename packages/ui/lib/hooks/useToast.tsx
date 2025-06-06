import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastOptions {
  message: string;
  duration?: number;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  // 自动识别 ShadowRoot 或 document.body
  const getContainer = () => {
    if (containerRef.current) return containerRef.current;

    const node = document.currentScript?.ownerDocument || document;
    const root = node.getRootNode?.() as ShadowRoot | Document;

    const el = document.createElement('div');
    el.style.position = 'relative';
    el.style.zIndex = '9999';

    // 修复类型判断，避免 ShadowRoot 没有 body 属性的报错
    if ('body' in root && root.body) {
      // Document 情况
      root.body.appendChild(el);
    } else if ('appendChild' in root) {
      // ShadowRoot 情况
      (root as ShadowRoot).appendChild(el);
    }

    containerRef.current = el;
    return el;
  };

  const show = useCallback((message: string, duration = 2000) => {
    setToasts(prev => [...prev, { message, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, duration);
  }, []);

  const ToastList = () => {
    const container = getContainer();
    if (!container) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: 'none',
        }}>
        {toasts.map((toast, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}>
            {toast.message}
          </div>
        ))}
      </div>,
      container,
    );
  };

  return {
    toast: show,
    ToastContainer: ToastList,
  };
};

export { useToast };
export default useToast;
