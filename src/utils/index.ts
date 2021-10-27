import { INote } from "../types/notes";

export const addUniqueId = (array: {id: number}[]): number => {
    let uniqueId:number = array.length+1;
    for (let i=1; i<=array.length; i++) {
        const elementWithSameId = array.find(element=> {
            return element.id === i
        })
        if (elementWithSameId === undefined) {
            uniqueId = i
            break
        }
    }
    return uniqueId
}

export function checkNoteTitleUniqueness(notes:INote[], noteTitle:string):boolean {
    const sameNote = (notes.length !== 0) 
        ? notes.find(note=> {
            return note.title === noteTitle
        }) 
        : undefined;

    if (sameNote === undefined)  {
        return false
    } 
    return true
} 