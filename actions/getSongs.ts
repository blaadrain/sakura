import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongs;
