import { BaseSyntheticEvent, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function RepoList() {
  return (
    <div>
      <p
        className="list-title"
        style={{ textAlign: 'center', fontSize: '20px' }}
      >
        Repositories
      </p>
    </div>
  );
}
