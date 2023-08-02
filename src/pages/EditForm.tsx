import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form"
import { UIState } from "../service/types";
import { setFormData, setIsEditVisible } from "../service/uiStateSlice";
import { formatDate } from "../helper/functionHelper";
import { editNote } from "../service/notesSlice";

//форма для редагування нотатки
const EditForm:React.FC = () => {
    const dispatch = useDispatch();

    //дані в формі та стан видимості форми
    const {
        formData,
        isEditVisible
    } = useSelector((state: { ui: UIState }) => state.ui);

    //івент хендлер для нажимання по кнопці закриття форми
    const handleCloseEditForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        dispatch(setIsEditVisible(false))
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
      }
    
      //івент хендлер для зміни даних в формі 
      const handleChangeEditForm: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
        const { name, value } = event.target;
        dispatch(setFormData({
          ...formData,
          [name]: value,
        }));
      };
    
      //івент хендлер для нажимання по кнопці підтвердження форми
      const handleSubmitEditForm: React.MouseEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const newNote = {
          ...formData,
          created: formatDate(new Date())
        };
    
        console.log(newNote)
        dispatch(editNote(newNote));
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
        dispatch(setIsEditVisible(false))
    
      };
    

    return (
        <Form formData={formData} visibility={isEditVisible} handleCloseForm={handleCloseEditForm} handleChangeForm={handleChangeEditForm} handleSubmitForm={handleSubmitEditForm}></Form>
    )
}

export default EditForm