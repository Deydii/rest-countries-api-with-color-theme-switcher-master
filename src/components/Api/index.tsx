import axios from 'axios';
import { Countries } from '../../interfaces/types';

export const loadData = async (url: string) => {
  const { data } = await axios.get<Countries[]>(url);
  return data
};