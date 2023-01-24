import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { RepoList } from './pages/RepoList';

import './App.css';

export function App() {
  return (<BrowserRouter>
      <Routes>
        <Route path="repos" element={<RepoList />} >
        <Route path="*" element={<Navigate to="/repos" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
