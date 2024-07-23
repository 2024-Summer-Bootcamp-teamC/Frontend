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
  nation: string;
  field: string;
  silhouette_url: string;
  front_url: string;
  back_url: string;
  saying_url: string;
  saying: string;
  puzzle_cnt: number;
  video_url: string;
  information_url: string;
  life: string;
  setLife: (life: string) => void;
  setInfo: (info: string) => void;
  setVideo_url: (url: string) => void;
  setGreat: (great: GreatPerson) => void;
}

export const useGreatPersonStore = create<GreatPersonState>((set) => ({
  greatId: 0,
  name: '',
  nation: '',
  field: '',
  silhouette_url: '',
  front_url: '',
  back_url: '',
  saying_url: '',
  saying: '',
  puzzle_cnt: 0,
  video_url: '',
  information_url: '',
  life: '',
  setInfo: (info: string) =>
    set(() => ({
      information_url: info,
    })),
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
      nation: great.nation,
      field: great.field,
      silhouette_url: great.silhouette_url,
      front_url: great.front_url,
      back_url: great.back_url,
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

interface TriggerChartState {
  count: number;
  setCount: () => void;
}

export const useTriggerChartStore = create<TriggerChartState>((set) => ({
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));
