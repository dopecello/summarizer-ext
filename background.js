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