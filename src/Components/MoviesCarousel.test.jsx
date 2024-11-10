import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MoviesCarousel from "./MoviesCarousel";

const moviesMock = [
  { id: 1, poster_path: "path 1", title: "filme 1", vote_average: 7 },
];
const tituloCategoriaMock = "Categoria 1";
const subtituloCategoriaMock = "Subtitulo 1";

const renderComponentCarouselWithProps = () => {
  render(
    <MoviesCarousel
      movies={moviesMock}
      tituloCategoria={tituloCategoriaMock}
      subtituloCategoria={subtituloCategoriaMock}
    />
  );
};

describe("Testa componente MovieCarousel", () => {
  test("Testa se o titulo do Carousel está na tela", async () => {
    renderComponentCarouselWithProps();

    const title = await screen.findByRole("heading", {
      level: 2,
      name: tituloCategoriaMock,
    });

    expect(title).toBeInTheDocument();
  });
});
