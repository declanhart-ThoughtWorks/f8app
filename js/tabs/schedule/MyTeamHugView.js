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
var Platform = require('Platform');
var View = require('View');
var StyleSheet = require('F8StyleSheet');
var F8Colors = require('F8Colors');

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

    (this: any).renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    (this: any).openSharingSettings = this.openSharingSettings.bind(this);
    (this: any).handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }
  render() {

    const content = (
      <View style={styles.container}>
        <ListContainer
          title="My Team Hug"
          backgroundImage={require('./img/schedule-background.png')}
          backgroundColor={'#9176D2'}>
          <View
            title="Contacts"
          />
          <View
            title="Info"
          />
          <View
            title="Games"
          />
        </ListContainer>
      </View>
    );

    if (Platform.OS === 'ios') {
      return content;
    }
    return (
      <F8DrawerLayout
        ref={(drawer) => { this._drawer = drawer; }}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}>
        {content}
      </F8DrawerLayout>
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

    renderEmptyList(): ?ReactElement {
      const {renderEmptyList} = this.props;
      return renderEmptyList && renderEmptyList(this.props.sessionType);
    }

    openSession(session: Session, day: number) {
      this.props.navigator.push({
        day,
        session,
        allSessions: this.state.todaySessions,
      });
    }

    storeInnerRef(ref: ?PureListView) {
      this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
      this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
      return this._innerRef && this._innerRef.getScrollResponder();
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

  renderEmptySessionsList(day) {
    return (
      <EmptySchedule
        key="schedule"
        image={require('./img/no-sessions-added.png')}
        text={'Sessions you save will\nappear here.'}>
        <F8Button
          caption={`See the day ${day} schedule`}
          onPress={() => this.props.jumpToSchedule(day)}
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

module.exports = connect(select, actions)(MyScheduleView);
