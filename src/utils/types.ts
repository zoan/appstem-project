/**
 * Pixabay API Docs: https://pixabay.com/api/docs/
 */
export type PixabayImage = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

export type PixabayGetResponse = {
  total: number;
  totalHits: number;
  hits: Array<PixabayImage>;
};

export type PixabayMiddlewareResponse = {
  query: string;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  perPage: number;
  totalResults: number;
  totalPages: number;
  images: Array<PixabayImage>;
  updatedAt: number;
};
