// 使用 Next.js Middleware 來保護路由
// Protecting your routes with Next.js Middleware
// https://nextjs.org/learn/dashboard-app/adding-authentication#protecting-your-routes-with-nextjs-middleware
// 使用 authConfig 初始化 NextAuth.js，並且匯出 auth property。
// 使用 Middleware 的好處是，保護路由不會開始渲染，直到 Middleware 核對過 authentication，加強安全性以及效能

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
