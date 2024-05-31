import PostCard from '@components/posts/PostCard';
import getJwt from '@utils/getJwt';
import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';

export default function Post() {
  const { post, comments } = useLoaderData();

  return <PostCard post={post} comments={comments} />;
}

export async function postLoader({ params }) {
  const { id } = params;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${id}/comments`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
  ]);

  if (!postRes.ok) {
    const { errors } = await postRes.json();
    throw new Response(errors[0].title, { status: postRes.status });
  }

  if (!commentsRes.ok) {
    const { errors } = await commentsRes.json();
    throw new Response(errors[0].title, { status: commentsRes.status });
  }

  const [fetchedPost, fetchedComments] = await Promise.all([
    postRes.json(),
    commentsRes.json(),
  ]);

  return { post: fetchedPost.data, comments: fetchedComments.data };
}

export async function postAction({ request }) {
  const data = await request.formData();
  const intent = data.get('intent');
  const postId = data.get('post-id');

  let res;

  // Handle like post
  if (intent === 'add-like') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}/likes`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  // Handle remove like
  if (intent === 'remove-like') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}/likes`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  if (intent === 'post-comment') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'comments',
            attributes: {
              content: data.get('content'),
            },
          },
        }),
      },
    );
  }

  // Handle delete post
  if (intent === 'delete-post') {
    const username = data.get('username');
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return redirect(`/user/${username}`);
  }

  if (!res.ok) {
    const { errors } = await res.json();
    return errors;
  }

  // Prevent fetcher.data (error) from persisting
  return null;
}
