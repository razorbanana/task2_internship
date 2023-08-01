import { Note, StatsObject, TableButtonType } from "../service/types"
import getIcon from "../helper/icons"
import { extractDates } from "../helper/functionHelper"

type TableData = Note | StatsObject

const Table: React.FC<{ headers: String[], data: TableData[], buttons: TableButtonType[] }> = ({ headers, data, buttons }) => {
    if(data.length === 0){
        return (<>
        </>)
    }
    return (
        <>
            <table id="notArchivedNotes" className="notesTable">
                <tbody>
                    <TableHeaders headers={headers} buttons={buttons} ></TableHeaders>
                    {data.map(x => <TableRow key={x.id} data={x} buttons={buttons} ></TableRow>)}
                </tbody>
            </table>
        </>
    )
}

const TableHeaders: React.FC<{ headers: String[], buttons: TableButtonType[] }> = ({ headers, buttons }) => {
    return (
        <tr>
            {headers.map((header, index) => <TableHeadersColumn key={index} header={header}></TableHeadersColumn>)}
            {buttons.map((button, index) => <TableHeaderButton key={index} button={button}></TableHeaderButton>)}
        </tr>
    )
}

const TableHeadersColumn: React.FC<{ header: String }> = ({ header }) => {
    return (
        <th>{header}</th>
    )
}

function isNote(data: TableData): data is Note {
    return (data as Note).created !== undefined; // Replace 'created' with an appropriate property of Note
}

const TableRow: React.FC<{ data: TableData, buttons: TableButtonType[] }> = ({ data, buttons }) => {
    if (isNote(data)) {
        return (<tr>
            <td><div className="circled-icons"><span className="material-symbols-outlined">{getIcon(data.category)}</span></div></td>
            <td>{data.name}</td>
            <td>{data.created}</td>
            <td>{data.category}</td>
            <td className="contentDiv">{data.content.length > 13 ? data.content.slice(0, 13) + '...' : data.content.slice(0, data.content.length)}</td>
            <td>{extractDates(data.content)}</td>
            {buttons.map((button, index) => <TableButton noteId={data.id}key={index} button={button}></TableButton>)}
        </tr>)
    } else {
        return (
        <tr>
            <td><div className="circled-icons"><span className="material-symbols-outlined">{getIcon(data.category)}</span></div></td>
            <td className="contentDiv">{data.category}</td>
            <td>{data.active || 0}</td>
            <td>{data.archieved || 0}</td>
            </tr>)
    }
}

const TableHeaderButton: React.FC<{ button: TableButtonType }> = ({ button }) => {
    return (
        <th><span className="material-symbols-outlined buttonSpan">
            {button.button}
        </span></th>
    )
}

const TableButton: React.FC<{ button: TableButtonType, noteId: number }> = ({ button, noteId }) => {
    return (
        <td><span className="material-symbols-outlined buttonSpan" onClick={button.eventHandler(noteId)}>
            {button.button}
        </span></td>
    )
}

export default Table