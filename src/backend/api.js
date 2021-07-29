/* eslint-disable prefer-destructuring */
import { refreshList } from '../frontend/list';

export default class APIHandler {
  constructor() {
    this.gameID = '';
  }

  createGame = async (title) => {
    const result = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
        }),
      },
    );

    const data = await result.json();
    this.gameID = data.result.split(' ')[3];
    this.gameIDtoStorage();
    this.getList();
  };

  setGameId = (gameID) => {
    this.gameID = gameID;
  }

  gameIDtoStorage = () => {
    const stringy = JSON.stringify({ gameID: this.gameID });
    localStorage.setItem('gameID', stringy);
  }

  gameIDfromStorage = (key) => {
    const object = JSON.parse(localStorage.getItem(key));
    return object?.gameID;
  }

  getList = async () => {
    const gameID = this.gameIDfromStorage('gameID');
    const result = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`);

    const list = await result.json();
    refreshList(list.result);
  }

  addScore = async (user, score) => {
    const gameID = this.gameIDfromStorage('gameID');
    const result = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          score,
        }),
      },
    );

    return result.json();
  }
}

/* eslint-enable prefer-destructuring */