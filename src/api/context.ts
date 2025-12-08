// API call to fetch context
export const fetchContext = async () => {
  const response = await fetch("/api/context");
  if (!response.ok) {
    throw new Error("Failed to fetch context");
  }
  return response.json();
};
