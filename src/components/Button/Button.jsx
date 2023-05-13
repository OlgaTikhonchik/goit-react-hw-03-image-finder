import PropTypes from 'prop-types';

export const Button = ({ children, type = 'button', onClick = null }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
