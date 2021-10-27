import { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardText, CardTitle, FormGroup, Input, Label } from "reactstrap";
import { INote, notesActionTypes } from "../../types/notes";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import cl from './noteCard.module.scss'

interface INoteCardProps {
    element: INote
}

const NoteCard: FC<INoteCardProps> = ({element}) => {
    const dispatch=useDispatch()   

    const deleteNote = () => {        
        dispatch({type: notesActionTypes.REMOVE_NOTE, payload:element.id})
    }
    
    const toggleCompleted = () => {
        dispatch({type: notesActionTypes.UPDATE_NOTE, payload: {...element, isCompleted:!element.isCompleted}})  
    }

    const submitHandler = (note: INote) => {
        dispatch({type: notesActionTypes.UPDATE_NOTE, payload: note})
    }


    return (
        <Card body inverse color={ 
            element.isItToDo 
                ? element.isCompleted
                    ?   'success'
                    :   'danger'
                 : 'info'}> 
            <CardBody className={cl.CardBody}>
                <div className={cl.card__innerWrapper}>
                    {
                        element.isItToDo
                            ?   <div className={cl.card__toDoCheckbox}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" checked={element.isCompleted} onChange={toggleCompleted} />{' '}
                                            Mark as completed
                                        </Label>
                                    </FormGroup>
                                </div>
                            : null 
                    }
                    <div className={element.isCompleted ? [cl.card__contentBlock, cl.card__contentBlock_lineThrough].join(' ') : cl.card__contentBlock}>
                        <CardTitle tag="h2">{element.title}</CardTitle>
                        <CardText>{element.description}</CardText>
                    </div>
                    <div className={cl.card__buttonsBlock}>
                        <Button onClick={deleteNote}>Delete note</Button>
                        <AddNoteModal defaultNote={element} submitHandler={submitHandler} buttonLabel="Edit note" buttonColor="warning" /> 
                    </div>
                </div>
            </CardBody>                          
        </Card> 
    ); 
};

export default NoteCard;