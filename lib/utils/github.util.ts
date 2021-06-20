export type GitHubFileMeta = {
  owner: string;
  repo: string;
  ref: string;
  path: string;
};

export function extractUrlMeta(url: string): GitHubFileMeta | undefined {
  let cap = Patten.githubFileUrl.exec(url);
  if (cap) {
    const [, owner, repo, ref, path] = cap;
    return { owner, repo, ref, path };
  }

  let cap2 = Patten.githubRawFileUrl.exec(url);
  if (cap2) {
    const [, owner, repo, ref, path] = cap2;
    return { owner, repo, ref, path };
  }
}

// const [, owner, repo, ref, path] = cap;
// const githubGetContentsOptions = { owner, repo, ref, path };
export const Patten = {
  // 1 owner 2 repo 3 ref 4 path
  githubFileUrl:
    /^https:\/\/github\.com\/([^\s/]+)\/([^\s/]+)\/blob\/([^\s/]+)\/([^\s]+)$/,
  // 1 owner 2 repo 3 ref 4 path
  githubRawFileUrl:
    //                                          owner    repo         ref       path      token
    /^https:\/\/raw\.githubusercontent\.com\/([^\s/]+)\/([^\s/]+)\/([^\s/]+)\/([^\s\?]+)(\?token=\w+)?$/,
};
