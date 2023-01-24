import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RepoContext } from '../repos';

export function RepoDetail() {
  const repoStore = useContext(RepoContext);
  const [commit, setCommit] = useState<any[]>();
  const { id } = useParams();
  const selectedRepo = useMemo(() => {
    return repoStore?.state.repos.filter(
      (repo) => repo.id === parseInt(id as string)
    )?.[0];
  }, [repoStore, id]);

  useEffect(() => {
    if (selectedRepo) {
      fetch(selectedRepo.commits_url.replace('{/sha}', ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setCommit(json);
        });
    }
    return;
  }, [selectedRepo]);

  const lastCommit = useMemo(() => {
    return commit?.length ? commit[0] : undefined;
  }, [commit]);

  return (
    <div>
      <Link to="/repos">Back</Link>
      {lastCommit ? (
        <div>
          <p>{lastCommit.commit.author.name}</p>
          <p>{lastCommit.commit.committer.date}</p>
          <p>{lastCommit.commit.message}</p>
        </div>
      ) : null}
    </div>
  );
}
