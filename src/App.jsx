import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Loading from './component/Loading';
let Register = lazy(() => import('./pages/Register'));
function App() {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
