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
        disabled={currentPage === 1 || isLoading}
        className="pagination-button"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <span>
        Page <strong className="text-primary-light">{currentPage}</strong> of{" "}
        <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="pagination-button"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
