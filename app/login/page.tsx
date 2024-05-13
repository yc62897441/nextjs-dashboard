// Authentication vs. Authorization
// Authentication 是確認你的身分
// Authorization 是確認身分後，決定你有什麼操作權限
// https://nextjs.org/learn/dashboard-app/adding-authentication#authentication-vs-authorization

// NextAuth.js
// 使用 NextAuth.js 來實作 Authentication
// https://nextjs.org/learn/dashboard-app/adding-authentication#nextauthjs
// Setting up NextAuth.js
// 設定 NextAuth.js
// 1. npm install next-auth@beta
// 2. 終端機執行 openssl rand -base64 32，產生 secret key 並可用來加密 cookies
// 3. 把產生的 secret key，記錄到 .env AUTH_SECRET
// https://nextjs.org/learn/dashboard-app/adding-authentication#setting-up-nextauthjs

import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
