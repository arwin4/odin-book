import PostCard from '@components/posts/PostCard';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Post() {
  const { post, comments } = useLoaderData();

  return <PostCard post={post} comments={comments} />;
}
