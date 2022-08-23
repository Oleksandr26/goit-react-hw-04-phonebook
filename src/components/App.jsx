import { useState, useEffect } from 'react';
import 'modern-normalize/modern-normalize.css';
import { nanoid } from 'nanoid/non-secure';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  function addContact(contact) {
    const { name } = contact;
    if (contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    } else {
      setContacts(prevState => [{ ...contact, id: nanoid() }, ...prevState]);
    }
  }

  function filterContacts(event) {
    setFilter(event.currentTarget.value.toLowerCase());
  }

  function removeContact(id) {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }

  function visibleContacts() {
    const x = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    console.log('x: ', x);
  }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    if (contacts?.length) {
      setContacts([...contacts]);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
      <ContactForm onSubmit={addContact} />
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Contacts</h2>
      <Filter onChange={filterContacts} />
      <ContactList contacts={visibleContacts} onDelete={removeContact} />
    </div>
  );
}
