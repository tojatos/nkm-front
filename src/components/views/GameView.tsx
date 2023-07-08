import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ReadyState } from "react-use-websocket";
import { GameWsHandler } from "../../app/gameWsHandler";
import { GameStateView } from "../../types/game/GameStateView";
import { GameResponseType } from "../../types/game/ws/GameResponseType";
import { RootState } from "../../app/store";
import { Auth } from "../../types/requests/GameRequest";
import ReactJson from "react-json-view";
import { TabPanel } from "../TabPanel";
import GameDashboard from "../game_view/GameDashboard";
import { GameEventView } from "../../types/game/GameEventView";
import { TitledPaper } from "../TitledPaper";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { Clock } from "../../types/game/Clock";
import RequestSender from "../game_view/RequestSender";

interface GameViewProps {
  gameWsHook: WebSocketHook;
  id: string;
  autoAuth?: boolean;
}

export default function GameView({
  gameWsHook,
  id,
  autoAuth = true,
}: GameViewProps) {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [eventViews, setEventViews] = React.useState<GameEventView[]>([]);
  const [gameState, setGameState] = useState<GameStateView | undefined>(
    undefined
  );

  const [lastClock, setLastClock] = useState(gameState?.clock);

  const { sendJsonMessage, lastJsonMessage, readyState } = gameWsHook;

  const gameWsHandler = useMemo(
    () =>
      new GameWsHandler(dispatch, sendJsonMessage, (response) => {
        if (response.gameResponseType === GameResponseType.GetState) {
          const gs: GameStateView = JSON.parse(response.body);
          setGameState(gs);
          setLastClock(gs.clock);
        }
        if (response.gameResponseType === GameResponseType.Event) {
          setEventViews((es) => es.concat(JSON.parse(response.body)));
        }
        if (response.gameResponseType === GameResponseType.GetCurrentClock) {
          const clock: Clock = JSON.parse(response.body);
          setLastClock(clock);
        }
      }),
    [dispatch, sendJsonMessage]
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      gameWsHandler.receiveJson(lastJsonMessage);
    }
  }, [lastJsonMessage, gameWsHandler]);

  useEffect(() => {
    if (!autoAuth) return;
    if (readyState !== ReadyState.OPEN) return;
    if (!authData.token) return;
    const authRequest: Auth = { token: authData.token };
    gameWsHandler.auth(authRequest);
  }, [authData.token, gameWsHandler, id, readyState, autoAuth]);

  useEffect(() => {
    gameWsHandler.observe({ lobbyId: id });
    gameWsHandler.getState({ lobbyId: id });
  }, [authData.token, gameWsHandler, id]);

  useEffect(() => {
    if (gameState !== undefined) {
      gameWsHandler.getCurrentClock({ lobbyId: id });
    }
  }, [id, eventViews, gameWsHandler, gameState]);

  if (gameState === undefined)
    return <Alert severity="error">Game not found.</Alert>;

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      {authData.token ? (
        <RequestSender gameWsHandler={gameWsHandler} gameState={gameState} />
      ) : null}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
          }}
          aria-label="basic tabs example"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="JSON explorer" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <GameDashboard
          gameState={gameState}
          incomingEventViews={eventViews}
          lastClock={lastClock ?? gameState.clock}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <TitledPaper title="Game state view">
          <ReactJson src={gameState} theme="monokai" collapsed={1} />
        </TitledPaper>
      </TabPanel>
    </>
  );
}
