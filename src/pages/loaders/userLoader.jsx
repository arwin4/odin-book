import getJwt from '@utils/getJwt';

export default async function userLoader({ params }) {
  const { username } = params;

  const [userRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts?username=${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
  ]);

  const [fetchedUser, fetchedPosts] = await Promise.all([
    userRes.json(),
    postsRes.json(),
  ]);

  if (!userRes.ok) {
    throw new Response(fetchedUser.errors[0].title, { status: userRes.status });
  }

  if (!postsRes.ok) {
    throw new Response(fetchedPosts.errors[0].title, {
      status: postsRes.status,
    });
  }

  return { user: fetchedUser.data, posts: fetchedPosts.data };
}
