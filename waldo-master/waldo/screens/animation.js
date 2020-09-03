import React, { useState } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{ marginTop: -40, justifyContent: 'center', alignItems: 'center', }}>
      <FadeInView>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', margin: 10 }}> Take an image of your bike when you've parked it. Open the map, when you need to find it!</Text>
      </FadeInView>
    </View>
  );
};