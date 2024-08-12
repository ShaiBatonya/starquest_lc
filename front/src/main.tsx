
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { AuthProvider } from "./context/AuthContextUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@/index.css';
import { PersistGate } from 'redux-persist/integration/react';
import '@/locales/i18n.tsx';

import { Provider } from 'react-redux';
import store , { persistor }  from '@/redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <AuthProvider>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </AuthProvider>
    </Provider>,


);
