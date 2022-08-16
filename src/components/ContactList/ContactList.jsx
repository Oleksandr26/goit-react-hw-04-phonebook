import { Component } from 'react';
import { ContactListItem } from './ContactListItem/ContactListItem';
import PropTypes from 'prop-types';

export class ContactList extends Component {
  state = {
    name: '',
  };

  render() {
    const { contacts, onDelete } = this.props;
    return (
      <ul>
        {contacts.map(({ name, number, id }) => (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            id={id}
            deleteContact={onDelete}
          />
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
