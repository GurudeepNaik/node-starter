export function getKeyName(...args: string[]) {
  return `bites:${args.join(":")}`;
}

export const userKeyById = (id: string) => getKeyName("users", id);
export const postKeyById = (id: string) => getKeyName("posts", id);

export const usersKey = () => getKeyName("users");
export const postsKey = () => getKeyName("posts");
