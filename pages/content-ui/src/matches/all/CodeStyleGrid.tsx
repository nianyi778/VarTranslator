import { FiCopy, FiCheck } from '@extension/icons';
import { useCallback, useState } from 'react';

let time: ReturnType<typeof setTimeout> | null = null;
const codeStyles = [
  {
    group: '常用风格',
    variants: ['customerInfo', 'CustomerInfo', 'customer_info', 'CUSTOMER_INFO'],
  },
  {
    group: '次选风格',
    variants: ['customer-info', 'customer.info', 'customer info'],
  },
  {
    group: '技术压缩风格',
    variants: ['custInfo', 'cInfo'],
  },
];

export default function CodeStyleSelector({ code }: { code: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  console.debug('[CEB] CodeStyleSelector mounted', code);

  const clipboard = useCallback((name: string) => {
    if (time) {
      clearTimeout(time);
      time = null;
    } // 清除之前的定时器
    try {
      navigator.clipboard.writeText(name);
      setCopied(name);
      time = setTimeout(() => setCopied(null), 1500); // 重置复制状态
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
    }
  }, []);

  return (
    <div className="space-y-2 px-2 py-2">
      {codeStyles.map(({ group, variants }) => (
        <div key={group}>
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-zinc-500">
            <span>{group}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map(v => (
              <button
                key={v}
                onClick={() => clipboard(v)}
                className="group relative flex items-center gap-1 rounded bg-black px-2 py-1 text-xs text-white transition hover:opacity-80">
                <span>{v}</span>
                <span className="opacity-0 transition group-hover:opacity-100">
                  {copied === v ? <FiCheck size={12} /> : <FiCopy size={12} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
