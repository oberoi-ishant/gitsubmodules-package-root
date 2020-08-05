import React from 'react';
import { map as _map } from 'lodash';

export default class TestComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [1,2,3,4]
    }
  }

  myFunc () {
    return _map(this.state.numbers, (num) => num * 3).join(', ')
  }

  render () {
    return (
      <div>
        <div>Test Component</div>
        <div>{ this.myFunc() }</div>
      </div>
    );
  }
}