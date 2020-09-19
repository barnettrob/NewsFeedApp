function fetchFeed() {
  const test = fetch("https://www.nationalreview.com/feed/")
  .then(result => result.text())
  .then(data => {
    return data;
  }).then(function(d) {
    return d;
  })

  return test;
}