import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import parse from 'html-react-parser';
import database from '../../data/appWrite/database';
import bucket from '../../data/appWrite/bucket';
import { useUserData } from '../../store/selector/auth.selector';
import { Models } from 'appwrite';
import { Button } from '../../components';
import BLOG_ROUTE, { BLOG_FULL_ROUTE } from '../../constants/router';

// Define the Post type based on the expected structure of the post object
interface Post {
  $id: string;
  userId: number;
  title: string;
  content: string;
  featuredImage: string;
}

export default function Post() {
  const [post, setPost] = useState<Models.Document | null>(null);
  const urlPrams = useParams();
  const navigate = useNavigate();
  const userData = useUserData();
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (urlPrams.id) {
      database.getPost(urlPrams.id).then((post) => {
        if (post) setPost(post);
        else navigate(BLOG_ROUTE.All);
      });
    } else navigate('/');
  }, [urlPrams.id, navigate]);

  const deletePost = () => {
    database.deletePost(post!.$id).then((status) => {
      if (status) {
        bucket.delete(post!.featuredImage);
        navigate(BLOG_ROUTE.All);
      }
    });
  };

  return post ? (
    <div className="py-8 bg-white rounded-2xl p-10">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={bucket.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl w-xs max-h-40"
        />

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`${BLOG_FULL_ROUTE.BASE}edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3 cursor-pointer">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500 cursor-pointer" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}
