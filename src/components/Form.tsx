import { MouseEventHandler } from "react"
import { Note } from "../service/types"

const Form:React.FC<{formData:Note, identifier:string, handleCloseForm: MouseEventHandler<HTMLInputElement>, handleChangeForm:React.ChangeEventHandler<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>, handleSubmitForm: MouseEventHandler<HTMLInputElement>}> = ({formData,identifier,handleCloseForm,handleChangeForm, handleSubmitForm}) => {
    return (
        <div className="formDiv" id={identifier}>
        <form className="noteForm">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChangeForm} required/><br /><br />

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={formData.category} onChange={handleChangeForm} required>
                <option value="Task">Task</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Idea">Idea</option>
                <option value="Quote">Quote</option>
            </select><br /><br />

            <label htmlFor="content">Content:</label><br />
            <textarea id="content" name="content" value={formData.content} rows={5} cols={40} onChange={handleChangeForm} required></textarea><br /><br />

            <input type="submit" value="Submit" id="submitButton" className="commonBtn" onClick={handleSubmitForm}/>
            <input type="submit" value="Cancel" id="cancelButton" className="commonBtn" onClick={handleCloseForm}/>
        </form>
        </div>
    )
}

export default Form