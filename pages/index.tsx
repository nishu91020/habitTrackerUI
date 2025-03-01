'use client';

import Link from 'next/link';
import PushNotificationManager from '@/app/components/PushNotificationManager';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello world!
        <PushNotificationManager />
        <nav>
          <ul>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/signup">Signup</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}