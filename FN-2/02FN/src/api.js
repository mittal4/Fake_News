const API_URL = '/predict';

export const checkText = async (text) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError('Response is not JSON');
    }

    const data = await response.json();
    if (!data || typeof data.prediction !== 'string') {
      throw new Error('Invalid response format');
    }

    return data.prediction;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process text. Please try again.');
  }
};

export const checkUrl = async (url) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.prediction;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process URL. Please try again.');
  }
};