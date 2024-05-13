// 這是 Server Component，會抓取 customers 資料並且傳給 <Form> component
// https://nextjs.org/learn/dashboard-app/mutating-data#1-create-a-new-route-and-form

import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Invoices Create',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
