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

    try {
      // Upload to Cloudinary
      res = await fetch(
        'https://api.cloudinary.com/v1_1/dg2fuzzhq/image/upload/',
        requestOptions,
      );

      if (!res.ok) {
        throw new Error();
      }

      // Extract resource id
      const parsedRes = await res.json();
      const publicId = parsedRes.public_id;

      // Set new avatar
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

      if (!res.ok) {
        throw new Error();
      }
    } catch (error) {
      throw new Response('Fetch error', {
        statusText: 'Failed to upload the image.',
        status: res?.status,
      });
    }
  }

  // Prevent fetcher.data (error) from persisting
  return null;
}
