import ReactDOM from 'react-dom/client';
import { CursorFilter } from './shared/ui/curcor-filter';
import { HomePage } from './pages/home/Home';
import { About } from './pages/about/About';
import FranchisePage from './pages/franchise/Franchise';
import './app/styles/global.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navigate } from 'react-router';
import Catalog from './pages/cataloge/Catalog';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<><HomePage /><CursorFilter /></>} />
      <Route path="/about" element={<><About /><CursorFilter /></>} />
      <Route path="/franchise" element={<><FranchisePage /><CursorFilter /></>} />
      <Route path="/catalog" element={<><Catalog /><CursorFilter /></>} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  </BrowserRouter>
);

