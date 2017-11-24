const collectButton = document.getElementById('collect');
const errorMessage = document.getElementById('error');

const draftedCardImages = [...document.querySelectorAll('img[id^="coll_0_"]')]
const draftedCardNames = draftedCardImages.map(img =>
  img.src.split('/')[5].split('.')[0]
);

chrome.browserAction.onClicked.addListener(function(tab) {
  var button = document.getElementById("mybutton");
  if(button == null){
    alert("null!");
  }
  else{
    alert("found!");
  }
});

collectButton.addEventListener('click', () => {
  errorMessage.style.display = 'none';
  if (draftedCardImages === null || draftedCardImages.length === 0) {
    errorMessage.style.display = null;
  }

  const set = draftedCardImages[0].src.split('/')[4];
  fetch('api.com/deck', {
    body: {
      draftedCardNames,
      set,
    },
  })
    .then();
});
