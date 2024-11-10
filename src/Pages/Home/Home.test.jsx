// import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
// import Home from "./Home";

vi.mock("react-redux", () => ({
  useDispatch() {
    return vi.fn;
  },
  useSelector() {
    return vi.fn;
  },
}));

describe("Testa o componente Home", () => {
  test("1 + 1 deve ser 2", () => {
    const sum = 1 + 1;

    expect(sum).toBe(2);
  });

  //   test("Deve haver um título na página", async () => {
  //     render(<Home />);

  //     const title = await screen.findAllByRole("heading");

  //     expect(title).toBeInTheDocument();
  //   });
});
