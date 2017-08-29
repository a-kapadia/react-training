import React from 'react';
import propTypes from 'prop-types';

class DisplayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      query: 'all',
    };
  }

  componentWillReceiveProps(nextProp) {
    const list = this.state.list;
    const itemName = nextProp.item;
    const item = {
      name: itemName,
      isDeleted: false,
    };

    for (let i = 0; i < list.length; i += 1) {
      if (list[i].name === itemName) {
        return;
      }
    }
    if (item.name) {
      list.push(item);
    }
    this.setState({
      list,
    });
  }

  listItemClicked(index) {
    const list = this.state.list;
    list[index].isDeleted = !list[index].isDeleted;
    this.setState({
      list,
    });
  }

  showSelected(choice) {
    this.setState({
      query: choice,
    });
  }

  render() {
    return (
      <div>
        <div className="button-bar">
          <button id="all" onClick={() => this.showSelected('all')}>All</button>
          <button id="active" onClick={() => this.showSelected('active')}>Active</button>
          <button id="finished" onClick={() => this.showSelected('finished')}>Finished</button>
        </div>
        <div>
          <h3>Todo List.</h3>
          <Display
            list={this.state.list}
            query={this.state.query}
            onClick={(i) => { this.listItemClicked(i); }}
          />
        </div>
      </div>
    );
  }
}

function Display(props) {
  return (
    <ul>
    {
      props.list.map((item, i) => {
        const Element = (
          <li
            key={item.name}
            className={item.isDeleted ? 'deleted' : 'active'}
            onClick={() => { props.onClick(i); }}
          >{item.name}</li>
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

export default DisplayList;

