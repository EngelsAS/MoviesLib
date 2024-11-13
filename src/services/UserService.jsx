import axios from "axios";
import { apiTMDB } from "../utils/config";

const getRequestToken = async () => {
  try {
    const response = await apiTMDB.get("3/authentication/token/new", {
      params: { api_key: import.meta.env.VITE_API_KEY },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createSession = async (requestToken) => {
  const options = {
    method: "POST",
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      request_token: requestToken,
    },
  };

  try {
    const response = await axios(options);
    return response.data.session_id;
  } catch (error) {
    console.error("Erro ao criar a sessão:", error);
    throw error;
  }
};

const returnAccountId = async (sessionId) => {
  try {
    const resp = await apiTMDB.get(`/3/account?session_id=${sessionId}`);
    const id = resp.data.id;

    return id;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const addToWatchList = async (movieId) => {
  try {
    const resp = await apiTMDB.post(`/3/account/21129846/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    });

    const data = resp.data;
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeFromWatchList = async (movieId) => {
  try {
    const resp = await apiTMDB.post(`/3/account/21129846/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: false,
    });

    const data = resp.data;
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getWatchList = async () => {
  try {
    const resp = await apiTMDB.get(
      "/3/account/21129846/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc"
    );
    const data = resp.data;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const UserService = {
  getRequestToken,
  createSession,
  addToWatchList,
  removeFromWatchList,
  returnAccountId,
  getWatchList,
};

export default UserService;
