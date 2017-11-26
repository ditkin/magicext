let errorMessage, deckArea, nameDeck, saveDeck, loginArea, success, username, password;

window.addEventListener('DOMContentLoaded', () => {
  nameDeck = document.getElementById('nameDeck');
  saveDeck = document.getElementById('saveDeck');
  errorMessage = document.getElementById('errorMessage');
  deckArea = document.getElementById('deck');
  loginArea = document.getElementById('login');
  success = document.getElementById('success');
  username = document.getElementById('username');
  password = document.getElementById('password');

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

function createDeck ({ cards }) {
  if (cards.length === 0) {
    deckArea.innerHTML = 'No cards found!';
    deckArea.style.color = 'red';
  }
  else {
    nameDeck.style.display = 'block';
    saveDeck.style.display = 'block';
    errorMessage.style.display = 'none';
    deckArea.style.color = 'black';

    const cardNames = cards.map(card =>
      card.split('/')[5].split('.')[0]
    );

    const set = cards[0].split('/')[4];

    deckArea.innerHTML = cardNames.reduce((memo, name) => `${memo}${name}<br>`, '');

    saveDeck.addEventListener('click', () => {
      fetch('http://localhost:1234/deck', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          name: nameDeck.value,
          cards: cardNames,
          set,
        }),
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
