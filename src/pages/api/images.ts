// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { PixabayGetResponse } from "@/utils/types";

const router = createRouter<NextApiRequest, NextApiResponse>();

const apiKey = process.env.PIXABAY_API_KEY;

router.get(async (req, res) => {
  try {
    const { currentPage = 1, searchQuery = "", perPage = 20 } = req.query;

    const formattedQuery = (searchQuery as string).replaceAll(" ", "+");

    const pixabay = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${formattedQuery}&per_page=${perPage}&page=${currentPage}`
    );

    const data = (await pixabay.json()) as PixabayGetResponse;

    res.status(200).json(data);
  } catch (e) {
    console.error({
      e,
      message: "An error was encountered in GET /api/images",
    });
    throw e;
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
