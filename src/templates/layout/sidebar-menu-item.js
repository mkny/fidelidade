import React, {Component} from 'react';

import {Link} from 'react-router';

class SidebarMenuItem extends Component {


  render(){
      //onClick={this.props.onClick}
      return <li className="treeview">
        <Link to={this.props.to || '#'}>
          <i className={`fa ${this.props.icon}`}></i> <span>{this.props.label}</span>
          {this.props.children ? <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>:''}
        </Link>
        {this.props.children}
      </li>
  }
}
export default SidebarMenuItem;