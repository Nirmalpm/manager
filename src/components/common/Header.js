//import libarariies for making a Component
import React from 'react';
import { Text, View } from 'react-native';


// Make a Component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#A8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    elevation: 12,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};
//Make the component available for other parts of the app
export { Header };
