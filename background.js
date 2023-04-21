async function fetchSummary(text, maxLength) {
  const response = await fetch('http://localhost:3000/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, maxLength }),
  });

  if (!response.ok) {
    throw new Error('Error fetching summary');
  }

  const data = await response.json();
  return data.summary;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH_SUMMARY') {
    fetchSummary(request.text, request.maxLength)
      .then((summary) => {
        sendResponse({ success: true, summary });
      })
      .catch((error) => {
        console.error('Error fetching summary:', error);
        sendResponse({ success: false, error: 'Error fetching summary' });
      });

    // Indicate that the response will be sent asynchronously
    return true;
  }
});
