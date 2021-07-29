import './styles.scss';
import APIHandler from './backend/api';
import { setRefreshBtn, setAddBtn } from './frontend/list';

const run = () => {
  const api = new APIHandler();
  const local = api.gameIDfromStorage('gameID');

  api.gameID = local !== undefined ? local : api.createGame('Scory');

  api.getList();
  setRefreshBtn(api);
  setAddBtn(api);
};

run();