// https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-fonts
// It downloads font files at build time and hosts them with your other static assets.
// 打包的時候就會自動下載好字體包進去，所以專案佈署後 client 端就不需要發送 request 去載入字體。
import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
