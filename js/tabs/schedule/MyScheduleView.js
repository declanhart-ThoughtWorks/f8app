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
 * @flow
 */
'use strict';

var EmptySchedule = require('./EmptySchedule');
var F8Button = require('F8Button');
var FilterSessions = require('./filterSessions');
var ListContainer = require('ListContainer');
var LoginButton = require('../../common/LoginButton');
var Navigator = require('Navigator');
var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var PureListView = require('../../common/PureListView');
var ScheduleListView = require('./ScheduleListView');
var FriendsListView = require('./FriendsListView');
var View = require('View');

var { connect } = require('react-redux');

var {
  logOutWithPrompt,
  switchTab,
  switchDay,
  loadFriendsSchedules,
} = require('../../actions');

import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';
import type {State as User} from '../../reducers/user';
import type {State as Schedule} from '../../reducers/schedule';

var { createSelector } = require('reselect');


type Props = {
  user: User;
  sessions: Array<Session>;
  friends: Array<FriendsSchedule>;
  schedule: Schedule;
  navigator: Navigator;
  logOut: () => void;
  jumpToSchedule: (day: number) => void;
  loadFriendsSchedules: () => void;
};

// TODO: Rename to MyF8View
class MyScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);

    (this: any).openSharingSettings = this.openSharingSettings.bind(this);
    (this: any).handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }

  render() {
    var rightItem;
    if (this.props.user.isLoggedIn) {
      rightItem = {
        title: 'Settings',
        icon: require('./img/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    const {id, isLoggedIn} = this.props.user;
    const profilePicture = isLoggedIn && id
      ? <ProfilePicture userID={id} size={100} />
      : null;

    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.props.sessions}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        {...(this.props: any /* flow can't guarantee the shape of props */)}
        renderEmptyList={this.renderEmptyList}
      />
    );
  }

  renderSectionHeader(sectionData: any, sectionID: string) {
    return <SessionsSectionHeader title={sectionID} />;
  }

  renderRow(session: Session, day: number) {
    return (
      <F8SessionCell
        onPress={() => this.openSession(session, day)}
        session={session}
      />
    );
  }

  renderNotLoggedIn() {
    return (
      <EmptySchedule
        key="login"
        title="Log in to make a schedule."
        text="You’ll be able to save sessions to your schedule to view or share later.">
        <LoginButton source="My Team Hug" />
      </EmptySchedule>
    );
  }

  renderEmptyList(day) {
    return (
      <EmptySchedule
        key="schedule"
        image={require('./img/no-sessions-added.png')}
        text={'Sessions you save will\nappear here.'}>
        <F8Button
          caption={`See the schedule`}
          onPress={() => this.props.jumpToSchedule()}
        />
      </EmptySchedule>
    );
  }

  openSharingSettings() {
    this.props.navigator.push({shareSettings: 1});
  }

  handleSegmentChanged(segment) {
    if (segment === 2 /* friends */) {
      this.props.loadFriendsSchedules();
    }
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

}

const data = createSelector(
  (store) => store.sessions,
  (store) => store.schedule,
  (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

function select(store) {
  return {
    user: store.user,
    sessions: data(store),
    schedule: store.schedule,
    // Only show friends who have something in their schedule
    friends: store.friendsSchedules.filter(
      (friend) => Object.keys(friend.schedule).length > 0
    ),
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    jumpToSchedule: (day) => dispatch([
      switchTab('schedule'),
      switchDay(day),
    ]),
    loadFriendsSchedules: () => dispatch(loadFriendsSchedules()),
  };
}

module.exports = connect(select, actions)(MyScheduleView);
