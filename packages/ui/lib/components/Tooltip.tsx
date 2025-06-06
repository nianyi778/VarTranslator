import { getStyleTarget } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip = ({ children, content, placement = 'top', delay = 100, className = '' }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>(0);

  const show = () => {
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      let top = 0;
      let left = 0;
      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + 8;
          break;
      }

      setCoords({
        top: top + scrollY,
        left: left + scrollX,
      });
    }
  }, [visible, placement]);

  const mountRoot = triggerRef.current ? getStyleTarget(triggerRef.current) : document.body;

  return (
    <>
      <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} className="inline-block">
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: 'absolute',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className={`pointer-events-none z-[9999] whitespace-nowrap rounded-md bg-black bg-opacity-80 px-2 py-1 text-xs text-white shadow-md transition-opacity duration-200 ${className}`}>
            {content}
          </div>,
          mountRoot,
        )}
    </>
  );
};
