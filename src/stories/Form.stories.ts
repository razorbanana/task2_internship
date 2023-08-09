import type { Meta, StoryObj } from '@storybook/react';

import Form from '../components/Form';

import "../index.css"

const initialState = {
    id: 7,
    name: 'note7',
    created: 'April 21, 2021',
    category: 'Quote',
    content: 'This is a new quote note.',
    isArchieved: false
}

const meta: Meta<typeof Form> = {
    title: "App/Form",
    component: Form,
    tags: ["autodocs"],
    parameters: {
        layout: 'fullscreen', // This can be 'fullscreen', 'padded', or 'centered'
    },
}

export default meta

export const DefaultForm: StoryObj<typeof Form> = {
    args: {
        formData: initialState,
        visibility: true
    }
}
