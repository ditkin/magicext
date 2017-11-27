let creator, errorMessage, deckArea, nameDeck, saveDeck, loginArea, success, username, password;

function resizePopupWindow() {
  const body = document.body;
  body.style.height = '400px';
  body.style.width = '200px';
}

window.addEventListener('DOMContentLoaded', () => {
  nameDeck = document.getElementById('nameDeck');
  saveDeck = document.getElementById('saveDeck');
  errorMessage = document.getElementById('errorMessage');
  deckArea = document.getElementById('deck');
  loginArea = document.getElementById('login');
  success = document.getElementById('success');
  username = document.getElementById('username');
  password = document.getElementById('password');
  creator = document.getElementById('creator');

  resizePopupWindow();

  nameDeck.addEventListener('keyup', e => {
    e.target.style.border = '1px solid black';
    errorMessage.style.display = 'none';
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {text: 'get_draft_cards'},
      null,
      createDeck,
    );
  });
});

function createDeck ({ cardURLs }) {
  if (cardURLs.length === 0) {
    errorMessage.style.display = 'block';
    deckArea.style.color = 'red';
  }
  else {
    document.body.style.height = `${cardURLs.length * 14}px`;
    creator.style.display = 'block';

    const set = cardURLs[0].split('/')[4];
    const cards = cardURLs.map(card =>
      card.split('/')[5].split('.')[0]
    );

    renderDeckList(cards);

    saveDeck.addEventListener('click', () => {
      const name = nameDeck.value;
      if (!name) {
        return renderNameError();
      }
      return fetch('http://localhost:1234/deck', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ name, cards, set }),
      })
        .then(({ status }) => status === 200
          ? renderSuccess()
          : renderLogin()
        );
    })
  }
}

function renderLogin () {
  creator.style.display = 'none';
  username.addEventListener('keyup', e =>
    e.target.style.color = 'black'
  )

  password.addEventListener('keyup', e => {
    e.target.style.color = 'black';
    const code = e.keyCode || e.which;
    if (code === '13') {
      fetch('http://localhost:1234/login', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          user: username.value,
          pass: password.value,
        }),
      })
        .then(({ status }) => status === 200
          ? renderCreator()
          : renderFailedLogin()
        );
    }
  })

  login.style.display = 'block';
}

function renderDeckList (names) {
  const deckListHTML = names.reduce((memo, name) =>
    `${memo}${name}<br>`, ''
  );

  deckArea.innerHTML = deckListHTML;
}
function renderFailedLogin () {
  username.style.color = 'red';
  username.value = null;

  password.style.color = 'red';
  password.value = null;
}

function renderSuccess () {
  creator.style.display = 'none';
  success.style.display = 'block';
}

function renderCreator () {
  login.style.display = 'none';
  creator.style.display = 'block';
}

function renderNameError () {
  nameDeck.style.border = '1px solid red';
  errorMessage.innerHTML = 'Please enter a name.';
  errorMessage.style.display = 'block';
}
