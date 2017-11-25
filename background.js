
function createDeck ({ cards }) {
  const cardNames = cards.map(card =>
    card.split('/')[5].split('.')[0]
  );
  alert(cardNames[0]);
  const set = cards[0].split('/')[4];

  chrome.runtime.sendMessage({
    from: 'background',
    subject: 'newDeck',
    cardNames,
    set,
  });

  fetch('api.com/deck', {
    body: {
      cardNames,
      set,
    },
  })
    .then();

}

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
  chrome.tabs.sendMessage(tab.id, { text: "get_draft_cards" }, null, createDeck);
});





