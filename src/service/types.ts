interface Note {
    id: number; name: string; created: string; category: string; content: string; isArchieved: boolean;
}

interface StatsObject {
    category: string,
    active: number,
    archieved: number
}

type ActionType =
    | { type: 'NEW_NOTE'; payload: Note }
    | { type: 'TOGGLE_ARCHIVE'; payload: number }
    | { type: 'DELETE_NOTE'; payload: number }
    | { type: 'EDIT_NOTE'; payload: Note };

export type {Note, ActionType, StatsObject}