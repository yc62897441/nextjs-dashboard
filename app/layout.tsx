// Root layout 是必要的。可以在這邊設定 <html> 中的 metadata
// This is called a root layout and is required... You can use the root layout to modify your <html> and <body> tags, and add metadata
// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#root-layout

// https://nextjs.org/learn/dashboard-app/css-styling#global-styles
// You can import global.css in any component in your application, but...
// 可以在任何 component 中引入 css，但是最好是在根元件引入 global.css
import '@/app/ui/global.css';

// 引入字體
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        // 全域套用字體。https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#adding-a-primary-font
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
