import getJwt from '@utils/getJwt';

export default async function exploreLoader() {
  const params = new URLSearchParams(document.location.search);
  const limit = params.get('limit');
  const filter = limit ? `?limit=${limit}` : '';

  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/posts${filter}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  if (!res.ok) {
    const { errors } = await res.json();
    throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedPosts = await res.json();
  return parsedFetchedPosts.data;
}
