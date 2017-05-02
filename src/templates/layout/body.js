import React, {Component} from 'react';

// import img_user from 'admin-lte/dist/img/user2-160x160.jpg';

class body extends Component {


  render(){
    return <div className="content-wrapper">
      <section className="content-header">
        <h1>{this.props.parent.state.title}<small>Controls panel</small></h1>
        <ol className="breadcrumb">
          <li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
          <li className="active">Dashboard</li>
        </ol>
      </section>

      {this.props.children}
      
      
    </div>
  
  }
  
}
export default body;