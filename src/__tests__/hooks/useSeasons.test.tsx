import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { useSeasons } from "../../hooks/useSeasons";
import axiosInstance from "../../api/axiosInstance";
import { vi } from "vitest";

vi.mock("../../api/axiosInstance", () => ({
  default: {
    get: vi.fn(),
  },
}));

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("useSeasons", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("fetches seasons data successfully", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: {
        MRData: {
          SeasonTable: {
            Seasons: [{ season: "2023", url: "https://example.com/2023" }],
          },
          total: "1",
        },
      },
    });

    const queryClient = createQueryClient();

    const { result } = renderHook(() => useSeasons(10), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.seasons).toEqual([
      { season: "2023", url: "https://example.com/2023" },
    ]);
    expect(result.current.data?.total).toBe(1);
  });

  test("handles errors gracefully", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValueOnce(
      new Error("Network error")
    );

    const queryClient = createQueryClient();

    const { result } = renderHook(() => useSeasons(10), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      ),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    const error = result.current.error as Error;
    expect(error).toBeDefined();
    expect(error.message).toBe("Network error");
  });
});
