import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import { summarizeCategories } from "../helper/functionHelper";
import { toggleArchive } from "../service/notesSlice";
import { setArchivedNotesChosenContent, setChosenCategory } from "../service/uiStateSlice";
import { Note, UIState } from "../service/types";

//таблиця з статистикою і таблиця з архівованими нотатками
const StatsTable: React.FC = () => {
    const dispatch = useDispatch();

    const {
        chosenCategory,
        archivedNotesChosenContent,
    } = useSelector((state: { ui: UIState }) => state.ui);

    const allNotes = useSelector((state: { notes: Note[] }) => state.notes)
    const chosenCategoryArchivedNotes = allNotes.filter(note => note.isArchieved && note.category === chosenCategory)

    const unarchiveEventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
        return (event) => {
            dispatch(setArchivedNotesChosenContent('Click content cell of archived notes to read it!'))
            dispatch(toggleArchive(id));
        }
    }

    const statsContentHandler = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
        event.preventDefault()
        dispatch(setArchivedNotesChosenContent('Click content cell of archived notes to read it!'))
        dispatch(setChosenCategory(String(id)))
    }

    const archivedNotesContentEventHandler = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {
        event.preventDefault()
        const chosenContent = chosenCategoryArchivedNotes.find(note => note.id === id)
        dispatch(setArchivedNotesChosenContent(chosenContent ? chosenContent.content : 'Click content cell of archived notes to read it!'))
    }

    if (allNotes.length === 0) {
        return (<></>)
    } else {
        return (<div>
            <Table headers={['', 'Category', 'Active', 'Archived']} data={summarizeCategories(allNotes)} contentEventHandler={statsContentHandler} buttons={[]}></Table>
            <div className="m-5 text-2xl p-1">{chosenCategory === '' ? 'Click category to read archived notes' : `Chosen category is ${chosenCategory}`}</div>
            {chosenCategory === '' ? '' : <><Table headers={['', 'Name', 'Created', 'Category', 'Content', 'Dates']} data={chosenCategoryArchivedNotes} contentEventHandler={archivedNotesContentEventHandler} buttons={[{ button: 'unarchive', eventHandler: unarchiveEventHandler }]}></Table>
                <div className="m-5 text-2xl p-1">{chosenCategoryArchivedNotes.length === 0 ? 'Choose another category' : archivedNotesChosenContent}</div></>}
        </div>)
    }
}

export default StatsTable