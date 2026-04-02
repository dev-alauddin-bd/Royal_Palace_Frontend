'use client';

import Footer from '@/components/shared/Footer';
import { Header } from '@/components/shared/header';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* ===== Header Section ===== */}
      <Header />

      {/* ===== Main Content Section ===== */}
      <main>{children}</main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
};

export default layout;
