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

const UserService = {
  getRequestToken,
  createSession,
};

export default UserService;
