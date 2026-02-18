
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <div className="bg-dark-card p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
