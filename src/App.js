import _ from 'lodash';
import { useEffect } from 'react';
import './App.css';
import RouteDefinations from "./routeDefinations"

function App() {
  useEffect(() => {
      let user_info = localStorage.getItem('users_info')
      if(_.isUndefined(user_info) || _.isEmpty(user_info)) localStorage.setItem('users_info', JSON.stringify([]))
  }, [])

  return (
    <div className="App">
       <RouteDefinations/>
    </div>
  );
}

export default App;
