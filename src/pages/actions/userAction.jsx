import getJwt from '@utils/getJwt';

export default async function userAction({ request }) {
  const data = await request.formData();
  const userToFollow = data.get('username');

  let res;

  // Handle follow user
  if (request.method === 'POST') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/users/${userToFollow}/followers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  // Handle unfollow user
  if (request.method === 'DELETE') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/users/${userToFollow}/followers`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  // Handle replace avatar
  if (request.method === 'PATCH') {
    // Refuse big files
    const file = data.get('file');
    if (file.size >= 10 ** 7) {
      throw new Error('Image must be smaller than 10 MB');
    }

    const formData = new FormData();
    formData.append('upload_preset', 'odinstragram-avatar');
    formData.append('file', file);

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    let publicId;

    try {
      res = await fetch(
        'https://api.cloudinary.com/v1_1/dg2fuzzhq/image/upload/',
        requestOptions,
      );
      const parsedRes = await res.json();

      publicId = parsedRes.public_id;
    } catch (error) {
      // TODO: handle error
    }

    // TODO: try...catch
    res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'avatars',
          attributes: {
            publicId,
          },
        },
      }),
    });

    // console.log(await res.json());
    // return redirect('');
  }

  if (!res.ok) {
    const { errors } = await res.json();
    return errors;
  }

  // Prevent fetcher.data (error) from persisting
  return null;
}
