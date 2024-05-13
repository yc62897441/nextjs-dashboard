// 使用 Metadata
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return <p>Customers Page</p>;
}
