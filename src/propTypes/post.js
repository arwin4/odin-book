import PropTypes from 'prop-types';

const postPropType = PropTypes.shape({
  type: PropTypes.string,
  id: PropTypes.string,
  attributes: PropTypes.shape({
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
  relationships: PropTypes.shape({
    author: PropTypes.shape({
      data: PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
        attributes: PropTypes.shape({
          usernames: PropTypes.string,
          normalizedUsername: PropTypes.string,
          firstName: PropTypes.string,
          isBot: PropTypes.bool,
        }),
      }),
    }),
    likes: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          id: PropTypes.string,
        }),
      ),
    }),
  }),
});

export default postPropType;
