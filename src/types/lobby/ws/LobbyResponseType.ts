export enum LobbyResponseType {
  Auth = "auth",
  Observe = "observe",
  Lobbies = "lobbies",
  Lobby = "lobby",
  CreateLobby = "create_lobby",
  JoinLobby = "join_lobby",
  LeaveLobby = "leave_lobby",
  SetHexMap = "set_hex_map",
  SetPickType = "set_pick_type",
  SetNumberOfBans = "set_number_of_bans",
  SetNumberOfCharacters = "set_number_of_characters",
  SetLobbyName = "set_lobby_name",
  SetClockConfig = "set_clock_config",
  StartGame = "start_game",
  Error = "error",
}
