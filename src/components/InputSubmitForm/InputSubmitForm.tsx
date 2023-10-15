import { BaseSyntheticEvent } from 'react';

type InputSubmitFormProps = {
  handleSubmit: (e: BaseSyntheticEvent) => void;
  placeholderText?: string;
  buttonText?: string;
};

export const InputSubmitForm = ({
  handleSubmit,
  placeholderText = 'Search images...',
  buttonText = 'Search'
}: InputSubmitFormProps) => {
  return (
    <form
      className="sticky top-5 flex-col items-center justify-center my-8 z-10"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center bg-white border-white-500 border-2 p-2 rounded-md focus-within:border-green-500  ease-in-out duration-200">
        <input
          className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray"
          type="text"
          placeholder={placeholderText}
          aria-label="Search images"
        />
        <button
          className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default InputSubmitForm;
