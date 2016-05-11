
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
 * @providesModule ListContainer
 */
'use strict';

var Animated = require('Animated');
var NativeModules = require('NativeModules');
var Dimensions = require('Dimensions');
var F8Header = require('./F8Header');
//var F8SegmentedControl = require('F8SegmentedControl');
var ParallaxBackground = require('./ParallaxBackground');
var React = require('React');
var StyleSheet = require('./F8StyleSheet');
var View = require('View');
var { Text } = require('./F8Text');
//var ViewPager = require('./ViewPager');
var Platform = require('Platform');

import type {Item as HeaderItem} from 'F8Header';

//type Props = {
//  title: string;
//  leftItem?: HeaderItem;
//  rightItem?: HeaderItem;
//  extraItems?: Array<HeaderItem>;
//  selectedSegment?: number;
//  selectedSectionColor: string;
//  backgroundImage: number;
//  backgroundColor: string;
//  parallaxContent: ?ReactElement;
//  stickyHeader?: ?ReactElement;
//  onSegmentChange?: (segment: number) => void;
//  children: any;
//};
//
//type State = {
//  idx: number;
//  anim: Animated.Value;
//  stickyHeaderHeight: number;
//};

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

class ListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      idx:  0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0,
    });

    this.renderFakeHeader = this.renderFakeHeader.bind(this);
    this.handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this._refs = [];
  }

  render() {
    var leftItem = this.props.leftItem;

    const segments = [];

    let {stickyHeader} = this.props;
    const backgroundShift = segments.length === 1
      ? 0
      : this.state.idx / (segments.length - 1);

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + 64}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + 64}
            offset={this.state.anim}
            backgroundImage={this.props.backgroundImage}
            backgroundShift={backgroundShift}
            backgroundColor={this.props.backgroundColor}>
            {this.renderParallaxContent()}
          </ParallaxBackground>
          <F8Header
            title={this.props.title}
            leftItem={leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}>
            {this.renderHeaderTitle()}
          </F8Header>
          {this.renderFixedStickyHeader(stickyHeader)}
        </View>
        {this.renderFloatingStickyHeader(stickyHeader)}
      </View>
    );
  }

  renderParallaxContent() {
    if (this.props.parallaxContent) {
      return this.props.parallaxContent;
    }
    return (
      <Text style={styles.parallaxText}>
        {this.props.title}
      </Text>
    );
  }

  renderHeaderTitle() {
    var transform;
    if (!this.props.parallaxContent) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      transform = {
        opacity: this.state.anim.interpolate({
          inputRange: [distance - 20, distance],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      };
    }
    return (
      <Animated.Text style={[styles.headerTitle, transform]}>
        {this.props.title}
      </Animated.Text>
    );
  }

  handleScroll(idx, e) {
    if (idx !== this.state.idx) {
      return;
    }
    let y = 0;
    this.state.anim.setValue(e.nativeEvent.contentOffset.y);
    const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
    y = Math.min(e.nativeEvent.contentOffset.y, height);
    this._refs.forEach((ref, ii) => {
      if (ii !== idx && ref) {
        ref.scrollTo && ref.scrollTo({y, animated: false});
      }
    });

  }

  renderFakeHeader() {
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      return (
        <View style={{height}} />
      );
  }

  renderFixedStickyHeader(stickyHeader) {
     return <View style={{height: this.state.stickyHeaderHeight}} />
  }

  renderFloatingStickyHeader(stickyHeader) {
    var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
    var transform;

    // If native pinning is not available, fallback to Animated
    if (!NativeModules.F8Scrolling) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      var translateY = 0; this.state.anim.interpolate({
        inputRange: [0, distance],
        outputRange: [distance, 0],
        extrapolateRight: 'clamp',
      });
      transform = [{translateY}];
    }

    return (
      <Animated.View
        ref={(ref) => this._pinned = ref}
        onLayout={this.handleStickyHeaderLayout}
        style={[styles.stickyHeader, {opacity}, {transform}]}>
        {stickyHeader}
      </Animated.View>
    );
  }

  handleStickyHeaderLayout({nativeEvent: { layout, target }}) {
    this.setState({stickyHeaderHeight: layout.height});
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.selectedSegment === 'number' &&
      nextProps.selectedSegment !== this.state.idx) {
      this.setState({idx: nextProps.selectedSegment});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!NativeModules.F8Scrolling) {
      return;
    }

    if (this.state.idx !== prevState.idx ||
      this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

      if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
        const oldScrollViewTag = React.findNodeHandle(
          this._refs[prevState.idx].getScrollResponder()
        );
        NativeModules.F8Scrolling.unpin(oldScrollViewTag);
      }

      if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
        const newScrollViewTag = React.findNodeHandle(
          this._refs[this.state.idx].getScrollResponder()
        );
        const pinnedViewTag = React.findNodeHandle(this._pinned);
        NativeModules.F8Scrolling.pin(newScrollViewTag, pinnedViewTag, distance);
      }
    }
  }

  handleSelectSegment(idx) {
    if (this.state.idx !== idx) {
      const {onSegmentChange} = this.props;
      this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
    }
  }

  handleShowMenu() {
    this.context.openDrawer();
  }
}

ListContainer.defaultProps = {
  selectedSectionColor: 'white',
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
  },
  listView: {
    ios: {
      backgroundColor: 'transparent',
    },
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parallaxText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
  },
});

module.exports = ListContainer;
