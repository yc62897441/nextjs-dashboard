'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// 使用 useSearchParams() hook vs. searchParams prop 時機
// <Search> 是 Client Component, 所以使用 useSearchParams() hook 去取得 params from the client.
// <Table>(/invoices/page 裡面的 Table 元件) 是 Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
// 一般來說，如果想在 client 端取得 params，則使用 useSearchParams() hook，因為其避免需要回到 server 重新處理
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#4-updating-the-table

import { useDebouncedCallback } from 'use-debounce'; // 使用 Debounce https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing

export default function Search({ placeholder }: { placeholder: string }) {
  // 使用 useSearchParams
  // URLSearchParams 是 Web API，提供用於操作 URL 查詢參數的實用方法。
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#2-update-the-url-with-the-search-params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()} // 讓 URL 參數與 input 框內的值保持一致
        // defaultValue vs. value / Controlled vs. Uncontrolled
        // If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.
        // However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
