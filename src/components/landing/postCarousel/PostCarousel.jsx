/* eslint-disable react/prop-types */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SmallPostCard from '@components/posts/SmallPostCard';

export default function PostCarousel() {
  const posts = useLoaderData();

  return (
    <div className="post-carousel">
      {posts.map((post) => (
        <SmallPostCard post={post} key={post.id} interactable={false} />
      ))}
      {posts.map((post) => (
        <SmallPostCard post={post} key={post.id} interactable={false} />
      ))}
      {posts.map((post) => (
        <SmallPostCard post={post} key={post.id} interactable={false} />
      ))}
      {posts.map((post) => (
        <SmallPostCard post={post} key={post.id} interactable={false} />
      ))}
    </div>
  );
}
