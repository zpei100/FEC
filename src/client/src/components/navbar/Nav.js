import React, { Component } from 'react';
import { logo } from '../../lib/svg';

class Nav extends Component {
  render() {
    return (
      <div className="navbar navbar-light bg-light">
        <div className="col-6 justify-content-start d-flex">
          <div className="my-auto">{logo}</div>
          <form className="form-inline my-2 col-10">
            <input
              className="form-control ml-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        <ul className="navbar-nav d-flex flex-row justify-content-end">
          {['Become a host', 'Help', 'Sign up', 'Log in'].map(key => (
            <li className="nav-item mx-3">
              <a className="text-dark" href="#" key={key}>
                {key}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Nav;
