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
 * @providesModule F8Colors
 * @flow
 */

'use strict';

const LOCATION_COLORS = {
  'BANKSA': '#00E3AD',
  'IRONBARK': '#00E3AD',
  'HARVET RESTAURANT': '#00E3AD',
  'DINING ROOM': '#4D99EF',
  'PEPPERSBERRY FOYER': '#CF72B1',
  'LINDSAY FOYER': '#6A6AD5',
  'LINDSEY BALLROOM': '#6A6AD5',
  'CRESWICK BALLROOM': '#FFCD3B',
  'HEPBURN FOYER': '#6A6AD5',
  'HEPBURN BALLROOM': '#6A6AD5',
  'BALLROOM TERRACE': '#FFCD3B',
  'GRAND BALLROOM': '#FFCD3B',
};

function colorForLocation(location: ?string): string {
  if (!location) {
    return 'black';
  }

  var color = LOCATION_COLORS[location.toUpperCase()];
  if (!color) {
    console.warn(`Location '${location}' has no color`);
    color = 'black';
  }
  return color;
}

function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

module.exports = {
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63',
  colorForLocation,
  colorForTopic,
};
