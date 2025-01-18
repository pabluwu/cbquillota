import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserRouter } from './router/UserRouter'
import Login from './pages/Login';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../src/App.css';

const queryClient = new QueryClient();

const App = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const auth = getAuth(); // Initialize Firebase Auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });
  return (
    <>
      {
        authenticated == true &&
        <QueryClientProvider client={queryClient}>
          <UserRouter> </UserRouter>
        </QueryClientProvider>
      }
      {
        authenticated == false &&
        <Login />
      }
    </>
  )
}

export default App