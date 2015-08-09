'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    AppRegistry,
    PanResponder
} = React;

var PanResponderApp = React.createClass({
    componentWillMount:function(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this.handleGrant,
            onPanResponderMove: this.handleMove,
            onPanResponderRelease: this.handleEnd
        });
        this.prevLeft = 0;
        this.prevTop = 0;
        this.boxStyle = {
            left: this.prevLeft,
            top: this.prevTop
        }
    },

    componentDidMount:function(){
        this.updatePosition()
    },

    updatePosition: function(){
        this.refs.box.setNativeProps(this.boxStyle);
    },

    handleEnd: function(e, gestureState){
        this.refs.box.setNativeProps({
            backgroundColor: 'blue'
        });
        this.prevLeft += gestureState.dx;
        this.prevTop += gestureState.dy;
    },

    handleMove: function(e, gestureState){
        this.boxStyle.left = this.prevLeft + gestureState.dx;
        this.boxStyle.top = this.prevTop + gestureState.dy;
        this.updatePosition();
    },

    handleGrant: function(){
      this.refs.box.setNativeProps({
        backgroundColor: 'green'
      });
    },

    render: function(){
        return (
            <View ref="box" style={styles.box} {...this.panResponder.panHandlers} />
        );
    },
});

var styles = StyleSheet.create({
    box: {
        width: 80,
        height: 80,
        backgroundColor: "blue",
        position: 'absolute',
        opacity: 0.5
    }
});

AppRegistry.registerComponent('PanResponderApp', () => PanResponderApp);
