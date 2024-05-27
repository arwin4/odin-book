import AuthorLabel from '@components/landing/postCarousel/AuthorLabel';
import DateLabel from '@components/landing/postCarousel/DateLabel';
import MediaContainer from '@components/landing/postCarousel/MediaContainer';
import Meta from '@components/landing/postCarousel/Meta';
import postPropType from '@propTypes/post';
import React from 'react';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <AuthorLabel post={post} />
      <DateLabel post={post} />
      <MediaContainer post={post} />
      <Meta post={post} />
    </div>
  );
}

/* Prop Types */
PostCard.propTypes = {
  post: postPropType.isRequired,
};
