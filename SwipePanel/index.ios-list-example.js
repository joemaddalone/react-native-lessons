'use strict';
var React = require('react-native');
var PanMenu = require('./PanMenu');
var {
    StyleSheet,
    View,
    Text,
    AppRegistry,
    TouchableHighlight,
    PixelRatio
} = React;

var PanResponderLayoutAnimationApp = React.createClass({
    render: function(){
        let items = [
          'PanResponder', 'LayoutAnimation', 'React Native',
          'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur'
        ];
        let listItems = items.map(item => (
            <View style={panMenuStyles.listItem}>
              <PanMenu
                panelMainStyle={panMenuStyles.panelMainStyle}
                panelLeftStyle={panMenuStyles.panelLeftStyle}
                panelLeft={<Text style={{color: '#fff'}}>Delete</Text>}
                panelMain={<Text>{item}</Text>} />
            </View>
        ));

        return (
          <View>
            {listItems}
          </View>
        );

    },
});

var panMenuStyles = {
  panelMainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    height: (100 / PixelRatio.get())
  },
  panelLeftStyle: {
    flex: 1,
    width: 80,
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    borderBottomWidth: (1 / PixelRatio.get()),
    borderBottomColor: '#ccc',
  }
};

AppRegistry.registerComponent('PanResponderLayoutAnimationApp', () => PanResponderLayoutAnimationApp);
