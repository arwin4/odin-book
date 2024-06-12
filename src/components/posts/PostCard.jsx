import commentsPropType from '@propTypes/comments';
import postPropType from '@propTypes/post';
import React, { useState } from 'react';

import './style/PostCard.css';
import { Link } from 'react-router-dom';
import AuthorLabel from '@components/PostCard/AuthorLabel';
import DateLabel from '@components/PostCard/DateLabel';
import MediaContainer from '@components/PostCard/MediaContainer';
import Meta from '@components/PostCard/Meta';
import CommentForm from '@components/PostCard/CommentForm';
import Comments from '@components/PostCard/Comments';

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
