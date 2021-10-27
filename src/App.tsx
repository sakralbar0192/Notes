import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import cl from './app.module.scss'
import AddNoteModal from './components/AddNoteModal/AddNoteModal';
import NotesList from './components/NotesList/NotesList';
import SearchField from './components/SearchField/SearchField';
import { useTypedSelector } from './hooks/useTypedSelector';
import { INote, notesActionTypes } from './types/notes';

function App() {
  const notes = useTypedSelector(state=> state.notes)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchedNotes, setSearchedNotes] = useState<INote[]>(notes)
  
  const dispatch = useDispatch()

  useEffect(()=> {    
      const savedStringifiedNotes = localStorage.getItem('notes')
      if (savedStringifiedNotes !== null) {
        dispatch({type: notesActionTypes.GET_ALL_NOTES, payload: savedStringifiedNotes})               
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useMemo(()=> {  
      if (searchQuery!=='') {
          const searchedElements:INote[] = notes.filter(note => {
              return note.title.toLowerCase().includes(searchQuery)
          })            
          setSearchedNotes(searchedElements)
      }else {
        setSearchedNotes(notes)
      }                           
    
},[searchQuery,notes])
  

  const addNote = (note:INote) => {
    dispatch({type: notesActionTypes.ADD_NOTE, payload: note})
}

  const DeleteAll = ()=> {
    dispatch({type: notesActionTypes.REMOVE_ALL_NOTES})
  }
    
  return (
    <div className={cl.app}>
      <h1>Welcome to notes app!</h1>
      <AddNoteModal submitHandler={addNote} buttonLabel="+ Add note" buttonColor="danger" />   
      <SearchField
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />
      <NotesList elements={searchedNotes} /> 
      <Button color="warning" onClick={DeleteAll}>Delete All Notes</Button>
      <p style={{display:"flex", flexDirection:"column", alignItems:"center", width:"800px", margin:"20px", textAlign:"center"}}><span style={{color:"red"}}>Attention!</span> <br/> This is a test project and it uses your browser's local storage to save data. Don't forget to click the <strong>Delete All Notes</strong>  button before shutting down</p>
    </div> 
  );
}

export default App;
