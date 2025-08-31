// /api/update.js
export default async function handler(req, res) {
  try {
    // Fetch both APIs concurrently
    const [topstories, anotherApiResponse] = await Promise.all([
      fetch('https://engaging-purely-rabbit.ngrok-free.app/'),
      fetch('https://ajaib-automation.onrender.com/'),
      fetch('https://pythontelethonforwardingmessage-1.onrender.com/')
    ]);
// fetch('https://puppeteer-render-zx37.onrender.com/'),
    // Check if the responses are JSON
   const getStatus = (response) => {
      const status = response.status; // Get the HTTP status code of the response
      return status;
    };

    const topstoriesStatus = getStatus(topstories);
    const anotherApiStatus = getStatus(anotherApiResponse);

    // Log the status codes for debugging
    console.log('Topstories API status:', topstoriesStatus);
    console.log('Another API status:', anotherApiStatus);

    // Respond with the status of both APIs
    res.status(200).json({
      topstoriesStatus: topstoriesStatus, // Status code of the first API
      anotherApiStatus: anotherApiStatus, // Status code of the second API
      fetchedAt: Date.now() // Timestamp for when the check was made
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
}
