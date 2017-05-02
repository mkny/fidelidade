/**
 * Configuracao comum do ambiente (template)
 */
import React, { Component } from 'react';

// import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
// import Menu from './templates/menu';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Body from './layout/body';
import Footer from './layout/footer';
import SidebarRight from './layout/sidebar-right';



// ### jquery-ui section ###
import 'jquery-ui';

import 'jquery-ui/ui/widgets/dialog';
import 'jquery-ui/ui/widgets/tooltip';
import 'jquery-ui/ui/widgets/sortable';

import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
// ### jquery-ui section ###

// # Trash
// import 'jquery-ui/themes/base/selectable.css';
// import 'jquery-ui/ui/core';
// import 'jquery-ui/ui/widgets/selectable';

// # Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// # Bootstrap

// # Admin-lte
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';
import 'admin-lte/plugins/iCheck/flat/blue.css';
import 'admin-lte/plugins/morris/morris.css';
// import 'admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.css';
import 'admin-lte/plugins/datepicker/datepicker3.css';
import 'admin-lte/plugins/daterangepicker/daterangepicker.css';
import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.min.css';
// # Admin-lte

import './../../public/css/style.css';

// <!-- jQuery 2.2.3 -->
// <script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
// <!-- jQuery UI 1.11.4 -->
// <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
// <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
// <script>
//   $.widget.bridge('uibutton', $.ui.button);
// </script>
// <!-- Bootstrap 3.3.6 -->
// <script src="bootstrap/js/bootstrap.min.js"></script>
// <!-- Morris.js charts -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
// <script src="plugins/morris/morris.min.js"></script>
// <!-- Sparkline -->
// <script src="plugins/sparkline/jquery.sparkline.min.js"></script>
// <!-- jvectormap -->
// <script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
// <script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
// <!-- jQuery Knob Chart -->
// <script src="plugins/knob/jquery.knob.js"></script>
// <!-- daterangepicker -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
// <script src="plugins/daterangepicker/daterangepicker.js"></script>
// <!-- datepicker -->
// <script src="plugins/datepicker/bootstrap-datepicker.js"></script>
// <!-- Bootstrap WYSIHTML5 -->
// <script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
// <!-- Slimscroll -->
// <!-- script src="plugins/slimScroll/jquery.slimscroll.min.js"></script -->
// <!-- FastClick -->
// <script src="plugins/fastclick/fastclick.js"></script>
// <!-- AdminLTE App -->
// <script src="dist/js/app.min.js"></script>
// <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
// <script src="dist/js/pages/dashboard.js"></script>
// <!-- AdminLTE for demo purposes -->
// <script src="dist/js/demo.js"></script>

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'Home'
    }
  }

  // setPageTitle(str_title){
  //   this.setState({title: str_title});
  // }

  componentDidMount(){
    window.jQuery = window.$ = require('jquery');

    require('admin-lte');
    require('bootstrap/dist/js/bootstrap.min.js');
    require('admin-lte/plugins/slimScroll/jquery.slimscroll.min.js');
  }

  
  render() {
    return (
      <div>
        <Header />
        <Sidebar parent={this} />
        <Body parent={this}>{this.props.children}</Body>
        <Footer />
        <SidebarRight />
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
}

export default App;