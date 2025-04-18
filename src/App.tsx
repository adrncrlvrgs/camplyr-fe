import { Button } from "./components/Button/Button";
import LandingPage from "./views/Landing/LandingPage";
import { Page } from "./components/Pages";
import "./App.css";
import PrivateNav from "./components/Navigation/PrivateNav";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Page>
      <PrivateNav/>
    </Page>
  );
}

export default App;
