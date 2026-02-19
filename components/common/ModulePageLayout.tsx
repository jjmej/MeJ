
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// FIX: Using React.PropsWithChildren to resolve errors where the children prop was reported as missing.
// This makes the `children` prop optional in the type definition, satisfying the TypeScript compiler.
type ModulePageLayoutProps = React.PropsWithChildren<{
  backHref: string;
  backLabel: string;
  title: string;
  emoji?: string;
}>;

export default function ModulePageLayout({ backHref, backLabel, title, emoji, children }: ModulePageLayoutProps) {
  return (
    <div className="space-y-6">
      <Link href={backHref} className="flex items-center gap-2 text-brand-blue font-semibold">
          <ArrowLeftIcon className="w-5 h-5" />
          {backLabel}
      </Link>
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title} {emoji}</h1>
      </div>
      <div className="bg-dark-card p-6 rounded-lg space-y-4 text-slate-300">
        {children}
      </div>
    </div>
  );
}