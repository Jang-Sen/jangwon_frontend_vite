import {StateCreator} from "zustand/vanilla";
import {persist} from "zustand/middleware";
import {create} from "zustand";

interface User {
    accessToken: string,
}

interface UserState {
    user: User | null;
    setCredentials: (user: User) => void;
    removeCredentials: () => void;
}

const userStoreSlice: StateCreator<UserState> = (set) => ({
    user: null,
    setCredentials: user => set({user}),
    removeCredentials: () => set({user: null}),
});

const persistedUserStore = persist<UserState>(userStoreSlice, {
    name: 'user',
});

export const useUserStore = create(persistedUserStore);