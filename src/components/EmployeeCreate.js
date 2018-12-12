import React, { Component } from 'react';
import { Card, CardSection, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress(){
    const {name, shift, phone} = this.props;
    this.props.employeeCreate({name, phone, shift:shift || 'Monday'});
  }
  render(){
    return(
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  };
}

const styles = {
  pickerTextStyle:{
    fontSize: 18,
    padding: 20
  }
}
const mapStateToProps = (state) => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
}

export default connect(mapStateToProps, {employeeUpdate, employeeCreate}) (EmployeeCreate);
