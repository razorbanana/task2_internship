import { Note, TableButtonType, TableData } from "../service/types"
import getIcon from "../helper/icons"
import { extractDates } from "../helper/functionHelper"

//таблиця
const Table: React.FC<{ headers: String[], data: TableData[], buttons: TableButtonType[], contentEventHandler: (id: number|string) => React.MouseEventHandler<HTMLTableCellElement> }> = ({ headers, data, buttons, contentEventHandler }) => {
    if(data.length === 0){
        return (<div className="m-5 text-2xl p-1">
            There is no suitable data!
        </div>)
    }
    return (
        <>
            <table id="notArchivedNotes" className="notesTable border-collapse w-full mb-5 mt-5">
                <tbody>
                    <TableHeaders headers={headers} buttons={buttons} ></TableHeaders>
                    {data.map(x => <TableRow key={x.id} data={x} buttons={buttons} contentEventHandler={contentEventHandler}></TableRow>)}
                </tbody>
            </table>
        </>
    )
}

//заголовки таблиці
const TableHeaders: React.FC<{ headers: String[], buttons: TableButtonType[] }> = ({ headers, buttons }) => {
    return (
        <tr>
            {headers.map((header, index) => <TableHeadersColumn key={index} header={header}></TableHeadersColumn>)}
            {buttons.map((button, index) => <TableHeaderButton key={index} button={button}></TableHeaderButton>)}
        </tr>
    )
}

//Заголовки таблиці
const TableHeadersColumn: React.FC<{ header: String }> = ({ header }) => {
    return (
        <th className="bg-gray-800 text-white font-bold text-center py-2">{header}</th>
    )
}

//перевірка типу
function isNote(data: TableData): data is Note {
    return (data as Note).created !== undefined; 
}

//рядки з даними таблиці
const TableRow: React.FC<{ data: TableData, buttons: TableButtonType[], contentEventHandler: (id: number|string) => React.MouseEventHandler<HTMLTableCellElement> }> = ({ data, buttons, contentEventHandler }) => {
    if (isNote(data)) {
        return (<tr>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4"><div className="bg-gray-700 rounded-full h-10 w-10 justify-center items-center flex text-white"><span className="material-symbols-outlined">{getIcon(data.category)}</span></div></td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{data.name}</td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{data.created}</td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{data.category}</td>
            <td className="hover:cursor-pointer bg-gray-200 border-t-8 border-white text-center py-2 px-4" onClick={contentEventHandler(data.id)}>{data.content.length > 13 ? data.content.slice(0, 13) + '...' : data.content.slice(0, data.content.length)}</td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{extractDates(data.content)}</td>
            {buttons.map((button, index) => <TableButton noteId={data.id}key={index} button={button}></TableButton>)}
        </tr>)
    } else {
        return (
        <tr>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4"><div className="bg-gray-700 rounded-full h-10 w-10 justify-center items-center flex text-white"><span className="material-symbols-outlined">{getIcon(data.category)}</span></div></td>
            <td className="hover:cursor-pointer bg-gray-200 border-t-8 border-white text-center py-2 px-4"  onClick={contentEventHandler(data.category)}>{data.category}</td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{data.active || 0}</td>
            <td className="bg-gray-200 border-t-8 border-white text-center py-2 px-4">{data.archieved || 0}</td>
            </tr>)
    }
}

//іконки з заголовків таблиці
const TableHeaderButton: React.FC<{ button: TableButtonType }> = ({ button }) => {
    return (
        <th className="bg-gray-800 text-white font-bold text-center py-2" ><span className="material-symbols-outlined">
            {button.button}
        </span></th>
    )
}

//кнопки з рядків таблиці
const TableButton: React.FC<{ button: TableButtonType, noteId: number }> = ({ button, noteId }) => {
    return (
        <td  className="bg-gray-200 border-t-8 border-white text-center py-2"><span className="material-symbols-outlined buttonSpan hover:bg-gray-700 hover:text-white rounded-md cursor-pointer p-2" onClick={button.eventHandler(noteId)}>
            {button.button}
        </span></td>
    )
}

export default Table