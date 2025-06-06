import useVargenState from './hooks/useVargenState';
import { IoCloseOutline } from '@extension/icons';
import { cn, Tooltip } from '@extension/ui';
import { useEffect } from 'react';

export default function App() {
  const { visible, position, text, setVisible } = useVargenState();

  const translated = 'user age';
  const suggestions = {
    minimal: ['userAge'],
    semantic: ['userAge', 'userAgeYears', 'userAgeInYears1', 'userAgeInYears', 'userAgeInYearsOld'],
    technical: ['user_age', 'USER_AGE', 'u_age', 'user_age_years', 'USER_AGE_YEARS', 'userAgeInYears2'],
  };

  useEffect(() => {
    console.debug('[CEB] UI mounted', text, position);
  }, [text, position]);

  return (
    <div
      style={{ left: position.x, top: position.y }}
      className={cn(
        'fixed z-[9999] flex w-[320px] flex-col rounded-lg border bg-gradient-to-br from-white/10 to-white/5 p-2 text-white shadow-xl backdrop-blur transition-all duration-300 ease-in-out',
        visible ? 'block' : 'hidden',
      )}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-zinc-400">VarGen Assistant</span>
        <button
          onClick={() => setVisible(false)}
          className="rounded-md p-1 transition hover:bg-white/5"
          aria-label="Close">
          <IoCloseOutline className="text-zinc-400" />
        </button>
      </div>

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
                    onClick={() => navigator.clipboard.writeText(name)}
                    className="rounded-md bg-zinc-800 px-2 py-1 text-xs transition hover:bg-zinc-700">
                    {name}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
