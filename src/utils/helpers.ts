import { PixabayMiddlewareResponse } from '@/utils/types';

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * A small helper function that calls the NextJS API route which helps fetch and format the image search results from the Pixabay API.
 *
 * @param {string} query - the search query for the image search
 * @param {number} currentPage - the specific page number of results to fetch
 * @returns {Object} a return object that is formatted by the middleware for frontend consumption. see the PixabayMiddlewareResponse type definition for more details
 */
export const fetchPixabay = async ({
  query = '',
  currentPage = 1
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const pixabay = await fetch(`/api/images?searchQuery=${query}&perPage=10&page=${currentPage}`);

    // handle any errors from the fetch and throw if response was not ok
    if (!pixabay.ok) {
      throw {
        status: pixabay.status,
        statusText: pixabay.statusText,
        url: pixabay.url
      };
    }

    const data = (await pixabay.json()) as PixabayMiddlewareResponse;

    return data;
  } catch (e) {
    console.error({
      ...(e as {}),
      message: 'fetchPixabay failed'
    });

    throw e;
  }
};
