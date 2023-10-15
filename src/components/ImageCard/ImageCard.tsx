type ImageCardProps = {
  imageURL: string;
  user: string;
  userImageURL: string;
  handleClick: () => void;
  tags: string;
  likes: number;
};

const ImageCard = ({
  imageURL = '',
  user = '',
  userImageURL = '',
  handleClick = () => {},
  tags = '',
  likes = 0
}: ImageCardProps) => {
  return (
    <div
      className="rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-all ease-in-out"
      onClick={handleClick}
    >
      <img className="w-full bg-gray-200 sm:min-h-[15rem]" src={imageURL} alt={tags} />
      <div className="px-6 py-4 bg-white">
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full mr-4 bg-gray-300 bg-cover flex-shrink-0"
            style={{ backgroundImage: `url('${userImageURL || '/appstem-favicon.png'}')` }}
          />
          <div className="text-sm break-all">
            <p className="text-gray-900 font-bold leading-none">{user}</p>
            <p className="text-gray-600">
              {likes} like{likes === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
