import PropTypes from 'prop-types';

const userPropType = PropTypes.shape({
  type: PropTypes.string,
  id: PropTypes.string,
  attributes: PropTypes.shape({
    username: PropTypes.string,
    normalizedUsername: PropTypes.string,
    firstName: PropTypes.string,
    dateCreated: PropTypes.string,
    // friends: PropTypes.array,
    followers: PropTypes.arrayOf(PropTypes.string),
    isBot: PropTypes.bool,
  }),
});

export default userPropType;
