import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType, Note } from './service/types';
import { formatDate, generateId, summarizeCategories } from './helper/functionHelper';
import { useState } from 'react';

function App() {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Note>({
    id: 0,
    name: '',
    category: 'Task',
    created: '',
    content: '',
    isArchieved: false,
  });

  const activeNotes = useSelector((state: Note[]) => state.filter(note => !note.isArchieved));
  const allNotes = useSelector((state: Note[]) => state)
  // const chosenCategoryArchivedNotes = useSelector((state: Note[]) => state.filter(note => note.isArchieved && note.category === ''))

  const openCreateForm: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const createNoteForm = document.querySelector('#createNoteForm') as HTMLFormElement;
    if (createNoteForm) {
      createNoteForm.style.display = 'flex'
    }
  }

  const handleCloseCreateForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    const createNoteForm = document.querySelector('#createNoteForm') as HTMLFormElement;
    if (createNoteForm) {
      createNoteForm.style.display = 'none'
    }
  }

  const handleChangeCreateForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitCreateForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    // You can add validation logic here before dispatching the action
    const newNote = {
      ...formData,
      created: formatDate(new Date()),
      id: generateId(allNotes)
    };

    console.log(newNote)
    dispatch({ type: 'NEW_NOTE', payload: newNote });
    setFormData(
      {
        id: 0,
        name: '',
        category: 'Task',
        created: '',
        content: '',
        isArchieved: false,
      }
    )
    const createNoteForm = document.querySelector('#createNoteForm') as HTMLFormElement;
    if (createNoteForm) {
      createNoteForm.style.display = 'none'
    }
  };


  const spanEventHandler = (id:number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
    }
  }

  const archiveEventHandler = (id:number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch({ type: 'TOGGLE_ARCHIVE', payload: id } as ActionType);
    }
  }

  const deleteEventHandler = (id:number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch({ type: 'DELETE_NOTE', payload: id } as ActionType);
    }
  }

  return (
    <>
      <div id="bodyDiv">
        <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={activeNotes} buttons={[{ button: 'edit', eventHandler: spanEventHandler }, { button: 'archive', eventHandler: archiveEventHandler }, { button: 'delete', eventHandler: deleteEventHandler },]}></Table>
        <button id="createButton" className="commonBtn" onClick={openCreateForm}>Create note</button>
        <Table headers={['', 'Category', 'Active', 'Archived']} data={summarizeCategories(allNotes)} buttons={[]}></Table>
        {/* <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={chosenCategoryArchivedNotes} buttons={['unarchive']}></Table> */}
        <Form formData={formData} identifier={'createNoteForm'} handleCloseCreateForm={handleCloseCreateForm} handleChangeCreateForm={handleChangeCreateForm} handleSubmitCreateForm={handleSubmitCreateForm}></Form>
        <Form formData={formData} identifier={'createNoteForm'} handleCloseCreateForm={handleCloseCreateForm} handleChangeCreateForm={handleChangeCreateForm} handleSubmitCreateForm={handleSubmitCreateForm}></Form>
      </div>
    </>
  );
}

export default App;
