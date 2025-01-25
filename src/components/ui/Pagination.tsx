import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  return (
    <div className="flex justify-end items-center space-x-4 font-orbitron">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || isLoading}
        className="pagination-button"
      >
        <ChevronLeftIcon className="w-6 h-6 text-text-light dark:text-text-dark" />
      </button>

      <span>
        Page{" "}
        <span className="text-primary-light dark:text-primary-dark">
          {currentPage + 1}
        </span>{" "}
        of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 === totalPages || isLoading}
        className="pagination-button"
      >
        <ChevronRightIcon className="w-6 h-6 text-text-light dark:text-text-dark" />
      </button>
    </div>
  );
};

export default Pagination;
