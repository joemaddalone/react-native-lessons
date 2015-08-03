'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  TouchableWithoutFeedback
} = React;

class LayoutAnimationApp extends React.Component {
  constructor(){
    super();
    this.state = {
      txt: 'Small',
      viewStyle: {
        height: 250
      }
    }

  }

  animateView(){
    let callback = this.onViewLayout.bind(this)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring, callback())
    this.setState({
      viewStyle: {
        height: this.state.viewStyle.height > 250 ? 250 : 450
      }
    })
  }

  onViewLayout(){
    this.setState({txt: this.state.viewStyle.height > 250 ? 'Small' : 'BIG'})
  }

  render(){
    let viewStyle = [styles.view, this.state.viewStyle]
    return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.animateView.bind(this)}>
            <View style={viewStyle}>
              <Text style={styles.viewText}>{this.state.txt}</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 20
  },
  viewText: {
    color: 'white'
  }
});

AppRegistry.registerComponent('LayoutAnimationApp', () => LayoutAnimationApp);
