export function addGlobalClickInternalLink (router) {
  const internalLink = /internal-link/;
  window.addEventListener('click', function (e) {
    const cur = e.target;
    if (internalLink.test(cur.className)) {
      e.stopPropagation();
      e.preventDefault();
      console.log(cur.getAttribute('href'));
      router.push(cur.getAttribute('href'));
    }
  }, false);
}

export default {
  addGlobalClickInternalLink
};
