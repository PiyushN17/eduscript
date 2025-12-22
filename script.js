const startBtn = document.getElementById("start");
const exploreBtn = document.getElementById("explore");
const overlay = document.getElementById("popupOverlay");
const closePopup = document.querySelector(".close-popup");
const popupCloseIcon = document.querySelector(".popup-close-icon");

function openPopup() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePopupModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    openPopup();
  });
}

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    const topicsSection = document.querySelector(".topics-section");
    if (topicsSection) {
      topicsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (closePopup) {
  closePopup.addEventListener("click", closePopupModal);
}

if (popupCloseIcon) {
  popupCloseIcon.addEventListener("click", closePopupModal);
}

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePopupModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
    closePopupModal();
  }
});
