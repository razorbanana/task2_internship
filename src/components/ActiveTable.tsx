import { Note } from "../service/types"
import getIcon from "../helper/icons"

const ActiveTable: React.FC<{ notes: Note[] }> = ({ notes }) => {
    return (
        <>
            <table id="notArchivedNotes" className="notesTable">
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Dates</th>
                        <th><span className="material-symbols-outlined">
                            edit
                        </span></th>
                        <th><span className="material-symbols-outlined">
                            archive
                        </span></th>
                        <th><span className="material-symbols-outlined">
                            delete
                        </span></th>
                    </tr>
                    {notes.map(note => <ActiveTableRow key={note.id} note={note} ></ActiveTableRow>)}
                </tbody>
            </table>
        </>
    )
}

const ActiveTableRow: React.FC<{ note: Note }> = ({ note }) => {
    return (
        <tr>
            <td><div className="circled-icons"><span className="material-symbols-outlined">{getIcon(note.category)}</span></div></td>
            <td>{note.name}</td>
            <td>{note.created}</td>
            <td>{note.category}</td>
            <td>{note.content.length > 13 ? note.content.slice(0, 13) + '...' : note.content.slice(0, note.content.length)}</td>
            <td>Dates</td>
            <td><span className="material-symbols-outlined">
                edit
            </span></td>
            <td><span className="material-symbols-outlined">
                archive
            </span></td>
            <td><span className="material-symbols-outlined">
                delete
            </span></td>
        </tr>
    )
}

export default ActiveTable