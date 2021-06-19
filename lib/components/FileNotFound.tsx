import * as React from 'react';
import { GitHub } from 'react-feather';

import { loginWithGitHub } from '$lib/misc/github';
import Button from '$lib/components/Button';

export default function GitHubFileNotFound({ repo, owner }) {
  const repoName = owner + '/' + repo;
  return (
    <>
      <h2>File Not Found</h2>
      <p>
        If{' '}
        <a
          href={'https://github.com/' + repoName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repoName}
        </a>{' '}
        is a private repo, please login with GitHub first.
      </p>
      <p style={{ color: '#666' }}>
        <small>
          Your access token will be saved in your browser. The fetched API spec
          file content goes to your browser directly.
        </small>
      </p>
      <div>
        <Button start={<GitHub size={20} />} onClick={loginWithGitHub}>
          Login with GitHub
        </Button>
      </div>
    </>
  );
}
