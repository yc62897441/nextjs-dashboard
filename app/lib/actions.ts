// Create a Server Action
// 檔案開頭加上 'use server'，讓這邊匯出(export)的函式都變成 server functions，server functions 可以被匯入到 Client and Server components
// https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action
'use server';

// 使用 Zod, TypeScript 合法化檢測的函示庫，來檢查型別
// https://nextjs.org/learn/dashboard-app/mutating-data#4-validate-and-prepare-the-data
import { z } from 'zod';

// Server-Side validation
// https://nextjs.org/learn/dashboard-app/improving-accessibility#server-side-validation
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }), //  we always want the amount greater than 0 with the .gt() function
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Inserting the data into your database
// https://nextjs.org/learn/dashboard-app/mutating-data#5-inserting-the-data-into-your-database
import { sql } from '@vercel/postgres';

// Revalidate and redirect
// 因為 NEXT 有 Client-side Router Cache，會儲存路由頁面在使用者的瀏覽器中，並且與 prefetching 一起運作，可以減少發送 request 的數量並且提高路由頁面切換的速度。然而，因為有觸發 更新資料的行為，所以要清除快取並且發送 request 到 server，因此可以用 revalidatePath 來實作。
// https://nextjs.org/learn/dashboard-app/mutating-data#6-revalidate-and-redirect
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 加上 try/catch 來作錯誤處理
// https://nextjs.org/learn/dashboard-app/error-handling#adding-trycatch-to-server-actions

// Extract the data from formData
// https://nextjs.org/learn/dashboard-app/mutating-data#3-extract-the-data-from-formdata

// export async function createInvoice(formData: FormData) {
export async function createInvoice(prevState: State, formData: FormData) {
  // prevState - 包含了 the state passed from the useFormState hook. (在目前的範例不會使用到，但是它是必要的 prop)

  // Validate form fields using Zod
  // const { customerId, amount, status } = CreateInvoice.parse({
  // safeParse() 會回傳一個物件，包含 success 或是 error 屬性.
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  console.log('customerId, amount, status', customerId, amount, status);
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// 把 id 傳給 Server Action
// https://nextjs.org/learn/dashboard-app/mutating-data#4-pass-the-id-to-the-server-action

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  // const { customerId, amount, status } = UpdateInvoice.parse({
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  // 加上 try/catch 來作錯誤處理
  // 只有「try」成功執行(沒有發生 error)，才會執行到下面的 redirect 等程式
  // https://nextjs.org/learn/dashboard-app/error-handling#adding-trycatch-to-server-actions

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// 刪除 Invoice
// https://nextjs.org/learn/dashboard-app/mutating-data#deleting-an-invoice
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

// Updating the login form
// 將身份驗證邏輯與登入表單連接，從 auth.ts 匯入 signIn 函數
// https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'; // 使用「 NextAuth.js 錯誤」來顯示錯誤提示 // https://authjs.dev/reference/core/errors
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
