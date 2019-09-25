import React from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';

import connect from '../connect';
import { billingSelector } from '../selectors';

const mapStateToProps = (state) => {
  const billing = billingSelector(state);
  return { billing };
};

@connect(mapStateToProps)
class Header extends React.Component {
  handleClick = attributes => (e) => {
    const { hideRow } = this.props;
    e.preventDefault();
    hideRow({ attributes });
  };

  render() {
    const { billing } = this.props;

    const renderItem = (item) => {
      const { title, visible, id } = item;
      return (
        <Dropdown.Item as="button" key={id} onClick={this.handleClick(item)}>
          {visible ? '+  ' : '-  '}
          {title}
        </Dropdown.Item>
      );
    };

    return (
      <Navbar expand="lg" className="border border-grey border-bottom-0">
        <Navbar.Brand href="#" className="font-weight-bold">Общая статистика</Navbar.Brand>
        <Dropdown className="ml-auto">
          <Dropdown.Toggle id="dropdown-custom-components" variant="secondary">
            Setting
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {billing.map(renderItem)}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}

export default Header;
