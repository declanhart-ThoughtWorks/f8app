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
    return travelDetails.map((travelDetail) => {
      if(travelDetail.origin == this.props.city) {
        var rows = [];

        travelDetail.trips.forEach((trip) => {
             rows.push(<ItemsWithSeparator style={styles.move}>
             <Row label="Departure" value={trip.departure} />
             <Row label="Arrival" value={trip.arrival} />
             <Row label={trip.mode + " Number"} value={trip.vehicleID} />
             <Row label="Departure Time" value={trip.departureTime} />
             </ItemsWithSeparator>
            )})
         return <View>{rows}</View>
      }});
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
  {origin: "BNE", trips: [
    {mode: "Bus", departure: "ThoughtWorks Office", arrival: "Brisbane Airport", vehicleID: "Bus A", departureTime: "12:00pm"},
    {mode: "Flight", departure: "Brisbane", arrival: "Melbourne", vehicleID: "QF623", departureTime: "1:55pm"},
    {mode: "Bus", departure: "Melbourne Airport", arrival: "Venue", vehicleID: "Bus A", departureTime: "5:00pm"},
    {mode: "Bus", departure: "Venue", arrival: "Melbourne Airport", vehicleID: "Bus C", departureTime: "12:00pm"},
    {mode: "Flight", departure: "Brisbane", arrival: "Melbourne", vehicleID: "QF624", departureTime: "3:10pm"},
    {mode: "Bus", departure: "Brisbane Airport", arrival: "ThoughtWorks Office", vehicleID: "Bus A", departureTime: "6:00pm"},
  ]},
  {origin: "MEL", trips: [
     {mode: "Flight", departure: "Melbourne", arrival: "Melbourne", vehicleID: "QF623", departureTime: "1:55pm"}
  ]},
  {origin: "SYD", trips: [
    {mode: "Flight", departure: "Sydney", arrival: "Melbourne", vehicleID: "QFXXX", departureTime: "1:55pm"},
    {mode: "Flight", departure: "Sydney", arrival: "Melbourne", vehicleID: "QFXXX", departureTime: "1:55pm"},
  ]},
  {origin: "PER", trips: [
    {mode: "Flight", departure: "Perth", arrival: "Melbourne", vehicleID: "QF623", departureTime: "1:55pm"},
    {mode: "Flight", departure: "Perth", arrival: "Melbourne", vehicleID: "QF623", departureTime: "1:55pm"},
  ]}
]
module.exports = CityView;
