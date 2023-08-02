//тип для нотатки
interface Note {
    id: number,
    name: string,
    created: string,
    category: string,
    content: string,
    isArchieved: boolean
}

//тип для статистики по категоріях
interface StatsObject {
    id: string,
    category: string,
    active: number,
    archieved: number
}

//тип кнопки в таблиці
interface TableButtonType {
    button: string,
    eventHandler: (id: number) => React.MouseEventHandler<HTMLSpanElement>
}

//тип стану інтерфейсу, потрібен для форм та виведення контенту нотаток
interface UIState {
    formData: Note;
    chosenCategory: string;
    activeNotesChosenContent: string;
    archivedNotesChosenContent: string;
    isCreateVisible: boolean;
    isEditVisible: boolean;
}

//тип даних поданих для побудови таблиці
type TableData = Note | StatsObject

export type { Note, StatsObject, TableButtonType, UIState, TableData }