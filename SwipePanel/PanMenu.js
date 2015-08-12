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
    LayoutAnimation,
    TouchableHighlight
} = React;

let menuWidth = window.width*0.5;

var PanMenu = React.createClass({
    getInitialState:function(){
        return {
            open: false
        };
    },

    componentWillMount:function(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: this.handleStart,
            onPanResponderMove: this.handleMove,
            onPanResponderRelease: this.handleEnd
        });
        this.mainStyle = {
            left: this.prevLeft
        }
    },

    componentDidMount:function(){
        this.updatePosition()
    },

    updatePosition: function(){
        LayoutAnimation.configureNext(animations.spring);
        this.refs.main.setNativeProps(this.mainStyle);
    },

    handleStart: function(e, gestureState){
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },

    handleEnd: function(e, gestureState){
        this.mainStyle.left = this.state.open ? ( this.getPanelLeftStyle('width') || menuWidth) : 0;
        this.updatePosition();
        this.prevLeft = this.mainStyle.left;
    },

    getPanelLeftStyle: function( style ){
        var panelStyle = this.props.panelLeftStyle;
        if(!panelStyle){
            return;
        }
        if(style){
            return panelStyle[style];
        }
        else {
            return panelStyle;
        }
    },

    handleMove: function(e, gestureState){
        var panningRight = gestureState.dx > 0;
        if(panningRight && this.state.open) {
            return;
        }

        if(!panningRight && !this.state.open) {
            return;
        }

        this.mainStyle.left = this.prevLeft + gestureState.dx;
        if(Math.abs(gestureState.dx) > this.forceMin()) {
            var open = !this.state.open;
            this.setState({open});
            this.mainStyle.left = open ? (this.getPanelLeftStyle('width') || menuWidth) : 0;
        }
        this.updatePosition();
    },

    forceMin: function(){
        return (this.getPanelLeftStyle('width') || menuWidth)*0.33;
    },

    onMainLayout: function(e){
        this.refs.main.measure(this.setMenuHeight);
    },

    setMenuHeight: function(ox, oy, w, h){
        this.refs.left.setNativeProps({height: h});
    },

    render: function(){
        var leftStyle = this.getPanelLeftStyle() || [styles.viewStyle, styles.side];
        return (
            <View>
                <View ref="left" style={leftStyle}>
                    {this.props.panelLeft}
                </View>
                <View onLayout={this.onMainLayout} ref="main"  style={this.props.panelMainStyle || styles.viewStyle} {...this.panResponder.panHandlers}>
                    {this.props.panelMain}
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    side: {
        position: 'absolute',
        backgroundColor: '#666',
        width: menuWidth
    }
});


var animations = {
    spring: {
        duration: 600,
        create: {
            type: 'linear',
            property: 'opacity'
        },
        update: {
            type: 'spring',
            springDamping: 0.7
        },
    }
};

module.exports = PanMenu;
