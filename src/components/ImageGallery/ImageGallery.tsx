import { useState } from 'react';

import ImageCard from '../ImageCard/ImageCard';
import ImageModal from '../ImageModal/ImageModal';

import { PixabayImage } from '@/utils/types';

type ImageGalleryProps = {
  images: Array<PixabayImage>;
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  // image modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<PixabayImage>({} as PixabayImage);

  const handleImageClick = ({ image = {} }) => {
    setCurrentImage(image as PixabayImage);
    setIsModalOpen(true);
  };

  return (
    <div className="w-auto">
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
      <ImageModal
        isVisible={isModalOpen}
        image={currentImage}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ImageGallery;
