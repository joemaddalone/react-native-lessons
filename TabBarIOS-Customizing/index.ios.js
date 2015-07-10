'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  ScrollView
} = React;

class TabAppAdv extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'tabOne'
    }
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }
  render(){
    return (
      <TabBarIOS barTintColor="black" tintColor="white">
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabOne'}
          onPress={() => this.setTab('tabOne')}
          systemIcon="history">
          <ScrollView>
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
              <Text style={styles.tabText}>Tab One</Text>
            </View>
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={() => this.setTab('tabTwo')}
          title="Egghead"
          icon={require('image!egghead')}
          badge="NEW">
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>Tab Two</Text>
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabThree'}
          onPress={() => this.setTab('tabThree')}
          systemIcon="more">
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>Tab Three</Text>
            </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin:50,
    fontSize: 45
  }
});

AppRegistry.registerComponent('TabAppAdv', () => TabAppAdv);
