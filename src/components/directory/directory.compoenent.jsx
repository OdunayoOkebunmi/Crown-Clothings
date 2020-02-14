import React, { Component } from 'react';
import './directory.styles.scss';
import MenuItem from '../menuitem/menuitem.component';
import SECTIONS_DATA from './sections.data';
class Directory extends Component {
  constructor() {
    super()

    this.state = {
      sections: SECTIONS_DATA
    }
  }
  render () {
    return (
      <div className='directory-menu'>
        { this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={ id } { ...otherSectionProps } />
        )) }
      </div>
    );
  }
}

export default Directory;