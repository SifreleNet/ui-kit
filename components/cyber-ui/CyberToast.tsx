'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'green' | 'cyan' | 'red' | 'amber';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface CyberToastContextType {
  toast: (options: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const CyberToastContext = createContext<CyberToastContextType | undefined>(undefined);

export function useCyberToast() {
  const context = useContext(CyberToastContext);
  if (!context) {
    throw new Error('useCyberToast must be used within a CyberToastProvider');
  }
  return context;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0a]/95 text-neon-green',
    icon: <CheckCircle2 className="w-4 h-4 text-neon-green" />,
    progress: 'bg-neon-green',
    title: 'text-white',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0a]/95 text-cyan-400',
    icon: <Info className="w-4 h-4 text-cyan-400" />,
    progress: 'bg-cyan-400',
    title: 'text-white',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0a]/95 text-rose-500',
    icon: <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />,
    progress: 'bg-rose-500',
    title: 'text-white',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0a]/95 text-amber-500',
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    progress: 'bg-amber-500',
    title: 'text-white',
  },
};

export function CyberToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    const duration = options.duration ?? 4000;
    
    setToasts((prev) => [...prev, { id, ...options }]);

    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  return (
    <CyberToastContext.Provider value={{ toast, dismiss }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const styles = VARIANTS[t.variant || 'green'];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto w-full border rounded p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden flex gap-3 items-start animate-slideIn font-mono text-xs ${styles.border}`}
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.03]" />

              {/* Progress bar countdown */}
              {t.duration !== 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                  <div
                    className={`h-full ${styles.progress} transition-all duration-[4000ms] ease-linear`}
                    style={{
                      animation: `shrinkWidth ${t.duration || 4000}ms linear forwards`,
                    }}
                  />
                </div>
              )}

              {/* Icon */}
              <div className="shrink-0 mt-0.5">{styles.icon}</div>

              {/* Text info */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className={`font-bold uppercase tracking-wider ${styles.title}`}>
                  {t.title}
                </div>
                {t.message && <p className="text-white/60 text-[10px] break-words">{t.message}</p>}
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </CyberToastContext.Provider>
  );
}
