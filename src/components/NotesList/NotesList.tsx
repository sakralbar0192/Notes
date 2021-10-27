import { FC } from 'react';
import { INote } from '../../types/notes';
import NoteCard from '../NoteCard/NoteCard';

interface INoteListProps {
    elements: INote[]
}

const NotesList:FC<INoteListProps> = ({elements}) => {

    if (elements.length === 0) {
        return (
            <p style={{padding:"50px"}}>
                No any notes... 
            </p>
        )
    }

    return (
        <ul>
            {
            elements.map(note=> {
                return(
                <li key={note.id}>                   
                        <NoteCard 
                            element={note}  
                        />                 
                </li>
                )
            })
            }
        </ul>
    );
};

export default NotesList;