// Root layout 是必要的。可以在這邊設定 <html> 中的 metadata
// This is called a root layout and is required... You can use the root layout to modify your <html> and <body> tags, and add metadata
// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#root-layout

// https://nextjs.org/learn/dashboard-app/css-styling#global-styles
// You can import global.css in any component in your application, but...
// 可以在任何 component 中引入 css，但是最好是在根元件引入 global.css
import '@/app/ui/global.css';

// 引入字體
import { inter } from '@/app/ui/fonts';

// 加入 Metadata 的兩種方式
// 1. Config-based: 在 layout.js 或 page.js 檔案中匯出 static metadata 物件，或動態 generateMetadata 函數。
// 2. File-based: 有專門用於 Metadata 的檔案，例如：
//   favicon.ico, apple-icon.jpg, and icon.jpg: Utilized for favicons and icons
//   opengraph-image.jpg and twitter-image.jpg: Employed for social media images
//   robots.txt: Provides instructions for search engine crawling
//   sitemap.xml: Offers information about the website's structure
// https://nextjs.org/learn/dashboard-app/adding-metadata#adding-metadata
// 使用 Metadata
// Page title and descriptions
// 可以在任何的 layout.js or page.js 加入 metadata 物件
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard', // 模板文字，每個頁面都會有，
    default: 'Acme Dashboard', // 預設頁面 title，如果個別頁面有設定 title 則會使用該頁面的設定 title
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  keywords: 'keyword1, keyword2, keyword3',
};

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
