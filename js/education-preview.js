document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".edu-card-btn");
    const previewTitle = document.getElementById("previewTitle");
    const previewMeta = document.getElementById("previewMeta");
    const previewBody = document.getElementById("previewBody");
  
    // Optional element (you removed it in HTML)
    const previewOpen = document.getElementById("previewOpen");
  
    // DETER: disable right-click inside preview area
    previewBody.addEventListener("contextmenu", (e) => e.preventDefault());
  
    function setPreview({ title, meta, src }) {
      previewTitle.textContent = title || "Preview";
      previewMeta.textContent = meta || "";
  
      // If link exists, disable it (or keep hidden)
      if (previewOpen) {
        previewOpen.href = "#";
        previewOpen.style.display = "none";
      }
  
      // Fade out
      previewBody.classList.remove("is-visible");
      previewBody.classList.add("is-fading");
  
      setTimeout(() => {
        if (!src) {
          previewBody.innerHTML = `<div class="preview-empty">No preview available.</div>`;
        } else {
          // IMAGE ONLY preview (no PDF iframe)
          previewBody.innerHTML = `
            <img
              class="preview-img"
              src="${src}"
              alt="${title || "Certificate"}"
              draggable="false"
            >
          `;
  
          // DETER: block drag
          const img = previewBody.querySelector(".preview-img");
          if (img) {
            img.addEventListener("dragstart", (e) => e.preventDefault());
          }
        }
  
        // Fade in
        previewBody.classList.remove("is-fading");
        previewBody.classList.add("is-visible");
      }, 180);
    }
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
  
        setPreview({
          title: btn.dataset.title,
          meta: btn.dataset.meta,
          src: btn.dataset.preview
        });
      });
    });
  
    previewBody.classList.add("is-visible");
    if (buttons.length) buttons[0].click();
  });