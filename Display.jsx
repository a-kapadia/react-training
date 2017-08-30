import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      query: 'all',
    };
  }

  componentWillMount() {
    /*eslint-disable */
    fetch('http://localhost:3000/lists')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          list: data,
        });
      });
    /*eslint-enable */  
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
          <h3 id="todo">Todo List.</h3>
          <ul>
            {
              this.state.list.map((item, listIndex) => {
                const Element = (
                  <li key={item.name}>
                    <button
                      className={item.isDeleted ? 'deleted' : 'active'}
                      onClick={() => { this.listItemClicked(listIndex); }}
                    >{item.name}</button>
                  </li>
                );

                switch (this.state.query) {
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
        </div>
      </div>
    );
  }
}

export default Display;

