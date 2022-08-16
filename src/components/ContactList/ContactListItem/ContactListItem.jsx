import s from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={s.item} key={id}>
      <p>
        {name}: {number}
      </p>
      <button
        className={s.button}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
