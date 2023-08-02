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
  const [chosenCategory, setChosenCategory] = useState<string>('')
  const [activeNotesChosenContent, setActiveNotesChosenContent] = useState<string>('Click content cell to read it!')
  const [archivedNotesChosenContent, setArchivedNotesChosenContent] = useState<string>('Click content cell of archived notes to read it!')

  const allNotes = useSelector((state: Note[]) => state)
  const activeNotes = allNotes.filter(note => !note.isArchieved);
  const chosenCategoryArchivedNotes = allNotes.filter(note => note.isArchieved && note.category === chosenCategory)

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

  const openEditForm = (id: number): React.MouseEventHandler<HTMLButtonElement> => (event) => {
    event.preventDefault()
    setActiveNotesChosenContent('Click content cell to read it!')
    const createNoteForm = document.querySelector('#editNoteForm') as HTMLFormElement;
    if (createNoteForm) {
      if (allNotes.find(note => note.id === id)) {
        setFormData(allNotes.find(note => note.id === id) as Note)
        createNoteForm.style.display = 'flex'
      }
    }
  }

  const handleCloseEditForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    const createNoteForm = document.querySelector('#editNoteForm') as HTMLFormElement;
    if (createNoteForm) {

      createNoteForm.style.display = 'none'
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
    }
  }

  const handleChangeEditForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitEditForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const newNote = {
      ...formData,
      created: formatDate(new Date())
    };

    console.log(newNote)
    dispatch({ type: 'EDIT_NOTE', payload: newNote });
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
    const editNoteForm = document.querySelector('#editNoteForm') as HTMLFormElement;
    if (editNoteForm) {
      editNoteForm.style.display = 'none'
    }

  };

  const archiveEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      setActiveNotesChosenContent('Click content cell to read it!')
      dispatch({ type: 'TOGGLE_ARCHIVE', payload: id } as ActionType);
    }
  }

  const unarchiveEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      setArchivedNotesChosenContent('Click content cell of archived notes to read it!')
      dispatch({ type: 'TOGGLE_ARCHIVE', payload: id } as ActionType);
    }
  }

  const deleteEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      setActiveNotesChosenContent('Click content cell to read it!')
      dispatch({ type: 'DELETE_NOTE', payload: id } as ActionType);
    }
  }

  const activeNotesContentEventListener = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
    event.preventDefault()
    const chosenContent = activeNotes.find(note => note.id === id)
    setActiveNotesChosenContent(chosenContent ? chosenContent.content : 'Click content cell to read it!')
  }

  const statsContentListener = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
    event.preventDefault()
    setArchivedNotesChosenContent('Click content cell of archived notes to read it!')
    setChosenCategory(String(id))
  }

  const archivedNotesContentEventListener = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
    event.preventDefault()
    const chosenContent = chosenCategoryArchivedNotes.find(note => note.id === id)
    setArchivedNotesChosenContent(chosenContent ? chosenContent.content : 'Click content cell of archived notes to read it!')
  }

  return (
    <>
      <div id="bodyDiv">
        <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={activeNotes} contentEventListener={activeNotesContentEventListener} buttons={[{ button: 'edit', eventHandler: openEditForm }, { button: 'archive', eventHandler: archiveEventHandler }, { button: 'delete', eventHandler: deleteEventHandler },]}></Table>
        <div className="chosenDiv">{activeNotes.length ===0?'Add new note or unarchive old':activeNotesChosenContent}</div>
        <button id="createButton" className="commonBtn" onClick={openCreateForm}>Create note</button>
        <Table headers={['', 'Category', 'Active', 'Archived']} data={summarizeCategories(allNotes)} contentEventListener={statsContentListener} buttons={[]}></Table>
        <div className="chosenDiv">{chosenCategory === ''?'Click category to read archived notes':`Chosen category is ${chosenCategory}`}</div>
        <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={chosenCategoryArchivedNotes} contentEventListener={archivedNotesContentEventListener} buttons={[{ button: 'unarchive', eventHandler: unarchiveEventHandler }]}></Table>
        <div className="chosenDiv">{chosenCategoryArchivedNotes.length ===0?'Choose another category':archivedNotesChosenContent}</div>
        <Form formData={formData} identifier={'createNoteForm'} handleCloseForm={handleCloseCreateForm} handleChangeForm={handleChangeCreateForm} handleSubmitForm={handleSubmitCreateForm}></Form>
        <Form formData={formData} identifier={'editNoteForm'} handleCloseForm={handleCloseEditForm} handleChangeForm={handleChangeEditForm} handleSubmitForm={handleSubmitEditForm}></Form>
      </div>
    </>
  );
}

export default App;
