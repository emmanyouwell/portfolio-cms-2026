import qs from "qs";
interface FetchAPIOptions {
  headers?: Record<string, string>;
  params?: Record<string, object>;
  revalidate?: number; // Optional override for revalidation time
}

/**
 * Helper to get the Strapi URL from environment variables
 * @param path Optional path to append
 * @returns Full URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    }${path}`;
}

/**
 * Fetch API utility for Strapi
 * @param path API endpoint path (e.g. '/articles')
 * @param options Fetch options including headers, params, and revalidate
 * @returns Data from API
 */
export async function fetchAPI(
  path: string,
  options: FetchAPIOptions = {}
) {
  try {
    const { headers = {}, params = {}, revalidate = 60 } = options;

    // Merge default and user options
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        ...headers,
      },
      next: { revalidate },
    };

    // Build request URL
    const queryString = qs.stringify(params);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger fetch
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
      console.error(`Error fetching data from ${requestUrl}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`FetchAPI Error: ${error}`);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
