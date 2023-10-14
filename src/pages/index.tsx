import { useEffect, useState } from "react";
import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import { Inter } from "next/font/google";

import { ImageModal } from "@/components/ImageModal/ImageModal";

import { useDetectPageBottom } from "../utils/hooks";

const inter = Inter({ subsets: ["latin"] });

const fetchPixabay = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const pixabay = await fetch(
    `https://pixabay.com/api/?key=40014584-2010ba5ee0e4df4efd5fa33ec&q=${query}&per_page=20&page=${currentPage}`
  );

  const data = await pixabay.json();

  return data;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const { isAtBottom } = useDetectPageBottom();

  console.log(isAtBottom);

  useEffect(() => {
    if (isAtBottom) {
      // fetch next set
      setCurrentPage(currentPage + 1);

      const callFetch = async () => {
        const data = await fetchPixabay({
          query,
          currentPage: currentPage + 1,
        });

        const concatArray = [...images, ...data?.hits];

        setImages(concatArray);
      };

      callFetch();
    }
  }, [isAtBottom]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const searchQuery = e.target[0].value;
    const formattedQuery = searchQuery.replaceAll(" ", "+");

    setQuery(formattedQuery);
    setCurrentPage(1);

    const data = await fetchPixabay({ query: formattedQuery, currentPage: 1 });

    console.log(data);
    setImages(data?.hits);
  };

  const handleImageClick = ({ imageUrl }) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} relative`}
    >
      <p>Query: {query}</p>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <label>Search</label>
        <input />
        <button type="submit">Submit!!</button>
      </form>
      <div className="w-auto">
        {!images?.length ? (
          <p>No results.</p>
        ) : (
          <div className="grid gap-4 grid-cols-4 grid-rows-4">
            {images.map((img) => (
              <img
                onClick={() => handleImageClick({ imageUrl: img.webformatURL })}
                className="cursor-pointer"
                key={img.webformatURL}
                src={img.webformatURL}
              />
            ))}
          </div>
        )}
      </div>
      <p className="fixed top-0 left-0">Current Page: {currentPage}</p>
      <ImageModal
        isVisible={isModalOpen}
        image={currentImage}
        closeModal={() => setIsModalOpen(false)}
      />
    </main>
  );
}
