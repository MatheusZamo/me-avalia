const request = ({ url, onSuccess, onFinally }) => {
  fetch(url)
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => alert(error.message))
    .finally(onFinally)
}

export { request }
