export const ImageModal = ({ isVisible, closeModal, image }) => {
  return isVisible ? (
    <div
      className={`fixed w-full h-screen bg-black text-white top-0 flex flex-col align-middle items-center`}
    >
      <img className="w-80" src={image} />
      <button onClick={closeModal}>Close</button>
    </div>
  ) : (
    ""
  );
};
