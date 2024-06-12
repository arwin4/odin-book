import AuthorLabel from '@components/landing/postCarousel/AuthorLabel';
import CommentForm from '@components/landing/postCarousel/CommentForm';
import Comments from '@components/landing/postCarousel/Comments';
import DateLabel from '@components/landing/postCarousel/DateLabel';
import MediaContainer from '@components/landing/postCarousel/MediaContainer';
import Meta from '@components/landing/postCarousel/Meta';
import commentsPropType from '@propTypes/comments';
import postPropType from '@propTypes/post';
import React, { useState } from 'react';

import './style/PostCard.css';
import { Link } from 'react-router-dom';

export default function PostCard({ post, comments }) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const { username } = post.relationships.author.data.attributes;

  const toggleCommentsVisibility = () => setCommentsVisible(!commentsVisible);

  return (
    <div className="post-card">
      <Link to={`/user/${username}`}>
        <AuthorLabel post={post} />
      </Link>

      <DateLabel post={post} />
      <MediaContainer post={post} />
      <Meta
        post={post}
        comments={comments}
        toggleCommentsVisibility={toggleCommentsVisibility}
      />
      {commentsVisible && (
        <>
          <CommentForm post={post} />
          <Comments comments={comments} />
        </>
      )}
    </div>
  );
}

/* Prop Types */
PostCard.propTypes = {
  post: postPropType.isRequired,
  comments: commentsPropType.isRequired,
};
