import PropTypes from 'prop-types';

const Button = ({ onLoadMoreBtnClick, children }) => {
  return (
    <button
      type="button"
      className="Button"
      onClick={() => onLoadMoreBtnClick()}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onLoadMoreBtnClick: PropTypes.func,
};

export default Button;
