export const RegularExpression = {
  // 1 owner 2 repo 3 ref 4 path
  githubFileUrl: /^https:\/\/github\.com\/([^\s/]+)\/([^\s/]+)\/blob\/([^\s/]+)\/([^\s]+)$/,
  // 1 ref
  //                                                              owner    repo          ref       path+token
  githubRawFileUrl: /^https:\/\/raw\.githubusercontent\.com\/(?:[^\s/]+)\/(?:[^\s/]+)\/([^\s/]+)\/(?:[^\s]+)$/
};
