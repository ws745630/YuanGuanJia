import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from '../../public/DeviceInfo'

export default class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? DeviceInfo.height * verticalPercent : DeviceInfo.height;
    const width = horizontalPercent ? DeviceInfo.width * horizontalPercent : DeviceInfo.width;
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        {children}
        <Button title="Close" onPress={this.closeModal} />
      </View>
    );
  };

  render() {
    return <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>{this._renderLightBox()}</Animated.View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
