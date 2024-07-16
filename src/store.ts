import create from 'zustand';

interface UserIdState {
  userId: number;
  setUserId: (id: number) => void;
}

export const useUserIdStore = create<UserIdState>((set) => ({
  userId: 0,
  setUserId: (id: number) => set(() => ({ userId: id })),
}));
