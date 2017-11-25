chrome.extension.onRequest.addListener((msg, sender, sendResponse) => {
  if (msg.text && (msg.text === "get_draft_cards")) {
    const draftedCardImages = document.querySelectorAll('img[id^="coll_0_"]');
    const draftedCardSources = [...draftedCardImages].map(image => image.src);

    sendResponse({ cards: draftedCardSources });
  }
});
