import axios from "axios";

export const getRequest = async (url: string) => {
  const urll = `https://localhost:7131/api/${url}`;

  const token = localStorage.getItem("jwt");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let data = [];
  try {
    const response = await axios.get(urll);
    data = response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
      location.reload();
    }
  }

  return data;
};

export const postRequest = async (url: string, data: any) => {
  const urll = `https://localhost:7131/api/${url}`;
  const token = localStorage.getItem("jwt");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.post(urll, data);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
    }
    return null;
  }
};

export const deleteRequest = async (url: string) => {
  const urll = `https://localhost:7131/api/${url}`;
  const token = localStorage.getItem("jwt");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.delete(urll);
    return response.status;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
    }
    return null;
  }
};
