import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form"
import { Note, UIState } from "../service/types";
import { setFormData, setIsCreateVisible } from "../service/uiStateSlice";
import { formatDate, generateId } from "../helper/functionHelper";
import { addNote } from "../service/notesSlice";
import { useEffect } from "react";

//форма для створення нотатки
const CreateForm: React.FC = () => {
    const dispatch = useDispatch();

    const {
        formData,
        isCreateVisible,
    } = useSelector((state: { ui: UIState }) => state.ui);

    const allNotes = useSelector((state: { notes: Note[] }) => state.notes)

    useEffect(() => {
        const handleScroll = (event: Event) => {
          if (isCreateVisible) {
            event.preventDefault();
          }
        };
    
        if (isCreateVisible) {
          document.body.style.overflow = 'hidden';
          window.addEventListener('scroll', handleScroll);
        } else {
          document.body.style.overflow = 'visible';
          window.removeEventListener('scroll', handleScroll);
        }
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [isCreateVisible]);

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

    const handleChangeCreateForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
        const { name, value } = event.target;
        dispatch(setFormData({
            ...formData,
            [name]: value,
        }));
    };

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