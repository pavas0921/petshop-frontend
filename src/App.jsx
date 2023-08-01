import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { CustomRouterProvider } from "./router";

function App() {
  return (
    <div className="div_main">
      <CustomRouterProvider />
    </div>
  );
}

export default App;
