import { useEffect, useState } from 'react';
import database from '../../data/appWrite/database';
import { useNavigate, useParams } from 'react-router';
import BLOG_ROUTE from '../../constants/router';
import { Models } from 'appwrite';
import PostForm from '../../components/post-form/PostForm';

export default function EditPost() {
  const [post, setPost] = useState<Models.Document | null>(null);
  const postPrams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postPrams.id) {
      navigate(BLOG_ROUTE.All);
      return;
    }
    database
      .getPost(postPrams.id)
      .then((fetchedPost: Models.Document) => setPost(fetchedPost))
      .catch(() => navigate(BLOG_ROUTE.All));
  }, [postPrams, navigate]);

  return post ? <PostForm post={post} /> : null;
}
