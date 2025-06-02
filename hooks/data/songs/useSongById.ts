import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSongById } from "@/api/song";
import { Song } from "@/entities/song";

export const useSongById = (
  id: string,
  options?: UseQueryOptions<Song | null>
) => {
  return useQuery<Song | null, Error>({
    queryKey: ["song", id],
    queryFn: () => getSongById(id),
    staleTime: 1000 * 10,
    retry: false,
    ...options,
  });
};
