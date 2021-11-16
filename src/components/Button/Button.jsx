import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button({ onClickBtn }) {
  return (
    <button className={s.Button} type="button" onClick={() => onClickBtn()}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
};
