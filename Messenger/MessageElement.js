import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

import { wrap, sizes } from 'example/themes';

@wrap
export default class MessageElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDetailVisible: false
    };
  }

  _onDetailPress = () => {
    this.setState({
      isDetailVisible: !this.state.isDetailVisible
    });
    LayoutAnimation.easeInEaseOut();
  };

  render() {
    const { data } = this.props;
    const { isDetailVisible } = this.state;
    const isRight = data.position === 'right';
    return (
      <View cls={{ mt1: data.first, mb1: data.last }}>
        {isDetailVisible ? (
          <Text cls="asc boldGray mv2">{data.date}</Text>
        ) : null}
        <TouchableOpacity
          onPress={this._onDetailPress}
          activeOpacity={1}
          cls={isRight ? 'asfe' : 'flx-row'}
        >
          {isRight ? null : data.first ? (
            <Image cls="asfe w2 h2 br4" source={data.avatar} />
          ) : (
            <View cls="w2" />
          )}
          <View
            cls={[
              `br4 ovh ${isRight ? 'ml5' : 'ml2 mr5'}`,
              {
                'br--top': data.first && !data.last,
                'br--bottom': data.last && !data.first,
                [`br--${isRight ? 'left' : 'right'}`]:
                  !data.first && !data.last,
                [`bg-${isRight ? 'blue' : 'boldGray'}`]: isDetailVisible
              }
            ]}
          >
            {!data.imageType ? (
              <Text
                textBreakStrategy="simple"
                cls={
                  isRight ? 'white pa2 bg-lightBlue' : 'pa2 bg-superLightGray'
                }
              >
                {data.content}
              </Text>
            ) : (
              <Image resizeMode="stretch" source={data.image} cls="h4 w4" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
