import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationProps {
  total: number;
  limit: number;
  queryKey?: string;
}

export const usePagination = ({
  total,
  limit,
  queryKey = "page",
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const page = useMemo(() => {
    const paramPage = parseInt(searchParams.get(queryKey) || "1", 10);
    return paramPage >= 1 && paramPage <= totalPages ? paramPage : 1;
  }, [searchParams, totalPages, queryKey]);

  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set(queryKey, String(newPage));
      setSearchParams(updatedParams);
    }
  };

  return { page, totalPages, setPage };
};
