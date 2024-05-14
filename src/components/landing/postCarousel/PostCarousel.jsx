/* eslint-disable react/prop-types */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import RecursivePostCard from './RecursivePostCard';
import './style/PostCarousel.css';

export default function PostCarousel() {
  const posts = useLoaderData();

  return (
    <div className="post-carousel">
      <div className="post-card-wrapper">
        <RecursivePostCard posts={posts} />
      </div>
    </div>
  );
}
