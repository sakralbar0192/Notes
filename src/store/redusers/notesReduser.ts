import { INote, INotesAction, notesActionTypes } from "../../types/notes";
import { addUniqueId } from "../../utils";

const initialNotesState: INote[] = []
    
export const notesReduser = (state= initialNotesState, action: INotesAction): INote[] => {
    switch (action.type) {
        case notesActionTypes.GET_ALL_NOTES:
            const savedNotes = JSON.parse(action.payload) 
            return savedNotes
        case notesActionTypes.REMOVE_ALL_NOTES:
            localStorage.removeItem('notes')
            return []
        case notesActionTypes.ADD_NOTE: 
            const newNote = {...action.payload, id : addUniqueId(state)}
            const newNotes = [...state, newNote]            
            localStorage.setItem('notes', JSON.stringify(newNotes))
            return newNotes
        case notesActionTypes.REMOVE_NOTE:
            const notesWithoutRemoved:INote[] = state.filter(element=> element.id !== action.payload)
            localStorage.setItem('notes', JSON.stringify(notesWithoutRemoved))
            return notesWithoutRemoved
        case notesActionTypes.UPDATE_NOTE: 
            const updatingNote = {...action.payload}
            const updatingNoteIndex = state.findIndex((note => note.id===updatingNote.id))  
            const updatedNotes = [...state]
            updatedNotes[updatingNoteIndex] = updatingNote
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
           return updatedNotes       
        default: 
            return state
    }
}