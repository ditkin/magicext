let collectButton, errorMessage, deckArea;


chrome.runtime.onMessage.addListener(({ from, subject, cardNames, set }) => {
  if (from === 'background' && subject === 'newDeck') {
    if (cardNames.length) {
      deckArea.innerHTML = cardNames.toString();
    }
    else {
      errorMessage.style.display = null;
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  collectButton = document.getElementById('collect');
  errorMessage = document.getElementById('error');
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
  errorMessage.style.display = 'none';

  const cardNames = cards.map(card =>
    card.split('/')[5].split('.')[0]
  );

  const set = cards[0].split('/')[4];

  if (cardNames.length) {
    deckArea.innerHTML = cardNames.toString();
  }
  else {
    errorMessage.style.display = null;
  }

  //fetch('api.com/deck', {
    //body: {
      //cardNames,
      //set,
    //},
  //})
    //.then();

}
