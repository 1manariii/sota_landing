import ReactDOM from 'react-dom/client';
import { CursorFilter } from './shared/ui/curcor-filter';
import { HomePage } from './pages/home/Home';
import './app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <CursorFilter />
    <HomePage />
  </>
);