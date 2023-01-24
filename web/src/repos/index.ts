import { createContext, Dispatch, SetStateAction } from 'react';
import { RepoStore } from './provider';

export interface RepoContextInterface {
  state: RepoStore;
  setState: Dispatch<SetStateAction<RepoStore>>;
}

export const RepoContext = createContext<RepoContextInterface | undefined>(
  undefined
);
