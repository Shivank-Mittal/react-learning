import { useEffect, useState } from 'react';
import database from '../../data/appWrite/database';
import { Button, PostCard } from '../../components';
import bucket from '../../data/appWrite/bucket';
import { Link } from 'react-router';
import { BLOG_FULL_ROUTE } from '../../constants/router';
import { Models } from 'appwrite';

export default function AllPost() {
  const [allPost, setAllPosts] = useState<Models.Document[]>([]);
  const [girdCount, setGirdCount] = useState<number>(0);

  useEffect(() => {
    database.getAllPosts().then((allFetchedPosts) => {
      setAllPosts(allFetchedPosts.documents);
      setGirdCount(allFetchedPosts.total < 4 ? allFetchedPosts.total : 4);
    });
  }, []);

  return (
    <>
      <Link to={BLOG_FULL_ROUTE.ADD} className="absolute left-10 top-40 cursor-pointer">
        <Button> Add Post</Button>
      </Link>
      <div className={`grid ${'grid-cols-' + girdCount} gap-4`}>
        {allPost.map((post) => (
          <PostCard
            $id={post.$id}
            title={post.title}
            key={post.$id}
            getImageUrl={() => bucket.getFilePreview(post.featuredImage)}
          ></PostCard>
        ))}
      </div>
    </>
  );
}
