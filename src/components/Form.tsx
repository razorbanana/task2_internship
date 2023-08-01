import { MouseEventHandler } from "react"
import { Note } from "../service/types"

const Form:React.FC<{formData:Note, identifier:string, handleCloseCreateForm: MouseEventHandler<HTMLInputElement>, handleChangeCreateForm:React.ChangeEventHandler<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>, handleSubmitCreateForm: MouseEventHandler<HTMLInputElement>}> = ({formData,identifier,handleCloseCreateForm,handleChangeCreateForm, handleSubmitCreateForm}) => {
    return (
        <div className="formDiv" id={identifier}>
        <form className="noteForm">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChangeCreateForm} required/><br /><br />

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={formData.category} onChange={handleChangeCreateForm} required>
                <option value="Task">Task</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Idea">Idea</option>
                <option value="Quote">Quote</option>
            </select><br /><br />

            <label htmlFor="content">Content:</label><br />
            <textarea id="content" name="content" value={formData.content} rows={5} cols={40} onChange={handleChangeCreateForm} required></textarea><br /><br />

            <input type="submit" value="Submit" id="submitButton" className="commonBtn" onClick={handleSubmitCreateForm}/>
            <input type="submit" value="Cancel" id="cancelButton" className="commonBtn" onClick={handleCloseCreateForm}/>
        </form>
        </div>
    )
}

export default Form