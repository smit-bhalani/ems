import { create } from "zustand";
import { persist } from "zustand/middleware";
import { holidays } from "../mock_data/holidays";

const adminStore = create(
    persist(
        (set) => ({
            holidays: holidays,

            addHoliday: ({ key, reason }) =>
                set((state) => ({
                    holidays: {
                        ...state.holidays,
                        [key]: reason,
                    },
                })),

            removeHoliday: (key) =>
                set((state) => {
                    const updated = { ...state.holidays };
                    delete updated[key];
                    return { holidays: updated };
                }),
        })
        ,
        {
            name: "ems-admin-store"
        })
)

export default adminStore;