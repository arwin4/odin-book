import getJwt from '@utils/getJwt';
import { redirect } from 'react-router-dom';

export default async function postAction({ request }) {
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
