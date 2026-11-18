// Shared interactions for all three portfolio pages.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  const filterButtons = document.querySelectorAll(".filter-button");
  const projectItems = document.querySelectorAll(".project-detail[data-category]");
  const emptyState = document.querySelector(".empty-state");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      let visible = 0;
      projectItems.forEach(item => {
        const show = category === "all" || item.dataset.category === category;
        item.hidden = !show;
        if (show) visible++;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    });
  });

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name")).trim();
      const email = String(data.get("email")).trim();
      const message = String(data.get("message")).trim();
      // IMPORTANT: Change this address to your real portfolio email.
      const recipient = "hello@example.com";
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      const note = document.querySelector("#form-note");
      note.textContent = "Your email app should open with the message filled in. If it does not, email hello@example.com directly.";
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});