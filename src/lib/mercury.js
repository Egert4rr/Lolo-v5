import axios from "axios";

const MERCURY_API_URL =
  "https://uptime-mercury-api.azurewebsites.net/webparser";

export async function fetchCleanedContent(url) {
  try {
    const response = await axios.post(MERCURY_API_URL, { url });
    return response.data;
  } catch (error) {
    console.error("Error fetching cleaned content from Mercury API:", error);
    throw error;
  }
}
