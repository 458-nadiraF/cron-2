// /api/update.js
export default async function handler(req, res) {
  try {
    // Fetch both APIs concurrently
    const [topstories, anotherApiResponse] = await Promise.all([
      fetch('https://puppeteer-render-zx37.onrender.com/'),
      fetch('https://ajaib-automation.onrender.com/')
    ]);

    // Check if the responses are JSON
    const checkJsonResponse = (response) => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json(); // Return parsed JSON
      } else {
        return response.text(); // Return raw text for non-JSON responses
      }
    };

    const topstoriesData = await checkJsonResponse(topstories);
    const anotherApiData = await checkJsonResponse(anotherApiResponse);

    // If any API returns non-JSON, log and return an error
    if (typeof topstoriesData === 'string') {
      console.error('Topstories API did not return JSON:', topstoriesData);
      return res.status(500).json({ success: false, message: 'Topstories API did not return JSON' });
    }

    if (typeof anotherApiData === 'string') {
      console.error('Another API did not return JSON:', anotherApiData);
      return res.status(500).json({ success: false, message: 'Another API did not return JSON' });
    }

    // If both responses are JSON, proceed with combining the data
    res.status(200).json({
      topStoryId: topstoriesData[0], // First API response
      anotherApiData: anotherApiData, // Second API response
      fetchedAt: Date.now() // Add a timestamp of when the data was fetched
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
}
