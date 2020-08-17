export const ua = window.navigator.userAgent;

function* generatorId() {
  let id = 1;
  while (true) {
    yield `quickapicallback${id++}`;
  }
}

export const idGenerator = generatorId();
