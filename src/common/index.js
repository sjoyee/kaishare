const ENDPOINT =
  "https://10x53vstw6.execute-api.ap-northeast-2.amazonaws.com/production";

export default async function serverRequest(url, method, body = null) {
  const req = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  return await fetch(ENDPOINT + url, req);
}
