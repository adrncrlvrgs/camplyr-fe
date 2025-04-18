import { Button } from "./components/Button/Button";
import LandingPage from "./views/Landing/LandingPage";
import { Page } from "./components/Pages";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Page>
      <LandingPage />
      <div className="font-medium">test</div>
      <Button>Test</Button>
    </Page>
  );
}

export default App;
