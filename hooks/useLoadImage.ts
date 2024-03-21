import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return null;

  const { data: imgData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.img_path);

  return imgData.publicUrl;
};

export default useLoadImage;
