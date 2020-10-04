import Home from './components/home'
import Auth from './components/auth'
import MyGallery from './components/gallery'
import Slot from './components/slots'
import Scdule from './components/scdule';
import Admin from './components/admin';


import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

  
const AppNavigator = createStackNavigator({
  Auth : {screen:Auth},
  Home : {screen:Home},
  MyGallery :  {screen:MyGallery},
  Slot : {screen:Slot},
  Scdule : {screen:Scdule},
  Admin : {screen:Admin}

})

const App=createAppContainer(AppNavigator);

export default App;