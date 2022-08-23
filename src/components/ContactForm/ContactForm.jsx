import { useState } from 'react';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export function ContactForm({ onSubmit }) {
  const [contact, setContact] = useState({ name: '', number: '' });

  function saveData(event) {
    const { name, value } = event.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  }

  function submitData(event) {
    event.preventDefault();
    onSubmit(contact);
    reset();
  }

  function reset() {
    setContact({ name: '', number: '' });
  }

  const { name, number } = contact;
  return (
    <form className={s.form} onSubmit={submitData}>
      <label>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={saveData}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Phone Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={saveData}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
