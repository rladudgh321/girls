export const backUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : 'http://127.0.0.1:3065';