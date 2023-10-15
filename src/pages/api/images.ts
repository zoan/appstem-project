// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { PixabayGetResponse } from '@/utils/types';

const router = createRouter<NextApiRequest, NextApiResponse>();

const apiKey = process.env.PIXABAY_API_KEY;

/**
 * GET /api/images
 *
 * An endpoint that acts as a kind of middleware between the client and the Pixabay API.
 * Takes in a few params and uses that to fetch the search query from Pixabay. The data will be formatted
 * and returned to the frontend for consumption.
 *
 * @param {number} page - the current page to fetch for the current query
 * @param {number} perPage - the number of results to return for each page (API defaults to 20)
 * @param {string} searchQuery - the query used when searching for images
 * @returns {Object} a return object with data formatted for consumption by the frontend. see returnObj below for exact formatting
 */
router.get(async (req, res) => {
  try {
    const page: number = parseInt(req.query.page as string);
    const perPage: number = parseInt(req.query.perPage as string) ?? 10;
    const searchQuery = req.query.searchQuery;

    // make sure query is url encoded and replace spaces with "+" as per the Pixabay Docs
    // https://pixabay.com/api/docs/
    const formattedQuery = (searchQuery as string).replaceAll(' ', '+');

    const pixabay = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${formattedQuery}&per_page=${perPage}&page=${page}`
    );

    const data = (await pixabay.json()) as PixabayGetResponse;

    // create a return object and prepare data for consumption on frontend
    const returnObj = {
      query: searchQuery,
      currentPage: page,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page * perPage > data?.totalHits ? null : page + 1,
      perPage,
      totalResults: data?.totalHits,
      totalPages: Math.ceil(data?.totalHits / perPage),
      images: data?.hits || [],
      updatedAt: Date.now()
    };

    res.status(200).json(returnObj);
  } catch (e) {
    console.error({
      e,
      message: 'An error was encountered in GET /api/images'
    });
    throw e;
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message
    });
  }
});
