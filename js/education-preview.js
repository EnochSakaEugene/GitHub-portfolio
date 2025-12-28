document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".edu-card-btn");
    const previewTitle = document.getElementById("previewTitle");
    const previewMeta  = document.getElementById("previewMeta");
    const previewBody  = document.getElementById("previewBody");
    const previewOpen  = document.getElementById("previewOpen");
  
    // Optional logo in preview header
    const previewLogo = document.getElementById("previewLogo");
  
    function renderPreview({ title, src, type }) {
      if (!src) {
        return `<div class="preview-empty">No preview available.</div>`;
      }
  
      if (type === "pdf") {
        return `
          <iframe
            class="preview-frame"
            src="${src}#view=fitH"
            title="${title || "Certificate"}">
          </iframe>
        `;
      }
  
      return `
        <img class="preview-img" src="${src}" alt="${title || "Certificate"}">
      `;
    }
  
    function setLogo(logoSrc, altText) {
      if (!previewLogo) return;
  
      if (!logoSrc) {
        previewLogo.style.display = "none";
        previewLogo.src = "";
        previewLogo.alt = "";
        return;
      }
  
      previewLogo.src = logoSrc;
      previewLogo.alt = altText || "Badge";
      previewLogo.style.display = "block";
    }
  
    function setPreview({ title, meta, src, type, badge, badgeAlt }) {
      previewTitle.textContent = title || "Preview";
      previewMeta.textContent  = meta  || "";
      previewOpen.href = src || "#";
      previewOpen.style.visibility = src ? "visible" : "hidden";
  
      setLogo(badge, badgeAlt);
  
      // Animate: fade out → swap → fade in
      previewBody.classList.remove("is-visible");
      previewBody.classList.add("is-fading");
  
      window.setTimeout(() => {
        previewBody.innerHTML = renderPreview({ title, src, type });
  
        // trigger fade-in
        previewBody.classList.remove("is-fading");
        previewBody.classList.add("is-visible");
      }, 170);
    }
  
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
  
        setPreview({
          title: btn.dataset.title,
          meta:  btn.dataset.meta,
          src:   btn.dataset.preview,
          type:  btn.dataset.type || "img",
          badge: btn.dataset.badge || "",
          badgeAlt: btn.dataset.badgeAlt || ""
        });
      });
    });
  
    // Initialize visible state for smooth first render
    previewBody.classList.add("is-visible");
  
    // Auto-select first card
    if (buttons.length) buttons[0].click();
  });