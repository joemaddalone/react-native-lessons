'use strict';
var Dimensions = require('Dimensions');
var window = Dimensions.get('window');
var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    AppRegistry,
    PanResponder,
    LayoutAnimation
} = React;

let menuWidth = window.width * 0.5;
let forceMin = menuWidth*0.33;


var PanResponderLayoutAnimationApp = React.createClass({
    getInitialState:function(){
        return {open: false}
    },
    componentWillMount:function(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.handleStart,
            onMoveShouldSetPanResponder: this.handleStart,
            onPanResponderGrant: this.handleGrant,
            onPanResponderMove: this.handleMove,
            onPanResponderRelease: this.handleEnd
        });
        this.prevLeft = 0;
        this.boxStyle = {
            left: this.prevLeft,
        }
    },

    componentDidMount:function(){
        this.updatePosition();
    },

    updatePosition: function(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.refs.box.setNativeProps(this.boxStyle);
    },

    handleStart: function(e, gestureState){
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10
    },

    handleEnd: function(e, gestureState){
        this.boxStyle.left = this.state.open ? menuWidth : 0;
        this.updatePosition();
        this.prevLeft = this.boxStyle.left;
    },

    handleMove: function(e, gestureState){

        var panningRight = gestureState.dx > 10;

        if(panningRight && this.state.open){
            return;
        }

        if(!panningRight && !this.state.open) {
            return;
        }

        this.boxStyle.left = this.prevLeft + gestureState.dx;
        if(Math.abs(gestureState.dx) > forceMin){
            var open = !this.state.open;
            this.setState({open});
            this.boxStyle.left = open ? menuWidth : 0;
        }
        this.updatePosition();
    },

    handleGrant: function(){},

    render: function(){
        return (
            <View>
            <View style={[styles.viewStyle, styles.side]}>
                <Text>SIDE</Text>
            </View>
            <View ref="box" style={styles.viewStyle} {...this.panResponder.panHandlers}>
                <Text>Hi There</Text>
            </View>
            </View>

        );
    },
});

var styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        height: window.height,
      },
      side: {
        position: 'absolute',
        backgroundColor: '#666',
        width: menuWidth,
      }
});

AppRegistry.registerComponent('PanResponderLayoutAnimationApp', () => PanResponderLayoutAnimationApp);
