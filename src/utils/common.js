/**
 * Retrieve data from local storage by key.
 * @param {string} key - The key of the data to retrieve.
 * @param {boolean} isParse - Whether to parse the data as JSON.
 * @returns {*} The retrieved data or parsed data if isParse is true.
 */
export function fetchLocalstorageData(key, isParse = false) {
  const data = localStorage.getItem(key);

  if (isParse && data) {
    return JSON.parse(data);
  }

  return data;
}


/**
 * Store data in local storage by key.
 * @param {string} key - The key under which the data will be stored.
 * @param {*} data - The data to be stored. If the data is an object, it will be JSON-stringified.
 */
export function storeLocalstorageData(key, data) {
    if (typeof data === 'object') {
      // If the data is an object, stringify it to JSON
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  }
  
