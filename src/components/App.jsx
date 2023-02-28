import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './App.module.css';

//() => {    return JSON.parse(window.localStorage.getItem('my-contacts')) ?? []; }
const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('my-contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts, filter]);

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`This contact ${name} or ${number} is already in contacts`);
    }
    setContacts(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevState, newContact];
    });
  };
  const isDublicate = (name, number) => {
    const normalizedName = name.toLocaleLowerCase();
    const normalizedNumber = number.toLocaleLowerCase();
    const findContact = contacts.find(({ name, number }) => {
      return (
        name.toLocaleLowerCase() === normalizedName ||
        number.toLocaleLowerCase() === normalizedNumber
      );
    });
    return Boolean(findContact);
  };
  const removeContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(item => item.id !== id);
    });
  };
  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFiltered = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedFilter) ||
        number.toLocaleLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  };

  const filteredContacts = getFiltered();
  return (
    <>
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />
        <ContactList
          removeContact={removeContact}
          contacts={filteredContacts}
        />
      </div>
    </>
  );
};
export default App;

// class App extends Component {
//   state = {
//     contacts: [
//       // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const myContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (myContacts && myContacts.length) {
//       this.setState({ contacts: myContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts !== contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }
//   addContact = ({ name, number }) => {
//     if (this.isDublicate(name, number)) {
//       return alert(`This contact ${name} or ${number} is already in contacts`);
//     }
//     this.setState(prevState => {
//       const { contacts } = prevState;
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       return { contacts: [newContact, ...contacts] };
//     });
//   };
//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(item => item.id !== id);
//       return { contacts: newContacts };
//     });
//   };

//   isDublicate(name, number) {
//     const normalizedName = name.toLocaleLowerCase();
//     const normalizedNumber = number.toLocaleLowerCase();
//     const { contacts } = this.state;
//     const findContact = contacts.find(({ name, number }) => {
//       return (
//         name.toLocaleLowerCase() === normalizedName ||
//         number.toLocaleLowerCase() === normalizedNumber
//       );
//     });
//     return Boolean(findContact);
//   }

//   getFiltered() {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLocaleLowerCase();
//     const result = contacts.filter(({ name, number }) => {
//       return (
//         name.toLocaleLowerCase().includes(normalizedFilter) ||
//         number.toLocaleLowerCase().includes(normalizedFilter)
//       );
//     });
//     return result;
//   }

//   render() {
//     const contacts = this.getFiltered();

//     return (
//       <>
//         <div className={css.wrapper}>
//           <h1>Phonebook</h1>
//           <ContactForm onSubmit={this.addContact} />
//           <h2>Contacts</h2>
//           <Filter handleChange={this.handleChange} />
//           <ContactList removeContact={this.removeContact} contacts={contacts} />
//         </div>
//       </>
//     );
//   }
// }
