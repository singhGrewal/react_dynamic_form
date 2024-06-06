import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

function useFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading state is true at the beginning
        const response: AxiosResponse<T> = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          // If error is not of type AxiosError, set it to null or handle accordingly
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optional cleanup function can be added here
    return () => {
      // Cleanup logic, if necessary
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// const { data, loading, error } = useFetch<any>('https://api.example.com/data');
