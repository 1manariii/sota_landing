import ReactDOM from 'react-dom/client';
import { CursorFilter } from './shared/ui/curcor-filter';
import { HomePage } from './pages/home/Home';
import './app/styles/global.scss';
import { About } from './pages/about/About';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navigate } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<><HomePage /><CursorFilter /></>} />
      <Route path="/about" element={<><About /><CursorFilter /></>} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  </BrowserRouter>
);

