import { useDispatch, useSelector } from "react-redux";
import { Note, UIState } from "../service/types";
import { setActiveNotesChosenContent, setFormData, setIsCreateVisible, setIsEditVisible } from "../service/uiStateSlice";
import { deleteNote, toggleArchive } from "../service/notesSlice";
import Table from "../components/Table";

//таблиця для активних нотаток
const ActiveTable: React.FC = () => {
  const dispatch = useDispatch();

  const {
    activeNotesChosenContent,
  } = useSelector((state: { ui: UIState }) => state.ui);

  const allNotes = useSelector((state: { notes: Note[] }) => state.notes)
  const activeNotes = allNotes.filter(note => !note.isArchieved);

  const activeNotesContentEventHandler = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
    event.preventDefault()
    const chosenContent = activeNotes.find(note => note.id === id)
    dispatch(setActiveNotesChosenContent(chosenContent ? chosenContent.content : 'Click content cell to read it!'))
  }

  const openCreateForm: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    window.scrollTo(0, 0);
    dispatch(setIsCreateVisible(true))
  }

  const openEditForm = (id: number): React.MouseEventHandler<HTMLButtonElement> => (event) => {
    event.preventDefault()
    window.scrollTo(0, 0);
    dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
    if (activeNotes.find(note => note.id === id)) {
      dispatch(setFormData(activeNotes.find(note => note.id === id) as Note))
    }
    dispatch(setIsEditVisible(true))
  }

  const archiveEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
      dispatch(toggleArchive(id));
    }
  }

  const deleteEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {
      dispatch(setActiveNotesChosenContent('Click content cell to read it!'))
      dispatch(deleteNote(id));
    }
  }

  return (
    <div>
      <Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={activeNotes} contentEventHandler={activeNotesContentEventHandler} buttons={[{ button: 'edit', eventHandler: openEditForm }, { button: 'archive', eventHandler: archiveEventHandler }, { button: 'delete', eventHandler: deleteEventHandler }]}></Table>
      <div className="m-5 text-2xl p-1">{activeNotes.length === 0 ? 'Add new note or unarchive old' : activeNotesChosenContent}</div>
      <button id="createButton"  className="mt-10 border cursor-pointer h-16 w-40 float-right text-lg font-semibold rounded-lg p-2 mb-5" onClick={openCreateForm}>Create note</button>
    </div>
  )
}

export default ActiveTable