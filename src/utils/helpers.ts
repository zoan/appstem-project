import { PixabayGetResponse } from '@/utils/types';

export const fetchPixabay = async ({ query = '', currentPage = 1 }) => {
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);
  // make sure query is url encoded and replace spaces with "+" as per the Pixabay Docs
  // https://pixabay.com/api/docs/
  const formattedQuery = query.replaceAll(' ', '+');

  const pixabay = await fetch(
    `https://pixabay.com/api/?key=40014584-2010ba5ee0e4df4efd5fa33ec&q=${formattedQuery}&per_page=20&page=${currentPage}`
  );

  const data = (await pixabay.json()) as PixabayGetResponse;

  return data;
};
