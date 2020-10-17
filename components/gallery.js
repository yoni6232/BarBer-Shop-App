import React, { Component } from 'react';
 
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
 
 
export default class MyGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: [
            {
                label: '1',
                src: require('../assets/1.jpg')
            },
            {
                label: '2',
                src: require('../assets/2.jpg')
            },
            {
                label: '3',
                src: require('../assets/3.jpg')
            },
            {
                label: '4',
                src: require('../assets/4.jpg')
            },
            {
                label: '5',
                src: require('../assets/5.jpg')
            },
            {
                label: '6',
                src: require('../assets/6.jpg')
            },
            {
                label: '7',
                src: require('../assets/apple-touch-icon.jpg')
            },
        ]
    };
  }
  
  renderGallery() {
    var count = 0;
    var previous_item = '';
    var pairs = this.getPairsArray(this.state.photos);
    return pairs.map((item, index) => {
        return (
            <View style={styles.item} key={index}>
                <Image 
                   resizeMode='contain'
                    style={styles.photo} 
                    source={item[0].src} />
                <Image 
                   resizeMode='contain'
                    style={styles.photo} 
                    source={item[1].src} />
            </View>
        );
    });
}
getPairsArray(photos) {
  var pairs_r = [];
  var pairs = [];
  var count = 0;
  photos.forEach((item) => {
    count += 1;
    pairs.push(item);
    if(count == 2){
      pairs_r.push(pairs)
      count = 0;
      pairs = [];
    }
  });
  return pairs_r;
}
    render() {
      return (
          <View style={styles.container}>
              <ScrollView style={styles.gallery}>
                  { this.renderGallery() }
              </ScrollView>
              <View style={styles.tabs}>
          </View>
        </View>
      )}
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'column'
  },
  gallery: {
      flexDirection: 'column'
  },
  tabs: {
      flexDirection: 'row',
      backgroundColor: '#333',
      padding: 20
  },
  tab: {
      flex: 1
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
},
photo: {
    flex: 1
}
  }
  );
  
  

 