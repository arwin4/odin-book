import getJwt from '../getJwt';

const fetchAndSetCurrentUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }

  const user = await res.json();
  localStorage.setItem('user', JSON.stringify(user.data));
};

export default fetchAndSetCurrentUser;
