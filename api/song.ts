import { Song } from "@/entities/song";
import request from "@/lib/axios";

export const getSharedSongs = async (): Promise<Song[]> => {
  const response = await request.get("/songs/shared");

  return response.data;
};

export const getUserSongs = async (userId: string): Promise<Song[]> => {
  const response = await request.get(`/songs/user/${userId}`);

  return response.data;
};

export const getSongById = async (id: string): Promise<Song | null> => {
  if (!id) {
    throw new Error("Song ID is required");
  }
  try {
    const response = await request.get<null, Song>(`/songs/${id}`);

    try {
      response.chordPositions = JSON.parse(response.chords);
    } catch (e) {
      console.error("Error parsing chords", e);
    }

    return response;
  } catch (e) {
    console.error("Error fetching song by ID", e);
    return null;
  }
};

export const modifySong = async (
  id: string,
  requestData: Song & { userId?: string }
) => await request.patch<null, Song>(`/songs/${id}`, requestData);

export const createSong = async (requestData: Song) =>
  await request.post<null, Song>(`/songs`, requestData);

export const deleteSong = async (id: string) =>
  await request.delete<null, Song>(`/songs/${id}`);
