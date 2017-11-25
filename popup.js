const collectButton = document.getElementById('collect');
const errorMessage = document.getElementById('error');
const deckArea = document.getElementById('deck');

errorMessage.style.display = 'none';

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

