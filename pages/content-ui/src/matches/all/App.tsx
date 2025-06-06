import CodeStyleGrid from './CodeStyleGrid';
import usePreciseClickOutside from './hooks/usePreciseClickOutside';
import useVargenState from './hooks/useVargenState';
import { IoCloseOutline } from '@extension/icons';
import { cn, Tooltip, PacmanLoader } from '@extension/ui';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const { visible, position, text, setVisible } = useVargenState();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<string>('');
  const translated = 'user age';
  const suggestions = {
    minimal: ['userAge'],
    semantic: ['userAge', 'userAgeYears', 'userAgeInYears1', 'userAgeInYears', 'userAgeInYearsOld'],
    technical: ['user_age', 'USER_AGE', 'u_age', 'user_age_years', 'USER_AGE_YEARS', 'userAgeInYears2'],
  };
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
      }, 5000);
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ left: position.x, top: position.y }}
      className={cn(
        'fixed z-[9999] flex max-h-[400px] w-[320px] flex-col rounded-lg border bg-gradient-to-br from-white/10 to-white/5 px-2 pb-3 pt-2 text-white shadow-xl backdrop-blur transition-all duration-300 ease-in-out',
        visible ? 'block' : 'hidden',
      )}>
      <div className="mb-1 flex items-center justify-between">
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
          <div className="mb-2 space-y-1 text-xs">
            <div>
              <span className="text-zinc-500">原文：</span>
              <span className="text-black">{text}</span>
            </div>
            <div>
              <span className="text-zinc-500">翻译：</span>
              <span className="text-black">{translated}</span>
            </div>
          </div>

          {code ? (
            <CodeStyleGrid />
          ) : (
            <div className="space-y-2">
              {Object.entries(suggestions).map(([group, names]) => (
                <div key={group}>
                  <div className="mb-1 text-[11px] font-medium text-zinc-500">
                    {group === 'minimal' ? '极简风格' : group === 'semantic' ? '语义风格' : '技术风格'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {names.map(name => (
                      <Tooltip key={name} content="提示内容">
                        <button
                          // navigator.clipboard.writeText(name)
                          onClick={() => setCode(name)}
                          className="rounded-md bg-zinc-800 px-2 py-1 text-xs transition hover:bg-zinc-700">
                          {name}
                        </button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
