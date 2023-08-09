import type { Meta, StoryObj } from '@storybook/react';

import Table from '../components/Table';

import "../index.css"
import { summarizeCategories } from '../helper/functionHelper';

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
    }
];

const meta: Meta<typeof Table> = {
    title: "App/Table",
    component: Table,
    tags: ["autodocs"]
}

export default meta

const eventHandler = (id: number): React.MouseEventHandler<HTMLSpanElement> => {
    return (event) => {

    }
}

const contentEventHandler = (id: number | string): React.MouseEventHandler<HTMLTableCellElement> => (event) => {

}

export const DefaultTable: StoryObj<typeof Table> = {
    args: {
        headers: ['', 'Name', 'Created', 'Category', 'Content', 'Dates'],
        data: initialState,
        buttons: [{ button: 'edit', eventHandler: eventHandler },
        { button: 'archive', eventHandler: eventHandler },
        { button: 'delete', eventHandler: eventHandler }],
        contentEventHandler: contentEventHandler
    }
}

export const StatsTable: StoryObj<typeof Table> = {
    args: {
        headers: ['', 'Category', 'Active', 'Archived'],
        data: summarizeCategories(initialState),
        buttons: [],
        contentEventHandler: contentEventHandler
    }
}
