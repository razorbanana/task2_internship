interface Note {
    id: number, 
    name: string, 
    created: string, 
    category: string, 
    content: string, 
    isArchieved: boolean
}

interface StatsObject {
    id: string,
    category: string,
    active: number,
    archieved: number
}

interface TableButtonType {
    button: string,
    eventHandler: (id: number) => React.MouseEventHandler<HTMLSpanElement>
}

type ActionType =
    | { type: 'NEW_NOTE'; payload: Note }
    | { type: 'TOGGLE_ARCHIVE'; payload: number }
    | { type: 'DELETE_NOTE'; payload: number }
    | { type: 'EDIT_NOTE'; payload: Note };

export type {Note, ActionType, StatsObject,TableButtonType}