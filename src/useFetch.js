import { useEffect, useState } from "react";
import { axios } from "./pages/components/baseUrl";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.errors);
        setError(error.response.data.errors);
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};
