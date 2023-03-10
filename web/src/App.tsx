import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import { RepoList } from './pages/RepoList';
import { RepoDetail } from './pages/RepoDetail';
import { RepoContextProvider } from './repos/provider';

export function App() {
  return (
    <RepoContextProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="repos" element={<RepoList />} />
            <Route path="repos/:id" element={<RepoDetail />} />
            <Route path="*" element={<Navigate to="/repos" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RepoContextProvider>
  );
}
