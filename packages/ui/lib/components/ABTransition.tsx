import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

export const ABTransition = ({
  showB,
  onBack,
  children,
}: {
  showB: boolean;
  onBack?: () => void;
  children: [ReactNode, ReactNode]; // [A, B]
}) => {
  const [A, B] = children;

  return (
    <div className="relative w-full overflow-hidden">
      {/* A 面板区域 */}
      <div className="transition-all duration-300 ease-in-out">
        <motion.div
          className="transition-transform"
          animate={{
            scale: showB ? 0.98 : 1,
            filter: showB ? 'brightness(0.97)' : 'none',
          }}
          transition={{ duration: 0.3 }}>
          {A}
        </motion.div>
      </div>

      <AnimatePresence>
        {showB && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {/* 遮罩层 */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={onBack}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onBack?.();
                }
              }}
              aria-label="返回"
            />

            {/* 浮层面板 */}
            <motion.div
              className="relative z-10 max-h-[80%] w-full overflow-hidden rounded-t-2xl bg-white/80 shadow-xl backdrop-blur-sm"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <div className="max-h-[80vh] overflow-y-auto">{B}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
