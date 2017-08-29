import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document
      .body
      .classList
      .toggle('aside-menu-hidden');
  }

  onResearchChanged(e) {
  }

  render() {
    return (
      <header className="app-header navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler d-lg-none"
          onClick={this.mobileSidebarToggle}
          type="button">&#9776;</button>
        <a className="navbar-brand" href="/"> </a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item">
            <button
              className="nav-link navbar-toggler sidebar-toggler"
              type="button"
              onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          <li>
            <div className="form-group row">
              <div className="col-10">
                <input
                  className="form-control"
                  type="search"
                  value="Rechercher..."
                  id="example-search-input"
                  onChange={this.onResearchChanged} />
              </div>
            </div>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-bell"></i>
              <span className="badge badge-pill badge-danger">9</span>
            </a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button
                onClick={this.toggle}
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                type="button"
                aria-haspopup="true"
                aria-expanded={this.state.dropdownOpen}>
                <img
                  src={'img/avatars/governador.jpg'}
                  className="img-avatar" />
                <span className="d-md-down-none">Karim</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem>
                  <i className="fa fa-bell-o"></i>
                  Dossiers<span className="badge badge-danger">4</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-envelope-o"></i>
                  Paiements<span className="badge badge-warning">5</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>

      </header>
    )
  }
}

export default Header;
