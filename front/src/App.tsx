import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/routes';
function App() {
  return (
    <>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </>
  );
}

export default App;
