import React from "react";
import { styled } from "baseui";
import { RaribleHook } from "../hooks/api";
import "../index.css"

const Leaderboard = styled("div", ({ $theme }) => {
  return {
    fontFamily: "Chakra Petch",
    color: "white",
    width: "40vw",
    height: "100%",
    float: "right",
    overflow: "auto",
    padding: $theme.sizing.scale200,
  };
});

const LeaderboardTitle = styled("div", {
  fontWeight: "bold",
  fontSize: 50,
  fontStyle: "italic",
});

const Row = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export default () => {
  const { ownerList } = RaribleHook();

  return (
    <Leaderboard>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      {ownerList &&
        Object.entries(ownerList).map(([key, val]) => (
          <Row key={key}>
            <div>{key}:</div>
            <div>{val.length}</div>
          </Row>
        ))}
    </Leaderboard>
  );
};
