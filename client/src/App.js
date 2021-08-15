import {Route, Switch} from 'react-router-dom';
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';
import Crowdfunds from './containers/crowdfund';
import Home from './containers/Home';
import FundraiserForm from './containers/fundraiserForm'
import ShowTransaction from './containers/ShowTransaction'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
      <Switch>
          <Route path="/signin">< SignIn /></Route>
          <Route path="/signup">< SignUp /></Route>
          <Route path="/addcampaign"><FundraiserForm /></Route>
          <Route path="/showtransaction"><ShowTransaction /></Route>
          <Route path="/"><Home /></Route>
      </Switch>
  );
}

export default App;
