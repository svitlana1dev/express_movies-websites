import { type Request, type Response, type NextFunction } from "express";
import fetch from "node-fetch";
import status from "http-status";
import { Movie, Actors, Movies } from "../types/types.js";

const apiKey = process.env.API_KEY;
const apiBaseUrl = "http://api.themoviedb.org/3";

export const listOfMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

  try {
    const response = await fetch(nowPlayingUrl);
    const data = (await response.json()) as Movies;

    res.render("index", {
      parsedData: data.results,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
};

export const findMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(thisMovieUrl);
    const data = (await response.json()) as Movie;

    res.render("single-movie", {
      parsedData: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
};

export const searchMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;

  try {
    const response = await fetch(movieUrl);
    let data: any = (await response.json()) as Actors;

    if (cat == "person") {
      data = data.results[0].known_for;

      res.render("index", {
        parsedData: data,
      });
    }
    res.render("index", {
      parsedData: data.results,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
};
