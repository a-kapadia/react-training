import React from 'react';
import propTypes from 'prop-types';

function Display(props) {
  return (
    <ul>
      {
        props.list.map((item, listIndex) => {
          const Element = (
            <li key={item.name}>
              <button
                className={item.isDeleted ? 'deleted' : 'active'}
                onClick={() => { props.onClick(listIndex); }}
              >{item.name}</button>
            </li>
          );

          switch (props.query) {
            case 'all':
              return Element;
            case 'active':
              return (!item.isDeleted ? Element : null);
            case 'finished':
              return (item.isDeleted ? Element : null);
            default:
              return Element;
          }
        })
      }
    </ul>
  );
}

Display.propTypes = {
  list: propTypes.arrayOf.isRequired,
  query: propTypes.string.isRequired,
};

export default Display;

