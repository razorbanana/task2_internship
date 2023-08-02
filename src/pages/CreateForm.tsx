import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form"
import { Note, UIState } from "../service/types";
import { setFormData, setIsCreateVisible } from "../service/uiStateSlice";
import { formatDate, generateId } from "../helper/functionHelper";
import { addNote } from "../service/notesSlice";

//форма для створення нотатки
const CreateForm: React.FC = () => {
    const dispatch = useDispatch();

    //дані в формі та стан видимості форми 
    const {
        formData,
        isCreateVisible,
    } = useSelector((state: { ui: UIState }) => state.ui);

    //всі нотатки
    const allNotes = useSelector((state: { notes: Note[] }) => state.notes)

    //івент хендлер для нажимання по кнопці закриття форми
    const handleCloseCreateForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()

        setFormData(
            {
                id: 0,
                name: '',
                category: 'Task',
                created: '',
                content: '',
                isArchieved: false,
            }
        )
        dispatch(setIsCreateVisible(false))
    }

    //івент хендлер для зміни даних в формі 
    const handleChangeCreateForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
        const { name, value } = event.target;
        dispatch(setFormData({
            ...formData,
            [name]: value,
        }));
    };

    //івент хендлер для нажимання по кнопці підтвердження форми
    const handleSubmitCreateForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();

        const newNote = {
            ...formData,
            created: formatDate(new Date()),
            id: generateId(allNotes)
        };

        console.log(newNote)
        dispatch(addNote(newNote));
        dispatch(setFormData(
            {
                id: 0,
                name: '',
                category: 'Task',
                created: '',
                content: '',
                isArchieved: false,
            }
        ))
        dispatch(setIsCreateVisible(false))
    };

    return (
        <Form formData={formData} visibility={isCreateVisible} handleCloseForm={handleCloseCreateForm} handleChangeForm={handleChangeCreateForm} handleSubmitForm={handleSubmitCreateForm}></Form>
    )
}

export default CreateForm