import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            role: null,

            login: (userData) =>
                set({
                    isAuthenticated: true,
                    user: userData,
                    role: userData.role,
                }),

            logout: () =>
                set({
                    isAuthenticated: false,
                    user: null,
                    role: null,
                }),
        }),
        {
            name: "ems-auth",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                role: state.role,
            }),
        })
)



create(
    persist((set) => ({
        isAuthenticated: true,
        user: null,
        role: "admin",
        roles: ["admin", "team-lead", "employee"],

        login: (userData) =>
            set(() => ({
                isAuthenticated: true,
                user: userData.username,
                role: userData.role,
            })),
        logout: () =>
            set(() => ({
                isAuthenticated: false,
                user: null,
                role: null,
            })),
    })), {},
    {
        partialize: (state) => ({
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            role: state.role,
        }),

    }
)

export default authStore;