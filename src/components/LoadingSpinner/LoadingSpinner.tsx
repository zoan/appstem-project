type LoadingSpinnerProps = {
  customClass?: string;
};

const LoadingSpinner = ({ customClass = '' }) => {
  return (
    <div
      className={`${customClass} animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-green-600 rounded-full`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
