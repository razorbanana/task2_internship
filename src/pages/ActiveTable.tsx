import { useDispatch, useSelector } from "react-redux";
import { Note, UIState } from "../service/types";
import { setActiveNotesChosenContent, setFormData, setIsCreateVisible, setIsEditVisible } from "../service/uiStateSlice";
import { deleteNote, toggleArchive } from "../service/notesSlice";
import Table from "../components/Table";

//таблиця для активних нотаток
const ActiveTable: React.FC = () => {
  const dispatch = useDispatch();

  //стан контенту вибраного серед активних нотаток
  const {
    activeNotesChosenContent,
  } = useSelector((state: { ui: UIState }) => state.ui);

  //всі нотатки і активні нотатки
  const allNotes = useSelector((state: { notes: Note[] }) => state.notes)
  const activeNotes = allNotes.filter(note => !note.isArchieved);

  //івент хендлер для нажимання по контенту нотатки
  const activeNotesContentEventHandler = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
    event.preventDefault()
    const chosenContent = activeNotes.find(note => note.id === id)
    dispatch(setActiveNotesChosenContent(chosenContent ? chosenContent.content : 'Click content cell to read it!'))
  }

  //івент хендлер для нажимання по кнопці створення нотатки
  const openCreateForm: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    dispatch(setIsCreateVisible(true))
  }

  //івент хендлер для нажимання по кнопці редагування нотатки
  const openEditForm = (id: number): React.MouseEventHandler<HTMLButtonElement> => (event) => {
    event.preventDefault()
    dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
    if (activeNotes.find(note => note.id === id)) {
      dispatch(setFormData(activeNotes.find(note => note.id === id) as Note))
    }
    dispatch(setIsEditVisible(true))
  }

  //івент хендлер для нажимання по кнопці архівації нотатки
  const archiveEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
      dispatch(toggleArchive(id));
    }
  }

  //івент хендлер для нажимання по кнопці видалення нотатки
  const deleteEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
      dispatch(deleteNote(id));
    }
  }

  return (
    <div>
      <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={activeNotes} contentEventHandler={activeNotesContentEventHandler} buttons={[{ button: 'edit', eventHandler: openEditForm }, { button: 'archive', eventHandler: archiveEventHandler }, { button: 'delete', eventHandler: deleteEventHandler }]}></Table>
      <div className="chosenDiv">{activeNotes.length === 0 ? 'Add new note or unarchive old' : activeNotesChosenContent}</div>
      <button id="createButton" className="commonBtn" onClick={openCreateForm}>Create note</button>
    </div>
  )
}

export default ActiveTable