import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PostCard from './PostCard';

export default function PostCarousel() {
  const posts = useLoaderData();
  console.log(posts);

  return posts.map((post) => <PostCard post={post} key={post.id} />);
}
