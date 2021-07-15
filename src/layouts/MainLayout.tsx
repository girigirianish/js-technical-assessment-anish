import React, { ReactNode } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
