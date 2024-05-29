import PropTypes from 'prop-types';

const commentsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    attributes: PropTypes.shape({
      content: PropTypes.string,
      dateCreated: PropTypes.string,
    }),
    relationships: PropTypes.shape({
      author: PropTypes.shape({
        data: PropTypes.shape({
          type: PropTypes.string,
          id: PropTypes.string,
        }),
      }),
      post: PropTypes.shape({
        data: PropTypes.shape({
          type: PropTypes.string,
          id: PropTypes.string,
        }),
      }),
    }),
  }),
);

export default commentsPropType;
