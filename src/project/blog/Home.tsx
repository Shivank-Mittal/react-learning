import React, { useState, useEffect } from 'react'
import { Models } from 'appwrite'
import database from '../../data/appWrite/database';
import { PostCard } from '../../components';
import { useIsLoggedIn } from '../../store/selector/auth.selector';

export default function Home() {
     const [posts, setPosts] = useState<Models.Document[]>([]);
     const isLoggedIn = useIsLoggedIn();

     useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await database.getAllPosts();
            if (fetchedPosts) {
                setPosts(fetchedPosts.documents);
            }
        }
        fetchPosts();
     }, []);

     if (!isLoggedIn) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard 
                            $id={post.$id}
                            title={post.title}
                            getImageUrl={() => post.featureImage}
                        />
                    </div>
                ))}
            </div>
    </div>
  )
}
