import CodeGrid from './CodeGrid';
import CodeStyleGrid from './CodeStyleGrid';
import usePreciseClickOutside from './hooks/usePreciseClickOutside';
import useVargenState from './hooks/useVargenState';
import { IoCloseOutline } from '@extension/icons';
import { cn, PacmanLoader, ABTransition } from '@extension/ui';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const { visible, position, text, setVisible } = useVargenState();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<string>('');
  usePreciseClickOutside(ref, () => {
    setVisible(false);
  });

  useEffect(() => {
    console.debug('[CEB] UI mounted', text, position);
  }, [text, position]);

  useEffect(() => {
    if (!visible) {
      setCode('');
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
        console.debug('[CEB] UI loaded');
      }, 1000);
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ left: position.x, top: position.y }}
      className={cn(
        'fixed z-[9999] flex max-h-[400px] w-[320px] flex-col overflow-hidden rounded-lg border bg-gradient-to-br from-white/10 to-white/5 text-white shadow-xl backdrop-blur transition-all duration-300 ease-in-out',
        visible ? 'block' : 'hidden',
      )}>
      <ABTransition showB={!!code} onBack={() => setCode('')}>
        <>
          <div className="mb-1 flex items-center justify-between px-2 pt-2">
            <span className="text-xs text-zinc-400">VarGen Assistant</span>
            <button
              onClick={() => setVisible(false)}
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800/10 hover:text-white/80"
              aria-label="Close">
              <IoCloseOutline />
            </button>
          </div>

          {loading ? (
            <div className="flex h-[100px] items-center justify-center">
              <PacmanLoader />
            </div>
          ) : (
            <>
              <div className="mb-2 space-y-1 px-2 text-xs">
                <div>
                  <span className="text-zinc-500">原文：</span>
                  <span className="text-black">{text}</span>
                </div>
              </div>
              <CodeGrid key="grid" onClick={setCode} />
            </>
          )}
        </>
        <CodeStyleGrid code={code} />
      </ABTransition>
    </div>
  );
}
