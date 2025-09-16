'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import cn from '@/app/utils/TailwindMergeAndClsx';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const SimliHeaderLogo = ({ className, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    console.log('Clicked Loyola logo', pathname);
    if (pathname === '/') {
      window.location.reload();
      return;
    }
    router.push('/');
  };

  return (
    <div className={cn('fixed top-[32px] left-[32px] cursor-pointer', className)} onClick={handleClick}>
      {/** Using public/logo.png for Loyola School branding */}
      <Image src={'/logo.png'} width={48} height={48} className='Logo' alt='Loyola School logo' />
    </div>
  );
};

export default SimliHeaderLogo;
