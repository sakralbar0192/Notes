import React, { FC, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { INote } from '../../types/notes';
import { addUniqueId, checkNoteTitleUniqueness } from '../../utils';

interface IAddnoteModalProps {
    defaultNote?:INote
    submitHandler: (note:INote)=>void
    buttonLabel:string
    buttonColor:string
}

const AddNoteModal:FC<IAddnoteModalProps> = ({defaultNote, submitHandler, buttonLabel, buttonColor}) => {
    
    const notes = useTypedSelector(state=> state.notes) 
    const emptyNote: INote = {
        id: addUniqueId(notes),
        title: '',
        description: '',
        isItToDo: false,
        isCompleted: false
    }
        
    const [modal, setModal]= useState<boolean>(false)
    const [note, setNote] = useState<INote>(defaultNote===undefined ?emptyNote :defaultNote)

    enum inputNames{
        noteTitle = "noteTitle",
        noteDescription="noteDescription",
        noteIsToDoCheckbox="noteIsToDoCheckbox"
    }

    const toggleModal = () => {
        setNote(defaultNote===undefined ?emptyNote :defaultNote) 
        setModal(!modal)      
    }

    const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        switch (target.name) {
            case inputNames.noteIsToDoCheckbox:
                setNote({...note,isItToDo:!note.isItToDo})
                break
            case inputNames.noteDescription:
                setNote({...note, description: target.value})
                break
            case inputNames.noteTitle:
                setNote({...note, title: target.value})
                const isTitleUnique = checkNoteTitleUniqueness(notes, target.value)
                if (isTitleUnique) {
                    target.setCustomValidity('A note with this title already exists')
                }else{
                    target.setCustomValidity('')
                }
                target.reportValidity()     
                break
        }             
    }   

    const AddNoteButtonClickHandler = (e:React.FormEvent<HTMLFormElement>) => {   
        e.preventDefault()  
        submitHandler(note)
        toggleModal()
    }

    return (
        <div>
            <Button color={buttonColor} onClick={toggleModal}>{buttonLabel}</Button>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add new note</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={AddNoteButtonClickHandler}>
                            <FormGroup>
                                <Label for="note-title">Enter note title</Label>
                                <Input type="text" name={inputNames.noteTitle} id="note-title" placeholder="title..." required value={note.title} onChange={inputChangeHandler} /> 
                            </FormGroup>
                            <FormGroup>
                                <Label for="note-description">Enter note title</Label>
                                <Input type="textarea" name={inputNames.noteDescription} id="note-description" placeholder="description..." value={note.description} onChange={inputChangeHandler} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name={inputNames.noteIsToDoCheckbox} checked={note.isItToDo} onChange={inputChangeHandler} />{' '}
                                    Mark as to do 
                                </Label>
                            </FormGroup>
                            <Button color="primary" type="submit">Add note</Button>{' '}
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
        </div>
    );
};

export default AddNoteModal;