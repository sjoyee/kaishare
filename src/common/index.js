const ENDPOINT =
  "https://10x53vstw6.execute-api.ap-northeast-2.amazonaws.com/production";

export default function serverRequest(url, method, body = null) {
  const req = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  return fetch(ENDPOINT + url, req).then((response) => {
    console.log(response);
    return response;
  });
}
