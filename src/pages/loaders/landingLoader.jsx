export default async function landingLoader() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts`, {
    method: 'GET',
  });

  if (!res.ok) {
    const { errors } = await res.json();
    throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedPosts = await res.json();
  return parsedFetchedPosts.data;
}
