import { bagHandle, car, fastFood, helpOutline } from "ionicons/icons";

const ENDPOINT =
  "https://10x53vstw6.execute-api.ap-northeast-2.amazonaws.com/production";

export async function serverRequest(url, method, body = null) {
  const req = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  return fetch(ENDPOINT + url, req);
}

export function categoryIcon(category) {
  switch (category) {
    case "food":
      return fastFood;
    case "taxi":
      return car;
    case "product":
      return bagHandle;
  }
  return helpOutline;
}

export function categoryTitle(category) {
  switch (category) {
    case "food":
      return "Food Delivery";
    case "taxi":
      return "Taxi Pool";
    case "product":
      return "Product Delivery";
  }
  return "Unknown Category";
}
