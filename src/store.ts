import create from 'zustand';
import { GreatPerson } from './types';

interface UserIdState {
  userId: number;
  setUserId: (id: number) => void;
}

export const useUserIdStore = create<UserIdState>((set) => ({
  userId: 0,
  setUserId: (id: number) => set(() => ({ userId: id })),
}));

interface GreatPersonState {
  greatId: number;
  name: string;
  silhouette_url: string;
  photo_url: string;
  saying: string;
  puzzle_cnt: number;
  video_url: string;
  life: string;
  setLife: (life: string) => void;
  setVideo_url: (url: string) => void;
  setGreat: (great: GreatPerson) => void;
}

export const useGreatPersonStore = create<GreatPersonState>((set) => ({
  greatId: 0,
  name: '',
  silhouette_url: '',
  photo_url: '',
  saying: '',
  puzzle_cnt: 0,
  video_url: '',
  life: '',
  setLife: (life: string) =>
    set(() => ({
      life: life,
    })),
  setVideo_url: (url: string) =>
    set(() => ({
      video_url: url,
    })),
  setGreat: (great: GreatPerson) =>
    set(() => ({
      greatId: great.greatId,
      name: great.name,
      silhouette_url: great.silhouette_url,
      photo_url: great.photo_url,
      saying: great.saying,
      puzzle_cnt: great.puzzle_cnt,
    })),
}));

interface VideoModalState {
  showVideoModal: boolean;
  setShowVideoModal: (show: boolean) => void;
}

export const useVideoModalStore = create<VideoModalState>((set) => ({
  showVideoModal: false,
  setShowVideoModal: (show: boolean) =>
    set(() => ({
      showVideoModal: show,
    })),
}));
