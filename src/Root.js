import React,{Component} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './App';
import CodePush from "react-native-code-push";

class Root extends Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    //CodePush.sync();
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}

export default Root;