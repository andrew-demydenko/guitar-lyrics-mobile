import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { deleteSong } from "@/api/song";
import { Song } from "@/entities/song";

export const useDeleteSong = (
  options?: UseMutationOptions<Song, Error, string>
): UseMutationResult<Song, Error, string> => {
  return useMutation({
    mutationFn: deleteSong,
    ...options,
  });
};
