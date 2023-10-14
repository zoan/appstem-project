import { useEffect, useState } from "react";
import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import { Inter } from "next/font/google";

import { ImageModal } from "@/components/ImageModal/ImageModal";

import { fetchPixabay } from "@/utils/helpers";
import { useScrollHelpers } from "../utils/hooks";
import { PixabayImage } from "@/utils/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const { isAtBottom } = useScrollHelpers();

  useEffect(() => {
    if (isAtBottom) {
      // fetch next set
      const callFetch = async () => {
        const data = await fetchPixabay({
          query,
          currentPage: currentPage + 1,
        });

        setCurrentPage(currentPage + 1);
        setImages([...images, ...data?.hits]);
      };

      callFetch();
    }
  }, [isAtBottom]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const searchQuery = e.target[0].value;

    // start on page 1 with each new search
    const data = await fetchPixabay({ query: searchQuery, currentPage: 1 });

    // update the state
    setQuery(searchQuery);
    setCurrentPage(1);

    setImages(data?.hits);
  };

  const handleImageClick = ({ imageUrl = "" }) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} relative`}
    >
      {/* <p>Query: {query}</p> */}
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <label>Search</label>
        <input />
        <button type="submit">Submit!!</button>
      </form>
      <div className="w-auto">
        {!images?.length ? null : (
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
      {/* <p className="fixed top-0 left-0">Current Page: {currentPage}</p> */}
      <ImageModal
        isVisible={isModalOpen}
        image={currentImage}
        closeModal={() => setIsModalOpen(false)}
      />
    </main>
  );
}
