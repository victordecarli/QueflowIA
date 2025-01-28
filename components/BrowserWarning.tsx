'use client';

import { openInBrowser } from '@/lib/browserDetect';

export function BrowserWarning() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700/50 p-4 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-amber-800 dark:text-amber-200 text-sm text-center sm:text-left">
          Para usar as funcionalidades avançadas, abra este editor em um navegador como Chrome ou Safari.
        </p>
        <button
          onClick={openInBrowser}
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-800 dark:hover:bg-amber-700 text-amber-900 dark:text-amber-100 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          Abrir no navegador
        </button>
      </div>
    </div>
  );
}
