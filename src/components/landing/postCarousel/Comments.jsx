import React from 'react';
import commentsPropType from '@propTypes/comments';
import { Link } from 'react-router-dom';

export default function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => {
        const { content } = comment.attributes;
        const { username, firstName, avatarUrl } =
          comment.relationships.author.data.attributes;

        return (
          <div className="comment" key={comment.id}>
            <Link className="author" to={`/user/${username}`}>
              <img src={avatarUrl} alt="" className="avatar" />
              <div className="first-name">{firstName}</div>
            </Link>

            <cite className="content">{content}</cite>
          </div>
        );
      })}
    </div>
  );
}

/* Prop Types */
Comments.propTypes = {
  comments: commentsPropType.isRequired,
};
