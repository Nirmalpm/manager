import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {employeeUpdate} from '../actions';

class EmployeeForm extends Component {
  render(){
    return(
      <View>
      <CardSection>
        <Input
        label="name"
        placeHolder="jane"
        value={this.props.name}
        onChangeText= {text => this.props.employeeUpdate({prop:'name', value:text})}
        />
      </CardSection>
      <CardSection>
        <Input
        label="Phone"
        placeHolder="555-555-5555"
        value={this.props.phone}
        onChangeText= {text => this.props.employeeUpdate({prop:'phone', value:text})}
         />
      </CardSection>
      <CardSection style={{flexDirection: 'column'}}>
        <Text style={styles.pickerTextStyle}> Shift</Text>
        <Picker
          style={{flex:1}}
          selectedValue={this.props.shift}
          onValueChange={value => this.props.employeeUpdate({prop:'shift', value: value })}
        >
          <Picker.Item label="Monday " value="Monday"/>
          <Picker.Item label="Tuesday" value="Tuesday"/>
          <Picker.Item label="Wednesday" value="Wednesday"/>
          <Picker.Item label="Thursday" value="Thursday"/>
          <Picker.Item label="Friday" value="Friday"/>
          <Picker.Item label="Saturday" value="Saturday"/>
          <Picker.Item label="Sunday" value="Sunday"/>
        </Picker>
      </CardSection>
      </View>
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
export default connect(mapStateToProps, {employeeUpdate})(EmployeeForm);
