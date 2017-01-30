/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8InfoView
 * @flow
 */
'use strict';

var LinksList = require('./LinksList');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var WiFiDetails = require('./WiFiDetails');
var StyleSheet = require('F8StyleSheet');
var F8Colors = require('F8Colors');
var React = require('React');
var Relay = require('react-relay');
var View = require('View');


const POLICIES_LINKS = [{
  title: 'Terms of Service',
  url: 'https://m.facebook.com/terms?_rdr',
}, {
  title: 'Data Policy',
  url: 'https://m.facebook.com/policies?_rdr',
}, {
  title: 'Code of Conduct',
  url: 'https://www.fbf8.com/code-of-conduct',
}];

function F8InfoView() {
  return (
    <View style={styles.container}>
      <InfoList />
    </View>
  );
}

function InfoList() {
  return (
    <PureListView
      renderEmptyList={() => (
        <View>
          <WiFiDetails
            network="blah"
            password="blah"
          />
        </View>
      )}
    />
  );
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

module.exports = F8InfoView;
