/* eslint-disable prefer-destructuring */

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
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify({
          name: title,
        }),
      },
    );

    const data = await result.json();

    this.gameID = data.result.split(' ')[3];
  };

  gameIDtoStorage = (gameID) => {
    const stringy = JSON.stringify({ gameID });
    localStorage.setItem('gameID', stringy);
  }

  gameIDfromStorage = (key) => {
    const object = JSON.parse(localStorage.getItem(key));
    return object.gameID;
  }

  refreshList = async (gameID) => {
    const result = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`);

    return result.json();
  }

  addScore = async (gameID, name, score) => {
    const result = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify({
          name,
          score,
        }),
      },
    );

    return result.json();
  }
}

/* eslint-enable prefer-destructuring */