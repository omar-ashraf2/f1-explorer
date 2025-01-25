import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
});
