import Home from './components/home'
import Auth from './components/auth'
import MyGallery from './components/gallery'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

  
const AppNavigator = createStackNavigator({
  Auth : {screen:Auth},
  Home : {screen:Home},
  MyGallery :  {screen:MyGallery}
  

})

const App=createAppContainer(AppNavigator);

export default App;