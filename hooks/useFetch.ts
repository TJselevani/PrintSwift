import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(url, {signal: controller.signal});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error: any) {
        if(error.name === 'AbortError'){
          console.log('Fetch Aborted')
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export { useFetch };
