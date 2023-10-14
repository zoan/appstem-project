// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { PixabayGetResponse } from '@/utils/types';

const router = createRouter<NextApiRequest, NextApiResponse>();

const apiKey = process.env.PIXABAY_API_KEY;

router.get(async (req, res) => {
  try {
    const page: number = parseInt(req.query.page as string);
    const searchQuery = req.query.searchQuery;
    const perPage: number = parseInt(req.query.perPage as string);

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
      images: data?.hits || []
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
