const createLi = (user, score) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = `${user}: ${score}`;
  li.appendChild(p);

  return li;
};

const refreshList = (objList) => {
  const ul = document.getElementById('ul-list');
  ul.innerHTML = '';

  objList.forEach((obj) => ul.appendChild(createLi(obj.user, obj.score)));
};

const setRefreshBtn = (api) => {
  const btn = document.getElementById('refresh-btn');
  btn.addEventListener('click', () => {
    api.getList();
  });
};

const addToList = (user, score) => {
  const ul = document.getElementById('ul-list');
  ul.appendChild(createLi(user, score));
};

const setAddBtn = (api) => {
  const enterName = document.getElementById('enter-name');
  const enterScore = document.getElementById('enter-score');
  const addBtn = document.getElementById('add-btn');

  addBtn.addEventListener('click', () => {
    api.addScore(enterName.value, enterScore.value);
    addToList(enterName.value, enterScore.value);
  });
};

export { refreshList, setAddBtn, setRefreshBtn };