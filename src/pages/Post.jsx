import PostCard from '@components/posts/PostCard';
import getJwt from '@utils/getJwt';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Post() {
  const { post } = useLoaderData();
  console.log(post);

  return <PostCard post={post} />;
}

export async function postLoader({ params }) {
  const { id } = params;

  const res = await Promise.all([
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
  ]);

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }

  const parsedFetchedPost = await res[0].json();

  return { post: parsedFetchedPost.data };
}
