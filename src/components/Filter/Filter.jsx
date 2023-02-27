import React from 'react';
import PropTypes from 'prop-types';

import css from './filter.module.css';

const Filter = ({ handleChange }) => {
  return (
    <>
      <label className={css.label} htmlFor="">
        Find contacts by name
      </label>
      <input
        className={css.form__input}
        onChange={handleChange}
        name="filter"
        type="text"
      />
    </>
  );
};
export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
