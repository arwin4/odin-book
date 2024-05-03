/* eslint-disable react/prop-types */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PostCard from './PostCard';
import './style/PostCarousel.css';

export default function PostCarousel() {
  const posts = useLoaderData();

  return (
    <div className="post-carousel">
      <PostCard posts={posts} />
    </div>
  );
}
