export default function handler(request, response) {
  response.status(200).json({
    message: "DEBUG WORKS!",
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url
  });
}
