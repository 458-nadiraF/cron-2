// /api/update.js
export default async function handler(req, res) {
  try {
    // Send GET requests concurrently to two different APIs
    const [topstories, anotherApiResponse] = await Promise.all([
      fetch('https://puppeteer-render-zx37.onrender.com/').then((res) => res.json()),
      fetch('https://ajaib-automation.onrender.com/').then((res) => res.json())  // Second API
    ]);

    // Respond with the combined data from both APIs
    res.status(200).json({
      topStoryId: topstories[0],  // First API response
      anotherApiData: anotherApiResponse, // Second API response
      fetchedAt: Date.now()  // Add a timestamp of when the data was fetched
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
}
