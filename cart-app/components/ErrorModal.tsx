import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ErrorModalProps } from "@/types/types";

export const ErrorModal = ({ isOpen, close, message }: ErrorModalProps) => {
  // State for progress bar width
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isOpen) {
      // Reset progress when the modal opens
      setProgress(100);

      // Start the countdown for the progress bar
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress > 0) return prevProgress - 1.6667;
          return 0;
        });
      }, 50); // Update progress every 50ms

      // Set the timeout to close the modal
      timer = setTimeout(() => {
        close();
      }, 3000); // Close after 3 seconds
    }

    // Cleanup the timer and interval when modal is closed or component is unmounted
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen, close]);

  return (
    <div data-testid="error-modal">
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Error
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
              <div
                className="bg-red-200 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
