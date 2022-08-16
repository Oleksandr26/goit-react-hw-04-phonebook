import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import { nanoid } from 'nanoid/non-secure';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = contact => {
    const { contacts } = this.state;
    if (contacts.find(({ name }) => name === contact.name)) {
      Notify.failure(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [{ ...contact, id: nanoid() }, ...prevState.contacts],
      }));
    }
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Contacts</h2>
        <Filter onChange={this.filterContacts} />
        <ContactList contacts={visibleContacts} onDelete={this.removeContact} />
      </div>
    );
  }
}
