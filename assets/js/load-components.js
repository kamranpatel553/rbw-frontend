function loadComponent(elementId, filePath, executeScripts = false) {
  const container = document.getElementById(elementId);
  if (!container) return;

  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filePath}`);
      return response.text();
    })
    .then(html => {
      container.innerHTML = ""; // Clear container just in case
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();

      // Clone and append content
      container.appendChild(tpl.content.cloneNode(true));

      if (executeScripts) {
        // We need to re-create script tags to make them execute
        const scripts = tpl.content.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          for (let i = 0; i < oldScript.attributes.length; i++) {
            newScript.setAttribute(oldScript.attributes[i].name, oldScript.attributes[i].value);
          }
          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = false;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });
      }
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "navbar.html", true);
  loadComponent("footer", "footer.html", false);
});
