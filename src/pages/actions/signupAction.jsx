import { redirect } from 'react-router-dom';

export default async function signupAction({ request }) {
  const data = await request.formData();

  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          username: data.get('username'),
          firstName: data.get('first-name'),
          password: data.get('password'),
        },
      },
    }),
  });

  if (!res.ok) {
    const { errors } = await res.json();
    return errors;
  }

  return redirect('/login');
}
