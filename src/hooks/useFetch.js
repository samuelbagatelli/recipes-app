import { useEffect } from 'react';

export default function useFetch(URL, setter, key) {
  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setter(data[key]);
        return [data];
      } catch (error) {
        console.log(error);
      }
    };
    asyncFetch();
  }, []);
}
