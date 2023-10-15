import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { PixabayImage } from '@/utils/types';

type ImageModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  image: PixabayImage;
};

export const ImageModal = ({
  isVisible = false,
  closeModal = () => {},
  image = {} as PixabayImage
}: ImageModalProps) => {
  const cancelButtonRef = useRef(null);

  const { webformatURL, tags, user, userImageURL, views, pageURL, likes, imageSize } = image;
  const splitTags = tags?.split(', ');

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-auto">
                <div className="w-full min-h-[20rem]">
                  <img src={webformatURL} />
                </div>
                <div className="w-full px-6 py-4 bg-white">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full mr-4 bg-gray-300 bg-cover flex-shrink-0"
                      style={{
                        backgroundImage: `url('${userImageURL || '/appstem-favicon.png'}')`
                      }}
                    />
                    <div className="text-sm break-all">
                      <p className="text-gray-900 font-bold leading-none">{user}</p>
                      <p className="text-gray-600">{likes} likes</p>
                      <p className="text-gray-600">{views} views</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    {splitTags?.map(tag => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => window.open(pageURL)}
                  >
                    View on Pixabay
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
