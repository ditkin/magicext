chrome.runtime.onInstalled.addListener(() => {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'draftsim' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(
      tab.id,
      {text: 'get_draft_cards'},
      null,
      createDeck,
    );
});

function createDeck ({ cards }) {
  alert(arguments.toString);
  errorMessage.style.display = 'none';

  const cardNames = cards.map(card =>
    card.split('/')[5].split('.')[0]
  );
  alert(cardNames[0]);
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
