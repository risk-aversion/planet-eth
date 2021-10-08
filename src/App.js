import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import MapComponent from "./MapComponent.js";

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <MapComponent/>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
