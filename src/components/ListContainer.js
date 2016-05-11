/**
 * @flow
 */
'use strict';
var Animated = require('Animated');
var NativeModules = require('NativeModules');
var Dimensions = require('Dimensions');
var F8Header = require('./F8Header');
var F8SegmentedControl = require('./F8SegmentedControl');
var ParallaxBackground = require('./ParallaxBackground');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Text } = require('./F8Text');
var ViewPager = require('./ViewPager');
var Platform = require('Platform');
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
const ActivityIndicator = require('ActivityIndicatorIOS');

import type {Item as HeaderItem} from './F8Header';

class Container extends React.Component {
  render() {
    const child = React.Children.only(this.props.children);
    if (!child.type.getFragmentNames) {
      return child;
    }
    return (
      <View style={{height: 400}}>
        {child.props.renderHeader && child.props.renderHeader()}
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      </View>
    )
  }

}

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      idx: this.props.selectedSegment || 0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0,
    });
    this.renderFakeHeader = this.renderFakeHeader.bind(this);
    this.handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this._refs = [];

  }

  render() {
    var leftItem = this.props.leftItem;
    const segments = [];
    const content = React.Children.map(this.props.children, (child, idx) => {
      segments.push(child.props.title);
      return (
        <Container>
          {
            React.cloneElement(child, {
              ref: (ref) => this._refs[idx] = ref,
              onScroll: (e) => this.handleScroll(idx, e),
              style: styles.listView,
              showsVerticalScrollIndicator: false,
              scrollEventThrottle: 16,
              contentInset: {bottom: 40, top: 0},
              automaticallyAdjustContentInsets: false,
              renderHeader: this.renderFakeHeader,
              scrollsToTop: idx === this.state.idx,
            })
          }
        </Container>
      );
    });

    let {stickyHeader} = this.props;
    if (segments.length > 1) {
      stickyHeader = (
        <View>
          <F8SegmentedControl
            values={segments}
            selectedIndex={this.state.idx}
            selectionColor={this.props.selectedSectionColor}
            onChange={this.handleSelectSegment}
          />
          {stickyHeader}
        </View>
      );
    }
    // TODO: Bind to ViewPager animation
    const backgroundShift = segments.length === 1
      ? 0
      : this.state.idx / (segments.length - 1);

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + F8Header.height}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + F8Header.height}
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
        <ViewPager
          count={segments.length}
          selectedIndex={this.state.idx}
          onSelectedIndexChange={this.handleSelectSegment}>
          {content}
        </ViewPager>
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

  renderFixedStickyHeader() {
    return <View style={{height: this.state.stickyHeaderHeight}} />;
  }

  renderFloatingStickyHeader(stickyHeader) {
    if (!stickyHeader || Platform.OS !== 'ios') {
      return;
    }
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

}

ListContainer.defaultProps = {
  selectedSectionColor: 'white',
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
    backgroundColor: 'transparent',
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
    top: F8Header.height,
    left: 0,
    right: 0,
  },
});

module.exports = ListContainer;
