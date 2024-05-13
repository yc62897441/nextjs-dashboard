// 單一 component 也可以使用 Streaming
// https://nextjs.org/learn/dashboard-app/streaming#streaming-a-component
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

// 考量 Suspense 的界線(Suspense boundaries)
// 1. 思考你想要使用者怎麼體驗 streaming
// 2. 什麼內容想要優先呈現
// 3. component 是否依賴 fetch data
// 以下沒有標準答案
// You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
// You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
// You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.
// In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense.
// https://nextjs.org/learn/dashboard-app/streaming#deciding-where-to-place-your-suspense-boundaries

// 什麼是 Partial Prerendering?
// Partial Prerendering 讓你可以使用靜態的殼 render 一個路由頁面，同時保持部分是 dynamic
// A static route shell is served, ensuring a fast initial load.
// The shell leaves holes where dynamic content will load in asynchronous.
// The async holes are streamed in parallel, reducing the overall load time of the page.
// https://nextjs.org/learn/dashboard-app/partial-prerendering#what-is-partial-prerendering
// 最棒的部分是，不需要特別修改程式碼就可以使用 Partial Prerendering，只要使用 Suspense 去包住 dynamic 的部分即可。
// https://nextjs.org/learn/dashboard-app/partial-prerendering#how-does-partial-prerendering-work
// 1. Created a database in the same region as your application code to reduce latency between your server and database.
// 2. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
// 3. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.
// 4. Parallelize data fetching with JavaScript - where it made sense to do so.
// 5. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.
// 6. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic in preparation for Partial Prerendering.
// https://nextjs.org/learn/dashboard-app/partial-prerendering#summary

import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

import {
  // fetchRevenue,
  // fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';

// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  // 使用 async function 來宣告 functional component，讓你可以用 await 去 fetch 資料
  // https://nextjs.org/learn/dashboard-app/fetching-data#fetching-data-for-the-dashboard-overview-page
  // 注意：這種寫法會使每一個 fetch 都卡住後續的執行(await)，產生 request waterfall (A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests.)(但 waterfall 並不一定不好，例如有時需要先去 fetch UserId 再判斷後續動作、fetch 對應資料)
  // 注意：這是 Static Rendering，所以當資料庫的資料改變，畫面內容並不會更新
  // https://nextjs.org/learn/dashboard-app/fetching-data#practice-fetch-data-for-the-card-components
  // 靜態生成
  // Static Rendering，在 server 打包專案時 render。好處：Faster Websites、Reduced Server Load、SEO
  // Static rendering 非常適合沒有資料的 UI，或是對所有使用者都使用相同資料的 UI
  // https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-static-rendering
  // Dynamic Rendering，是在每個 client 發送請求時才 render。好處：Real-Time Data、User-Specific Content、Request Time Information
  // https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-dynamic-rendering
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  // 這邊的 console 並不會在瀏覽器顯示，而是會在 terminal 顯示
  // console.log('numberOfCustomers', numberOfCustomers);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* <RevenueChart revenue={revenue} /> */}

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
