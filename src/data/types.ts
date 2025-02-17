export type postInfo = {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  userId: string;
};

export type updatePostInfo = {
  slug: string;
  postInfo: Omit<postInfo, "slug" | "userId">;
};

export type accountInfo = {
  email: string;
  password: string;
  name: string;
};

export type loginInfo = Omit<accountInfo, "name">;
