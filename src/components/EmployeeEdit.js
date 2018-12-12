import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import Communications from 'react-native-communications';
import {connect} from 'react-redux';
import {employeeUpdate, employeeSave, employeeDelete} from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state={
    showModal: false
  }
  componentWillMount(){
    _.each(this.props.employee,(value, prop) => {
      this.props.employeeUpdate({prop, value});
    });
  }
  onButtonPress(){
    const {name, shift, phone} = this.props;
    console.log(name,shift,phone);
    this.props.employeeSave({name, phone, shift:shift || 'Monday', uid:this.props.employee.uid});
  }
  onTextPress(){
    const {shift, phone} = this.props;
    console.log(shift, phone,`Your upcoming shift is on ${shift}`);
    Communications.text(phone,`Your upcoming shift is on ${shift}`);
  }
  onAccept(){
    const { uid} =this.props;
    this.props.employeeDelete({uid});
  }
  onDecline(){
    this.setState({showModal: false});
  }
  render(){
    return(
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={(this.onTextPress.bind(this))}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={()=> {this.setState({showModal: !this.state.showModal})}}>
            Fire
          </Button>
        </CardSection>
        <Confirm
          visible = {this.state.showModal}
          onAccept= {this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        > Are you sure you want to delete this?</Confirm >
      </Card>
    );
  }
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
export default connect(mapStateToProps, {employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit);
