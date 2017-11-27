chrome.runtime.onMessage.addListener(({ text }, sender, sendResponse) => {
  if (text === "get_draft_cards") {
    const draftedCardImages = document.querySelectorAll('img[id^="coll_0_"]');
    const draftedCardSources = [...draftedCardImages].map(image => image.src);

    sendResponse({ cardURLs: draftedCardSources });
  }
});
