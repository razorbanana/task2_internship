import ActiveTable from './pages/ActiveTable';
import StatsTable from './pages/StatsTable';
import EditForm from './pages/EditForm';
import CreateForm from './pages/CreateForm';

const App = () => {
  return (
    <div id="bodyDiv">
      <ActiveTable></ActiveTable>
      <StatsTable></StatsTable>
      <CreateForm></CreateForm>
      <EditForm></EditForm>
    </div>
  );
}

export default App;
