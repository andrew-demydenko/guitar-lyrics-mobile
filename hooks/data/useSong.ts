import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  getSongById,
  getUserSongs,
  getSharedSongs,
  deleteSong,
} from "@/api/song";
import { Song } from "@/entities/song";

export const useSongById = (
  id: string,
  options?: UseQueryOptions<Song | null>,
) => {
  return useQuery<Song | null, Error>({
    queryKey: ["song", id],
    queryFn: () => getSongById(id),
    staleTime: 1000 * 10,
    retry: false,
    ...options,
  });
};

export const useSongs = (
  userId?: string,
  options?: UseQueryOptions<Song[]>,
) => {
  return useQuery<Song[], Error>({
    queryKey: userId ? ["songs", userId] : ["songs"],
    queryFn: () => (userId ? getUserSongs(userId) : getSharedSongs()),
    staleTime: 1000 * 10,
    retry: false,
    ...options,
  });
};

export const useSongDelete = (
  options: UseMutationOptions<Song, Error, string>,
) => {
  return useMutation({
    mutationFn: (id: string) => {
      return deleteSong(id);
    },
    ...options,
  });
};
