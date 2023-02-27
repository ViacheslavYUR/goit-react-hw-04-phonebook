import React from 'react';
import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';

import css from './contactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
  const elements = contacts.map(({ id, name, number }) => {
    return (
      <li key={nanoid()}>
        <p className={css.contact}>
          {name}: {number}
        </p>
        <button
          className={css.btn}
          type="button"
          onClick={() => removeContact(id)}
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul>{elements}</ul>;
};
export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
