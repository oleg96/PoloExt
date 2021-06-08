export default function validateResponse(response) {

  if (!response.ok) {

    return false;
  }

  return true;
}
