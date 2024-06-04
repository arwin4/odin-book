import getJwt from '@utils/getJwt';

export default async function postLoader({ params }) {
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
