'use client';
import { ReactNode } from 'react';
import { CVProvider } from '@/app/store/cvStore';
import { ToastProvider } from '@/app/components/ui/Toaster';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CVProvider>
      <ToastProvider>
        {children}
        <AuthModal />
        <ChatWidget />
      </ToastProvider>
    </CVProvider>
  );
}
