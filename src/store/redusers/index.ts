import { combineReducers } from "redux";
import { notesReduser } from "./notesReduser";

export const rootReduser = combineReducers({
    notes: notesReduser,
})

export type RootState = ReturnType<typeof rootReduser>