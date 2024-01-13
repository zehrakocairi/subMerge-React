import { useState, useEffect } from "react";

const useFetch = (url, defaultForState) => {
  const [data, setData] = useState(defaultForState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error happened with status : " + response.status);
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, setData, isLoading];
};

export default useFetch;
