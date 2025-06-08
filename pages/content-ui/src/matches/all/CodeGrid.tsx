import { Tooltip } from '@extension/ui';

const suggestions = {
  minimal: ['userAge'],
  semantic: ['userAge', 'userAgeYears', 'userAgeInYears1', 'userAgeInYears', 'userAgeInYearsOld'],
  technical: ['user_age', 'USER_AGE', 'u_age', 'user_age_years', 'USER_AGE_YEARS', 'userAgeInYears2'],
};
export default function CodeGrid({ onClick }: { onClick: (code: string) => void }) {
  return (
    <div className="space-y-2 px-2 pb-2">
      {Object.entries(suggestions).map(([group, names]) => (
        <div key={group}>
          <div className="mb-1 text-[11px] font-medium text-zinc-500">
            {group === 'minimal' ? '极简风格' : group === 'semantic' ? '语义风格' : '技术风格'}
          </div>
          <div className="flex flex-wrap gap-1">
            {names.map(name => (
              <Tooltip key={name} content="提示内容">
                <button
                  onClick={() => onClick(name)}
                  className="rounded-md bg-zinc-800 px-2 py-1 text-xs transition hover:bg-zinc-700">
                  {name}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
