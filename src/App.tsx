import { levaStore, LevaStoreProvider } from "leva";
import "./App.css";
import Scene from "./components/scene";

function App() {


  return (
    <LevaStoreProvider store={levaStore}>
      <main>
        <Scene />
      </main>
    </LevaStoreProvider>
  );
}

export default App;
