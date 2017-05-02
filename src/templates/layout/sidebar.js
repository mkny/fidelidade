import React, { Component } from 'react';



import SidebarMenuItem from './sidebar-menu-item';
// import img_user from 'admin-lte/dist/img/user2-160x160.jpg';

import Menu from './../../config/tpl-menu'

class sidebar extends Component {
  buildMenu(data){

    return (data || Menu.menu).map((item, index) => {
      const { href, label, icon, childrens } = item;
      let chds;
      
      if(childrens && childrens.length){
        chds = <ul className="treeview-menu">{this.buildMenu(childrens)}</ul>;
      }
      
      return <SidebarMenuItem key={index} to={href !== '#' ? href:null} label={label} icon={icon} onClick={() => this.props.parent.setPageTitle(label)}>{chds}</SidebarMenuItem>
    });

  }

  render(){
    return <aside className="main-sidebar">
      <section className="sidebar">
        <form action="#" method="get" className="sidebar-form">
          <div className="input-group">
            <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
              </span>
          </div>
        </form>
        <ul className="sidebar-menu">
          <li className="header">MAIN NAVIGATION</li>
          {this.buildMenu()}
        </ul>
      </section>
    </aside>
  }
}
export default sidebar;


/**
 *
<li className="active treeview">
            <a href="#">
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul className="treeview-menu">
              <li className="active"><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
              <li><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
            </ul>
          </li>
 * 
 */