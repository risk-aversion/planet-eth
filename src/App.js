import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider, styled } from "baseui";
import HeaderNavigation from "./components/HeaderNavigation";
import MapComponent from "./components/MapComponent";
import Leaderboard from "./components/Leaderboard";

const engine = new Styletron();

const CentralContainer = styled("div", ({ $theme }) => ({
  display: "flex",
}));

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <div>
          <HeaderNavigation />
          <CentralContainer>
            <MapComponent />
            <Leaderboard />
          </CentralContainer>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
