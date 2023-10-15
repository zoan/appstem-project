import { useEffect, useState } from 'react';
import { BaseSyntheticEvent } from 'react';
import { Inter } from 'next/font/google';
import { toast } from 'react-toastify';

import Head from 'next/head';
import Image from 'next/image';

import ImageModal from '@/components/ImageModal/ImageModal';
import ImageCard from '@/components/ImageCard/ImageCard';
import NavBar from '@/components/NavBar/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';

import { fetchPixabay, scrollToTop } from '@/utils/helpers';
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
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  // image modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<PixabayImage>({} as PixabayImage);

  const { isAtBottomOfPage, isScrolled } = useScrollHelpers();

  useEffect(() => {
    if (isAtBottomOfPage && !!query && !isFetching && lastUpdated + 1000 < Date.now()) {
      if (!nextPage) {
        toast.info(
          `Reached end of image results for: "${query}". Displaying ${images.length} results.`,
          {
            position: 'bottom-center',
            theme: 'dark'
          }
        );
        return;
      }
      // fetch next page
      const callFetch = async () => {
        setIsFetching(true);
        const data = await fetchPixabay({
          query,
          currentPage: nextPage
        });

        const {
          currentPage: newCurrentPage,
          previousPage: newPreviousPage,
          nextPage: newNextPage,
          images: newImages = [],
          updatedAt
        } = data || {};

        setCurrentPage(newCurrentPage);
        setPreviousPage(newPreviousPage);
        setNextPage(newNextPage);
        setImages([...images, ...newImages]);
        setLastUpdated(updatedAt);
        setIsFetching(false);
      };

      callFetch();
    }
  }, [isAtBottomOfPage]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    scrollToTop();
    // reset state
    setImages([]);
    setLastUpdated(0);

    const searchQuery = e.target[0].value;

    if (!searchQuery) return;

    setIsFetching(true);

    // start on page 1 with each new search
    const data = await fetchPixabay({ query: searchQuery, currentPage: 1 }).catch(e => {
      const errorMessage = [e.message, e.status, e.statusText].filter(Boolean).join(' | ');
      toast.error(errorMessage, {
        position: 'bottom-center'
      });
    });

    setIsFetching(false);

    if (data) {
      const {
        query,
        currentPage: newCurrentPage,
        previousPage: newPreviousPage,
        nextPage: newNextPage,
        images,
        updatedAt
      } = data || {};

      // update the state
      setQuery(query);
      setCurrentPage(newCurrentPage);
      setPreviousPage(newPreviousPage);
      setNextPage(newNextPage);
      setLastUpdated(updatedAt);
      setImages(images);
    }
  };

  const handleImageClick = ({ image = {} }) => {
    setCurrentImage(image as PixabayImage);
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
        className={`flex min-h-screen flex-col items-center justify-start p-8 sm:p-24 ${inter.className} relative`}
      >
        <Image src="/appstem-logo.png" width={296} height={48} alt="Appstem logo" />
        <NavBar />
        <form
          className="sticky top-5 flex-col items-center justify-center my-8 z-10"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center bg-white border-white-500 border-2 p-2 rounded-md focus-within:border-green-500  ease-in-out duration-200">
            <input
              className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray"
              type="text"
              placeholder="Search images..."
              aria-label="Search images"
            />
            <button
              className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <div className="w-auto">
          {!!lastUpdated && !images?.length && <p>No results found for &quot;{query}&quot;.</p>}
          {!images?.length ? null : (
            <div className="grid gap-4 grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3">
              {images.map(img => (
                <ImageCard
                  key={img.webformatURL}
                  handleClick={() => handleImageClick({ image: img })}
                  imageURL={img.webformatURL}
                  user={img.user}
                  userImageURL={img.userImageURL}
                  tags={img.tags}
                  likes={img.likes}
                />
              ))}
            </div>
          )}
        </div>
        <ImageModal
          isVisible={isModalOpen}
          image={currentImage}
          closeModal={() => setIsModalOpen(false)}
        />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
