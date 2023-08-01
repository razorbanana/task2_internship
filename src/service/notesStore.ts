import { configureStore } from "@reduxjs/toolkit";
import { Note, ActionType } from "./types";

const initialState = [
    {
        id: 1,
        name: 'note1',
        created: 'April 20, 2021',
        category: 'Quote',
        content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        isArchieved: false
    },
    {
        id: 2,
        name: 'note2',
        created: 'April 20, 2021',
        category: 'Idea',
        content: 'April 20, 2021 and April 21, 2021',
        isArchieved: false
    },
    {
        id: 3,
        name: 'note3',
        created: 'April 20, 2021',
        category: 'Idea',
        content: 'content3',
        isArchieved: true
    },
    {
        id: 4,
        name: 'note4',
        created: 'April 20, 2021',
        category: 'Task',
        content: 'content4',
        isArchieved: false
    },
    {
        id: 5,
        name: 'note5',
        created: 'April 20, 2021',
        category: 'Task',
        content: 'content5',
        isArchieved: true
    },
    {
        id: 6,
        name: 'note6',
        created: 'April 20, 2021',
        category: 'Random Thought',
        content: 'content6',
        isArchieved: false
    },
    {
        id: 7,
        name: 'note7',
        created: 'April 21, 2021',
        category: 'Quote',
        content: 'This is a new quote note.',
        isArchieved: false
    },
    {
        id: 8,
        name: 'note8',
        created: 'April 21, 2021',
        category: 'Idea',
        content: 'This is a new idea note.',
        isArchieved: false
    },
    {
        id: 9,
        name: 'note9',
        created: 'April 21, 2021',
        category: 'Task',
        content: 'This is a new task note.',
        isArchieved: true
    },
    {
        id: 10,
        name: 'note10',
        created: 'April 21, 2021',
        category: 'Random Thought',
        content: 'This is a new random thought note.',
        isArchieved: false
    },
    {
        id: 11,
        name: 'note11',
        created: 'April 22, 2021',
        category: 'Task',
        content: 'This is another task note.',
        isArchieved: false
    }
];



const noteReducer = (state: Note[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.payload]
        case 'TOGGLE_ARCHIVE': {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            if (noteToChange) {
                const changedNote = {
                    ...noteToChange,
                    isArchieved: !noteToChange.isArchieved
                }
                return state.map(note =>
                    note.id !== id ? note : changedNote
                )
            } else {
                return state
            }
        }
        case 'DELETE_NOTE':
            return state.filter(note => note.id !== action.payload)
        default:
            return state
    }
}

const store = configureStore({
    reducer: noteReducer,
});

export default store