// 使用 URL search params 的好處：可以加入書籤或是分享URL、Server-Side Rendering and Initial Load、易於追蹤與分析使用者行為
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params

// 實作 URL search params 的步驟：
// 有些 client 端的 hook 可以使用：
// useSearchParams 可以取得 URL 上的參數，例如 /dashboard/invoices?page=1&query=pending 會解析為 {page: '1', query: 'pending'}
// usePathname 可以取得 URL path，例如 /dashboard/invoices 會解析為 '/dashboard/invoices'
// useRouter Enables navigation between routes within client components programmatically. There are multiple methods you can use.
// 1. Capture the user's input.
// 2. Update the URL with the search params.
// 3. Keep the URL in sync with the input field.
// 4 Update the table to reflect the search query.
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-the-search-functionality

// Mutating Data
// 變更資料的非同步式在 server 執行，並且可以在 server 或是 client 端觸發這個函式
// Server Actions 有做資安防護，例如加密封包、輸入檢查、錯誤訊息 hash...等
// https://nextjs.org/learn/dashboard-app/mutating-data#what-are-server-actions

// Next.js with Server Actions
// 使用 Server Action 來修改資料外，同時可以使用 revalidatePath 或 revalidateTag 等 APIs 來重現檢驗相關的快取
// https://nextjs.org/learn/dashboard-app/mutating-data#nextjs-with-server-actions

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { fetchInvoicesPages } from '@/app/lib/data';

// You've handled search and pagination with URL search parameters instead of client state. // 使用 URL search parameters，而非使用 client 端的 state
// You've fetched data on the server. // 在 server 端 fetch 資料，而非在 client 端打 API
// You're using the useRouter router hook for smoother, client-side transitions. // 使用 useRouter hook，在 client 端華順地切換路由(以及路由參數)
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#summary

// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query); // 取得符合 query 條件的資料筆數，並用這個資料筆數來實作 Pagination 功能

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
