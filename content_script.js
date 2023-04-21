function getSummary(text, maxLength) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'FETCH_SUMMARY', text, maxLength },
      (response) => {
        if (response.success) {
          resolve(response.summary);
        } else {
          reject(response.error);
        }
      }
    );
  });
}

// functions to extract text from the page
function extractPageText() {
  return document.body.innerText;
}

function extractSelectedText() {
  const selection = window.getSelection();
  return selection.toString();
}

function getTextToSummarize() {
  const selectedText = extractSelectedText();
  return selectedText ? selectedText : extractPageText();
}

// functions to display the summary
function displaySummary() {
  const textToSummarize = getTextToSummarize();
  const maxLength = 100; // will dynamically change this later

  getSummary(textToSummarize, maxLength)
    .then((summary) => {
      // Display the summary using your preferred method
      alert(summary);
    })
    .catch((error) => {
      console.error('Error fetching summary:', error);
    });
}

document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      displaySummary();
    }
  }); // Ctrl + S will display the summary for the selected text or the page text if no text is selected
