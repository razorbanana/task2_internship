import './App.css';
import ActiveTable from './components/ActiveTable';
import StatsTable from './components/StatsTable';
import ArchiveTable from './components/ArchiveTable';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import { useSelector } from 'react-redux';
import { Note } from './service/types';

function App() {

  const activeNotes = useSelector((state: Note[]) => state.filter(note => !note.isArchieved));


  return (
    <>
      <div id="bodyDiv">
        <ActiveTable notes={activeNotes}></ActiveTable>
        <StatsTable></StatsTable>
        <ArchiveTable></ArchiveTable>
        <CreateForm></CreateForm>
        <EditForm></EditForm>
      </div>
    </>
  );
}

export default App;
