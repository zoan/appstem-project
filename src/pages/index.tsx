import { useEffect, useState } from 'react';
import { BaseSyntheticEvent } from 'react';
import { Inter } from 'next/font/google';
import { toast } from 'react-toastify';

import Head from 'next/head';
import Image from 'next/image';

import { ImageModal } from '@/components/ImageModal/ImageModal';
import { ImageCard } from '@/components/ImageCard/ImageCard';

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

  const { isAtBottomOfPage } = useScrollHelpers();

  useEffect(() => {
    if (isAtBottomOfPage) {
      if (!nextPage) {
        toast.info(
          `Reached end of image results for: "${query}". Displaying ${images.length} results.`
        );
        return;
      }
      // fetch next page
      const callFetch = async () => {
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
  }, [isAtBottomOfPage]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const searchQuery = e.target[0].value;

    // start on page 1 with each new search
    const data = await fetchPixabay({ query: searchQuery, currentPage: 1 }).catch(e => {
      toast.error('Error in fetching content', e);
    });

    if (data) {
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
    }
  };

  const handleImageClick = ({ imageUrl = '' }) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Head>
        <title>Marc&apos;s Appstem Full Stack Web Developer Prototype</title>
        <meta
          name="description"
          content="Marc's attempt at Appstem's Full Stack Web Developer Prototype."
        />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} relative`}
      >
        <Image src="/appstem-logo.png" width={296} height={48} alt="Appstem logo" />
        {/* <p>Query: {query}</p> */}
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search images..."
              aria-label="Full name"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <div className="w-auto">
          {!images?.length ? null : (
            <div className="grid gap-4 grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3">
              {images.map(img => (
                <ImageCard
                  key={img.id}
                  handleClick={() => handleImageClick({ imageUrl: img.webformatURL })}
                  imageURL={img.webformatURL}
                  user={img.user}
                  userImageURL={img.userImageURL}
                  tags={img.tags}
                  views={img.views}
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
    </div>
  );
}
