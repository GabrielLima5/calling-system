import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
