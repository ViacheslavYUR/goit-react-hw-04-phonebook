import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log('mount');
    const myContacts = JSON.parse(localStorage.getItem('contacts'));
    if (myContacts && myContacts.length) {
      this.setState({ contacts: myContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(' update');
    const { contacts } = this.state;
    console.log(contacts);
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`This contact ${name} or ${number} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLocaleLowerCase();
    const normalizedNumber = number.toLocaleLowerCase();
    const { contacts } = this.state;
    const findContact = contacts.find(({ name, number }) => {
      return (
        name.toLocaleLowerCase() === normalizedName ||
        number.toLocaleLowerCase() === normalizedNumber
      );
    });
    return Boolean(findContact);
  }

  getFiltered() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedFilter) ||
        number.toLocaleLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  }

  render() {
    const contacts = this.getFiltered();

    return (
      <>
        <div className={css.wrapper}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <Filter handleChange={this.handleChange} />
          <ContactList removeContact={this.removeContact} contacts={contacts} />
        </div>
      </>
    );
  }
}

export default App;
