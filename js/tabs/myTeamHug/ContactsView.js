'use strict';


var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var ItemsWithSeparator = require('../../common/ItemsWithSeparator');
var StyleSheet = require('F8StyleSheet');
var F8Colors = require('F8Colors');
var React = require('React');
var { Text } = require('F8Text');
var Relay = require('react-relay');
var View = require('View');
var TouchableOpacity = require('TouchableOpacity');

import Communications from 'react-native-communications';

import type {Contact} from '../../reducers/contacts';

var { createSelector } = require('reselect');

const data = createSelector(
  (store) => store.contacts,
);

type Props = {
  name: String;
  number: String;
  address: String;
  role: String;
}

class ContactsView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
      <PureListView
        renderEmptyList={() => (
          <ItemsWithSeparator style={styles.move}>
            <Row label="Name" value={this.props.name} />
            <TouchableOpacity onPress={() => Communications.phonecall('0434959654', true)}>
              <Row label="Phone Number" value={this.props.number} />
            </TouchableOpacity>
            <Row label="Address" value={this.props.address} />
            <Row label="Role" value={this.props.role} />
          </ItemsWithSeparator>
        )}
      />
      </View>
    );
  }

  // buildRender() {
  //   return (
  //
  //   )
  // }
}
class Row extends React.Component {
  props: {
    label: string;
    value: string;
  };

  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>
          {this.props.label.toUpperCase()}
        </Text>
        <Text style={styles.value}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: F8Colors.lightText,
  },
  value: {
    fontSize: 15,
    color: '#002350',
  },
  button: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  directionsButton: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    ios: {
      bottom: 49,
    },
    android: {
      bottom: 0,
    },
  },
  move: {
    paddingTop: 50,
    paddingHorizontal: 50,
    backgroundColor: 'white'
  }
});

module.exports = ContactsView;
