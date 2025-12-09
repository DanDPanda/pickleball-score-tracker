// API call to fetch data
export const fetchData = async () => {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
