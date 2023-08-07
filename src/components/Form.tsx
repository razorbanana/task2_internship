import { MouseEventHandler } from "react"
import { Note } from "../service/types"

//елемент форма
const Form: React.FC<{ formData: Note, visibility: boolean, handleCloseForm: MouseEventHandler<HTMLInputElement>, handleChangeForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, handleSubmitForm: MouseEventHandler<HTMLInputElement> }> = ({ formData, visibility, handleCloseForm, handleChangeForm, handleSubmitForm }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 hidden flex justify-center items-center transition-opacity duration-300" style={{ display: visibility ? 'flex' : 'none' }}>
            <form className="bg-gray-200 p-4 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChangeForm}
                        required
                        className="mt-1 p-2 border rounded-lg w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChangeForm}
                        required
                        className="mt-1 p-2 border rounded-lg w-full"
                    >
                        <option value="Task">Task</option>
                        <option value="Random Thought">Random Thought</option>
                        <option value="Idea">Idea</option>
                        <option value="Quote">Quote</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        rows={5}
                        cols={40}
                        onChange={handleChangeForm}
                        required
                        className="mt-1 p-2 border rounded-lg w-full"
                    />
                </div>

                <div className="flex space-x-4">
                    <input
                        type="submit"
                        value="Submit"
                        id="submitButton"
                        className="commonBtn border rounded-md cursor-pointer p-2"
                        onClick={handleSubmitForm}
                    />
                    <input
                        type="submit"
                        value="Cancel"
                        id="cancelButton"
                        className="commonBtn border rounded-md cursor-pointer p-2"
                        onClick={handleCloseForm}
                    />
                </div>
            </form>
        </div>
    )
}

export default Form