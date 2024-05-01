// 使用 layout 的好處之一，只要局部頁面重新渲染，layout 部分可以不動
// One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering
// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#creating-the-dashboard-layout

import SideNav from '@/app/ui/dashboard/sidenav';

// { children } 裡面會放置與其同一層，以及巢狀目錄下的 page.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
