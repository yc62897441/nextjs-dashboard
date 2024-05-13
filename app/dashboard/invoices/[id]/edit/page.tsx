// 建立 Dynamic Route Segments
// https://nextjs.org/learn/dashboard-app/mutating-data#1-create-a-dynamic-route-segment-with-the-invoice-id

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

// 編輯時，要預先填充(pre-populate)表單內的資料
// https://nextjs.org/learn/dashboard-app/mutating-data#2-read-the-invoice-id-from-page-params

// 透過 id 抓取相關所需資料
// https://nextjs.org/learn/dashboard-app/mutating-data#3-fetch-the-specific-invoice
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

// 404 Not-Found 頁面
// https://nextjs.org/learn/dashboard-app/error-handling#handling-404-errors-with-the-notfound-function
import { notFound } from 'next/navigation';

// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Invoices Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
