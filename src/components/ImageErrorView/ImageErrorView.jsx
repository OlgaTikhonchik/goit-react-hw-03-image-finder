import PropTypes from 'prop-types';

export const ImageErrorView = ({ message }) => {
  return (
    <div role="alert">
      <img src="" alt="" />
      <p>{message}</p>
    </div>
  );
};

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
