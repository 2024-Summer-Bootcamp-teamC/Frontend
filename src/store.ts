import { create } from 'zustand';
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
  setPuzzleCount: (count: number) => void;
}

export const useGreatPersonStore = create<GreatPersonState>((set) => ({
  greatId: 0,
  name: '',
  nation: '',
  field: '',
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
      front_url: great.front_url,
      back_url: great.back_url,
      saying: great.saying,
      puzzle_cnt: great.puzzle_cnt,
      video_url: great.video_url,
      information_url: great.information_url,
      life: great.life,
    })),
  setPuzzleCount: (count: number) =>
    set(() => ({
      puzzle_cnt: count,
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

interface GreatListState {
  showGreatList: boolean;
  setShowGreatList: (show: boolean) => void;
}

export const useGreatListStore = create<GreatListState>((set) => ({
  showGreatList: false,
  setShowGreatList: (show: boolean) =>
    set(() => ({
      showGreatList: show,
    })),
}));

interface Params {
  nation?: string;
  field?: string;
}

interface ParamState {
  param: Params;
  field: boolean;
  setParam: (param: Params) => void;
  setField: (param: boolean) => void;
}

export const useParamStore = create<ParamState>((set) => ({
  param: {},
  field: true,
  setParam: (param: Params) =>
    set(() => ({
      param: param,
    })),
  setField: (param: boolean) =>
    set(() => ({
      field: param,
    })),
}));

interface Quiz {
  question: string;
  answer: string;
  explanation: string;
}

interface QuizState {
  quizzes: Quiz[];
  setQuizzes: (quizzes: Quiz[]) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizzes: [],
  setQuizzes: (quizzes: Quiz[]) =>
    set(() => ({
      quizzes: quizzes,
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

interface CardStore {
  leftCards: GreatPerson[];
  rightCards: GreatPerson[];
  setCards: (cards: GreatPerson[]) => void;
  resetCards: () => void;
}

export const useCardStore = create<CardStore>((set) => ({
  leftCards: [],
  rightCards: [],
  setCards: (cards: GreatPerson[]) => {
    const leftCards = cards.filter((_, index) => index % 4 < 2);
    const rightCards = cards.filter((_, index) => index % 4 >= 2);
    set({ leftCards, rightCards });
  },
  resetCards: () => set({ leftCards: [], rightCards: [] }),
}));

interface TriggerChatState {
  count: number;
  setCount: () => void;
}

export const useTriggerChatStore = create<TriggerChatState>((set) => ({
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));
