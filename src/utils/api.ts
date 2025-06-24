/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const fetchData = async<T = any> (table: string): Promise<T[]> => {
  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    console.error('Fetch error:', error);
    throw error;
  }

  return data;
};

export const postData = async (table: string, payload: any): Promise<any> => {
  const { data, error } = await supabase.from(table).insert(payload);

  if (error) {
    console.error('Post error:', error);
    throw error;
  }

  return data;
};