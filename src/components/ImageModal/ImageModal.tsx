type ImageModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  image: string;
};

export const ImageModal = ({
  isVisible = false,
  closeModal = () => {},
  image = "",
}: ImageModalProps) => {
  return isVisible ? (
    <div
      className={`fixed w-full h-screen bg-black text-white top-0 flex flex-col align-middle items-center`}
    >
      <img className="w-80" src={image} />
      <button onClick={closeModal}>Close</button>
    </div>
  ) : null;
};
