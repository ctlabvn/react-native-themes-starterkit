import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { wrap } from 'example/themes';

import MessageElement from './MessageElement';

const dataList = [];
for (let i = 0; i < 3; i++) {
  dataList.push({
    key: i.toString(),
    date: 'Monday, 2018/8/30',
    messageList: []
  });
}
let flag = -1;
dataList.forEach((element, index) => {
  for (let i = 0; i < 10; i++) {
    const subElement = {
      userId: i % 4 === 0 ? 1 : 2,
      date: '2:30 pm',
      avatar:
        i % 4 === 0
          ? ''
          : {
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
            },
      content:
        i % 2
          ? 'Nhà tôi bị mất nước'
          : 'Nhà tôi bị mất điện, mất nước, hỏng TV, vỡ cửa kính',
      imageType: i % 5 === 0,
      image: {
        uri: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'
      }
    };
    if (subElement.userId !== flag) {
      subElement.first = true;
      if (i > 0) {
        element.messageList[i - 1].last = true;
      }
    }
    flag = subElement.userId;
    subElement.position = flag === 1 ? 'right' : 'left';
    element.messageList.push(subElement);
  }
  element.messageList[element.messageList.length - 1].last = true;
});

const MessageItem = wrap(({ item }) => (
  <View cls="ph2">
    <Text cls="boldGray tc mv4 ph2">{item.date}</Text>
    {item.messageList.map((item, index) => (
      <MessageElement key={index} data={item} />
    ))}
  </View>
));

@wrap
export default class Messages extends React.PureComponent {
  render() {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerCls="pt3"
        cls="flx-i"
        inverted
        data={dataList}
        renderItem={MessageItem}
      />
    );
  }
}
