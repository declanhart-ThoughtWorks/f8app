'use strict';

var ActionSheetIOS = require('ActionSheetIOS');
var F8Button = require('F8Button');
var PureListView = require('../../common/PureListView');
var ItemsWithSeparator = require('../../common/ItemsWithSeparator');
var Linking = require('Linking');
var Platform = require('Platform');
var ListContainer = require('ListContainer');
var MapView = require('../../common/MapView');
var React = require('React');
var StyleSheet = require('F8StyleSheet');
var View = require('View');
var { connect } = require('react-redux');
var { Text } = require('F8Text');
var F8Colors = require('F8Colors');

type Props = {
    city: string;
};

class CityView extends React.Component {
  currentCity: any;
  constructor() {
    super();
  }

  buildRender() {
    return travelDetails.map((detail) => {
      if(detail.origin == this.props.city) {
        return (
          <View>
          <ItemsWithSeparator style={styles.move}>
            <Row label="Departure" value={detail.departure} />
            <Row label="Arrival" value={detail.arrival} />
            <Row label="Flight Number" value={detail.flightNumber} />
            <Row label="Departure Time" value={detail.departureTime} />
          </ItemsWithSeparator>
          <ItemsWithSeparator style={styles.move}>
            <Row label="Departure" value={detail.arrival} />
            <Row label="Arrival" value={detail.departure} />
            <Row label="Flight Number" value={detail.flightNumber} />
            <Row label="Departure Time" value={detail.departureTime} />
          </ItemsWithSeparator>
          </View>
        )}
        return null;
      });
  }

  render() {
      return (
        <View>
          {this.buildRender()}
        </View>
      );
  }
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

var travelDetails = [
  {origin: "BNE", departure: "Brisbane", arrival: "Melbourne", flightNumber: "QF623", departureTime: "1:55pm"},
  {origin: "MEL", departure: "Melbourne", arrival: "Melbourne", flightNumber: "QF623", departureTime: "1:55pm"},
  {origin: "SYD", departure: "Sydney", arrival: "Melbourne", flightNumber: "QFXXX", departureTime: "1:55pm"},
  {origin: "PER", departure: "Perth", arrival: "Melbourne", flightNumber: "QF623", departureTime: "1:55pm"},
]
module.exports = CityView;
