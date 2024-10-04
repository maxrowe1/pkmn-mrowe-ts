import { Game } from "./classes/Game";


function getHeaders(): Headers {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  return headers
}

export async function fetchGame<T>(url: string, method: string): Promise<T|null> {
  const host: string = 'http://127.0.0.1:5000';

  const request: RequestInfo = new Request(`${host}/${url}`, {
    method: method,
    headers: getHeaders()
  })

  try {
    const res = await fetch(request);
    const res_1 = await res.json();
    return res_1;
  } catch (e) {
    console.error(e)
    alert("Error collecting game data; servers may be down.")
    return null;
  }
}

// Function to send a PUT request
export async function sendPutRequest(game: Game) {
  try {
      const host: string = 'http://127.0.0.1:5050';
      
      const response = await fetch(`${host}/battle/update`, {
          method: 'PUT', // Specify the HTTP method
          headers: getHeaders(),
          body: JSON.stringify(game)
      });

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  } catch (error) {
      console.error('Error sending PUT request:', error);
  }
}
