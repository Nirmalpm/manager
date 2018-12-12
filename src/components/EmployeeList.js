import _ from 'lodash';
import React, { Component } from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import {employeesFetch} from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount(){
    this.props.employeesFetch();
    console.log('Props inside mount:',this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log('Props inside componentsWillReceiveProps:',this.props);
      this.createDataSource(nextProps);
  }

  createDataSource ({employees}) {
    console.log('employees inside createDataSource:',employees);
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee){
    return <ListItem employee= { employee } />;
  }
  render(){
    console.log(this.props);
    return(
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  };
}

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return{...val, uid}; //{shift:'Monday',name:'Nirmal':id:'asas23dfs33423'}
  });//returns an array
  return { employees };
};

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);
