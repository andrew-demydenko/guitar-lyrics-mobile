import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserSongs } from "@/api/song";
import { Song } from "@/entities/song";

export const useUserSongs = (
  userId?: string,
  options?: UseQueryOptions<Song[]>
) => {
  return useQuery<Song[], Error>({
    queryKey: ["songs", userId],
    queryFn: async () => {
      if (!userId) return [];
      const songs = await getUserSongs(userId);
      return songs || [];
    },
    staleTime: 1000 * 10,
    retry: false,
    ...options,
  });
};
