import create from "zustand";
import { persist } from "zustand/middleware";

type User = {
  login: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  url: string;
};
type GqlErr = {
  message: string;
  documentation_url: string;
  status: number;
  headers: {
    map: any;
  };
};
type MainUser = {
  user: User | null;
  error: GqlErr | null;
};
interface LocalState {
  localValues: {
    token?: string | null;
    theme: string | null;
    mainUser?: MainUser;
    ghaccess:string|null;
    isoauthing:boolean
  };
  updateTheme: (theme: string) => void;
  updateToken: (token: string | null) => void;
  updateGhAccess:(ghaccess:string|null)=>void;
  updateIsOauthing:(status:boolean)=>void
  updateMainUser: ({
    user,
    error,
  }: MainUser) => void;
}

export const useLocalStoreValues =
  create<LocalState>()(

      persist(
        (set) => ({
          localValues: {
            theme: null,
            token: null,
            mainUser: undefined,
            ghaccess:null,
            isoauthing:false
          },
  
          updateTheme: (theme) =>
            set((state) => ({
              localValues: {
                ...state?.localValues,
                theme,
              },
            })),
          updateToken: (token) =>
            set((state) => ({
              localValues: {
                ...state?.localValues,
                token,
              },
            })),
          updateMainUser: (user) =>
            set((state) => ({
              localValues: {
                ...state?.localValues,
                mainUser: user,
              },
            })),

            updateIsOauthing: (status) =>
            set((state) => ({
              localValues: {
                ...state?.localValues,
                isoauthing:status
              },
            })),

            updateGhAccess: (ghaccess) =>
            set((state) => ({
              localValues: {
                ...state?.localValues,
                ghaccess,
              },
            }),
        ),

        }),

        {
          name: "gittyhub",
         //storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
      )
    )
  
