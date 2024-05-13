// 使用 loading 來實現 streaming，在 Next.js 中 loading.tsx 是特別的檔案，它產生 UI 元件並且在頁面載入時最為替代顯示。所以如果因為 Dynamic Rendering 造成延遲，有 loading 的話則 loading 會先取代需要 Dynamic Rendering 的 UI 部分，其他靜態生成的內容會先顯示(例如 layout.tsx 的 UI)。
// https://nextjs.org/learn/dashboard-app/streaming#streaming-a-whole-page-with-loadingtsx

//
// https://nextjs.org/learn/dashboard-app/streaming#adding-loading-skeletons
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  //   return <div>Loading...</div>;
  return <DashboardSkeleton />;
}
