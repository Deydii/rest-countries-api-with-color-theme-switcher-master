import { useState, useEffect } from 'react';
import axios from 'axios';
import { Countries } from '../interfaces/types';


export const useLoadData = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Countries[]>(url)
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [url]);
  
  return [loading, countries] as const;
};