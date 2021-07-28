export default class APIHandler {
  constructor(title) {
    this.gameID = this.createGame(title);
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

    return data.result.split(' ')[3];
  }
}