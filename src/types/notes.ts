export enum notesActionTypes {
    ADD_NOTE='ADD_NOTE',
    REMOVE_NOTE='REMOVE_NOTE',
    UPDATE_NOTE='UPDATE_NOTE',
    GET_ALL_NOTES='GET_ALL_NOTES',
    REMOVE_ALL_NOTES='REMOVE_ALL_NOTES'
}

export interface INote {  
    id: number  
    title: string
    description?: string
    isItToDo: boolean   
    isCompleted: boolean 
}

interface IAddNoteAction {
    type: notesActionTypes.ADD_NOTE
    payload: INote
}

interface IRemoveNoteAction {
    type: notesActionTypes.REMOVE_NOTE
    payload: number
}

interface IUpdateeNoteAction {
    type: notesActionTypes.UPDATE_NOTE
    payload: INote
}

interface IRemoveAllNotesAction {
    type: notesActionTypes.REMOVE_ALL_NOTES
}

interface IGetAllNotesAction {
    type: notesActionTypes.GET_ALL_NOTES   
    payload: string 
}

export type INotesAction = IAddNoteAction | IRemoveNoteAction | IUpdateeNoteAction | IRemoveAllNotesAction | IGetAllNotesAction;