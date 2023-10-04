'use client';
import '@/styles/app.scss';
import '@/styles/btn.scss';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useState } from 'react';
import { DarkContext } from '@/lib/hooks/use-dark-context';
import { GitContext } from '@/lib/hooks/use-git-context';
import NextTopLoader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';

export default function App({
  children,
  isDark,
  gitData,
}: {
  children: React.ReactNode;
  isDark: boolean;
  gitData?: {
    stars?: number;
    lastVersion?: string;
  };
}) {
  const [dark, setDark] = useState<boolean | undefined>(isDark);

  const pathname = usePathname();

  return (
    <GitContext.Provider value={gitData}>
      <DarkContext.Provider value={dark}>
        {pathname.includes('downloading') ? null : (
          <NextTopLoader showSpinner={false} color={isDark ? '#601DAA' : '#9327FF'} />
        )}

        <div className={'appflowy-app'}>
          <Header />
          <main>{children}</main>
          <Footer onChangeMode={setDark} isDark={!!dark} />
        </div>
      </DarkContext.Provider>
    </GitContext.Provider>
  );
}
