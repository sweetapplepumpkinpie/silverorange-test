import { ReactNode, useState, useEffect } from 'react';
import { RepoContext } from '.';

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  forks: number;
  commits_url: string;
  default_branch: string;
}

export interface RepoStore {
  loading: boolean;
  repos: Repo[];
  error?: any;
}

const contentType = 'Content-Type';
const corsHeader = 'Access-Control-Allow-Origin';

export function RepoContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RepoStore>({ loading: false, repos: [] });

  useEffect(() => {
    fetch('http://localhost:4000/repos', {
      method: 'GET',
      headers: {
        [contentType]: 'application/json',
        [corsHeader]: 'http://localhost:3000',
      },
    })
      .then((res) => res.json())
      .then(
        (json: Repo[]) => {
          setState({
            ...state,
            repos: json,
          });
        },
        (error) => {
          setState({
            ...state,
            loading: true,
            error,
          });
        }
      );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RepoContext.Provider value={{ state, setState }}>
        {children}
      </RepoContext.Provider>
    </div>
  );
}
