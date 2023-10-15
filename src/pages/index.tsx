import { useEffect, useState } from 'react';
import { BaseSyntheticEvent } from 'react';
import { Inter } from 'next/font/google';
import { toast } from 'react-toastify';

import Head from 'next/head';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import InputSubmitForm from '@/components/InputSubmitForm/InputSubmitForm';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import NavBar from '@/components/NavBar/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';

import { fetchPixabay, scrollToTop } from '@/utils/helpers';
import { useScrollHelpers } from '@/utils/hooks';
import { PixabayImage, PixabayMiddlewareResponse } from '@/utils/types';

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

  const { isAtBottomOfPage, isScrolled } = useScrollHelpers();

  // this useEffect helps detect when the user is at the bottom of the page and will attempt
  // to load the next group of images
  useEffect(() => {
    const cooldownInterval = 500; // the amount of time to wait before allowing another  fetch
    const shouldFetchNextPage =
      isAtBottomOfPage && !!query && !isFetching && lastUpdated + cooldownInterval < Date.now();

    if (shouldFetchNextPage) {
      // if there is no nextPage, all images for that query from the API have been fetched
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

        // store new values in state after fetching
        setSearchState({ data });

        setIsFetching(false);
      };

      callFetch();
    }
  }, [isAtBottomOfPage]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const searchQuery = e.target[0].value;
    if (!searchQuery) return;

    scrollToTop();

    // reset state
    setImages([]);
    setLastUpdated(0);

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
      setSearchState({ data, isNewSearch: true });
    }
  };

  const setSearchState = ({
    data,
    isNewSearch = false
  }: {
    data: PixabayMiddlewareResponse;
    isNewSearch?: boolean;
  }) => {
    const {
      query,
      currentPage: newCurrentPage,
      previousPage: newPreviousPage,
      nextPage: newNextPage,
      images: newImages,
      updatedAt
    } = data || {};

    const imagesArray = isNewSearch ? newImages : [...images, ...newImages];

    setQuery(query);
    setCurrentPage(newCurrentPage);
    setPreviousPage(newPreviousPage);
    setNextPage(newNextPage);
    setLastUpdated(updatedAt);
    setImages(imagesArray);
  };

  const hasNoResults = !!lastUpdated && !images?.length;

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
        <NavBar />
        <Image src="/appstem-logo.png" width={296} height={48} alt="Appstem logo" />
        <InputSubmitForm handleSubmit={handleSubmit} />
        {hasNoResults && <p>No results found for &quot;{query}&quot;.</p>}
        <ImageGallery images={images} />
        {isFetching && <LoadingSpinner customClass="my-8" />}
        <ScrollToTopButton />
      </main>
    </div>
  );
}
