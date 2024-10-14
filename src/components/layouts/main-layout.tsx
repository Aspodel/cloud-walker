import React from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='container m-auto flex min-h-screen flex-col px-8'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
