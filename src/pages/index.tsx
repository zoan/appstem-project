import { useEffect, useState } from 'react';
import { BaseSyntheticEvent } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import { ImageModal } from '@/components/ImageModal/ImageModal';

import { fetchPixabay } from '@/utils/helpers';
import { useScrollHelpers } from '../utils/hooks';
import { PixabayImage } from '@/utils/types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // image search state
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number>(1);

  // image modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');

  const { isAtBottom } = useScrollHelpers();

  useEffect(() => {
    if (isAtBottom) {
      // fetch next page
      const callFetch = async () => {
        if (!nextPage) return alert('reached end of images');

        const data = await fetchPixabay({
          query,
          currentPage: nextPage
        });

        const {
          currentPage: newCurrentPage,
          previousPage: newPreviousPage,
          nextPage: newNextPage,
          images: newImages = []
        } = data || {};

        setCurrentPage(newCurrentPage);
        setPreviousPage(newPreviousPage);
        setNextPage(newNextPage);
        setImages([...images, ...newImages]);
      };

      callFetch();
    }
  }, [isAtBottom]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const searchQuery = e.target[0].value;

    // start on page 1 with each new search
    const data = await fetchPixabay({ query: searchQuery, currentPage: 1 });

    const {
      query,
      currentPage: newCurrentPage,
      previousPage: newPreviousPage,
      nextPage: newNextPage,
      images
    } = data || {};

    // update the state
    setQuery(query);
    setCurrentPage(newCurrentPage);
    setPreviousPage(newPreviousPage);
    setNextPage(newNextPage);
    setImages(images);
  };

  const handleImageClick = ({ imageUrl = '' }) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} relative`}
    >
      {/* <p>Query: {query}</p> */}
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <label>Search</label>
        <input />
        <button type="submit">Submit!!</button>
      </form>
      <div className="w-auto">
        {!images?.length ? null : (
          <div className="grid gap-4 grid-cols-4 grid-rows-4">
            {images.map(img => (
              <Image
                onClick={() => handleImageClick({ imageUrl: img.webformatURL })}
                className="cursor-pointer"
                key={img.id}
                src={img.webformatURL}
                alt={img.tags}
                width="300"
                height="300"
              />
            ))}
          </div>
        )}
      </div>
      {/* <p className="fixed top-0 left-0">Current Page: {currentPage}</p> */}
      <ImageModal
        isVisible={isModalOpen}
        image={currentImage}
        closeModal={() => setIsModalOpen(false)}
      />
    </main>
  );
}
