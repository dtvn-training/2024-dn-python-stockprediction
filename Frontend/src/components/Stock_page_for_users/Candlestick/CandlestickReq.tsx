

const API_BASE_URL = "http://127.0.0.1:5000";


export const getStockImage = async (symbol: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock-chart/${symbol}`);
    const data = await response.json();
    console.log(data)
    return data.chart_data;
  } catch (error) {
    console.error("Error fetching stock image:", error);
    throw error;
  }
};

