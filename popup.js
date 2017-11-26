let collectButton, errorMessage, deckArea;

window.addEventListener('DOMContentLoaded', () => {
  collectButton = document.getElementById('collect');
  errorMessage = document.getElementById('errorMessage');
  deckArea = document.getElementById('deck');

  collectButton.addEventListener('click', () => {
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
});

function createDeck ({ cards }) {
  if (cards.length === 0) {
    deckArea.innerHTML = 'No cards found!';
    deckArea.style.color = 'red';
  }
  else {
    errorMessage.style.display = 'none';
    deckArea.style.color = 'black';

    const cardNames = cards.map(card =>
      card.split('/')[5].split('.')[0]
    );

    const set = cards[0].split('/')[4];

    deckArea.innerHTML = cardNames.reduce((memo, name) => `${memo}${name}<br>`, '');
  }
}
