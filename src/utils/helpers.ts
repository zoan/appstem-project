import { PixabayMiddlewareResponse } from '@/utils/types';

export const fetchPixabay = async ({
  query = '',
  currentPage = 1
}: {
  query: string;
  currentPage: number;
}) => {
  const pixabay = await fetch(`/api/images?searchQuery=${query}&perPage=20&page=${currentPage}`);

  const data = (await pixabay.json()) as PixabayMiddlewareResponse;

  return data;
};
