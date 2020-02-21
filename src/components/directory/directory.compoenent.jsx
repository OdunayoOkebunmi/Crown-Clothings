import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectoryItems } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';
import MenuItem from '../menuitem/menuitem.component';


const Directory = ({ sections }) => (
  <div className='directory-menu'>
    { sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={ id } { ...otherSectionProps } />
    )) }
  </div>
);
const mapStateToProps = createStructuredSelector({
  sections: selectDirectoryItems
})
export default connect(mapStateToProps)(Directory);