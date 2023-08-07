import ActiveTable from './pages/ActiveTable';
import StatsTable from './pages/StatsTable';
import EditForm from './pages/EditForm';
import CreateForm from './pages/CreateForm';

const App = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="font-roboto" id="bodyDiv">
        <ActiveTable></ActiveTable>
        <StatsTable></StatsTable>
        <CreateForm></CreateForm>
        <EditForm></EditForm>
      </div>
    </div>
  );
}

export default App;
