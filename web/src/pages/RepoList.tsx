import { BaseSyntheticEvent, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { RepoContext } from '../repos';

export function RepoList() {
  const repoStore = useContext(RepoContext);
  const [currentLanguage, setCurrentLanguage] = useState('');

  const repos = useMemo(() => {
    return repoStore?.state.repos
      .filter((repo) => {
        if (currentLanguage) {
          return repo.language === currentLanguage;
        }
        return true;
      })
      .sort((a, b) => {
        return new Date(a.created_at) > new Date(b.created_at)
          ? -1
          : new Date(a.created_at) > new Date(b.created_at)
          ? 1
          : 0;
      });
  }, [repoStore, currentLanguage]);
  const languages = useMemo<string[]>(() => {
    const temp: string[] = [];

    repoStore?.state.repos.map((repo) => {
      !temp.includes(repo.language) &&
        repo.language &&
        temp.push(repo.language);
    });
    return temp;
  }, [repoStore]);
  const handleClick = (event: BaseSyntheticEvent) => {
    setCurrentLanguage(() => event.target.id);
  };
  const handleAllClick = () => {
    setCurrentLanguage('');
  };

  return (
    <div>
      <p
        className="list-title"
        style={{ textAlign: 'center', fontSize: '20px' }}
      >
        Repositories
      </p>
      <div className="flex justify-between">
        <div>
          {repos?.length ? (
            repos?.map((repo) => {
              return (
                <div className="repo-item" key={`repository-${repo.id}`}>
                  <Link to={`/repos/${repo.id}`}>
                    <div>Name: {repo.name}</div>
                    <div>Description: {repo.description}</div>
                    <div>Language:{repo.language}</div>
                    <div>Forks Count:{repo.forks_count}</div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div>There are no repositories.</div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <button onClick={handleAllClick}>All</button>
          {languages?.length ? (
            languages.map((language) => {
              return (
                <div key={language}>
                  <button onClick={handleClick} id={language}>
                    {language}
                  </button>
                </div>
              );
            })
          ) : (
            <div>There are no languages</div>
          )}
        </div>
      </div>
    </div>
  );
}
