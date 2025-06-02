import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSharedSongs } from "@/api/song";
import { Song } from "@/entities/song";

export const useSharedSongs = (options?: UseQueryOptions<Song[]>) => {
  return useQuery<Song[], Error>({
    queryKey: ["songs", "shared"],
    queryFn: () => getSharedSongs(),
    staleTime: 1000 * 10,
    retry: false,
    ...options,
  });
};
