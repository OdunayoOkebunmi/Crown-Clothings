import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectoryItems } from '../../redux/directory/directory.selectors';
import MenuItem from '../menuitem/menuitem.component';
import { DirectoryMenuContainer } from './directory.styles';

const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    { sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={ id } { ...otherSectionProps } />
    )) }
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectoryItems
})
export default connect(mapStateToProps)(Directory);