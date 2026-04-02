const checklistItems = [...document.querySelectorAll(".prep-check")];
const reminderButtons = [...document.querySelectorAll(".reminder-chip")];

const progressText = document.querySelector("#progress-text");
const preparednessText = document.querySelector("#preparedness-text");
const focusTopic = document.querySelector("#focus-topic");
const focusCopy = document.querySelector("#focus-copy");
const savedStatus = document.querySelector("#saved-status");
const resetChecklistButton = document.querySelector("#reset-checklist");
const kitForm = document.querySelector("#kit-form");
const householdCountInput = document.querySelector("#household-count");
const supplyDaysInput = document.querySelector("#supply-days");
const specialNoteInput = document.querySelector("#special-note");
const waterTotal = document.querySelector("#water-total");
const mealTotal = document.querySelector("#meal-total");
const flashlightTotal = document.querySelector("#flashlight-total");
const batteryTotal = document.querySelector("#battery-total");
const plannerNote = document.querySelector("#planner-note");
const printAllCardsButton = document.querySelector("#print-all-cards");
const printFeedback = document.querySelector("#print-feedback");
const printCardToggles = [...document.querySelectorAll(".print-card-toggle")];

const checklistStorageKey = "ruralGuardianChecklist";
let printFeedbackTimeoutId = null;

const reminderCopy = {
  "Storm shelter access":
    "Make sure everyone in the household knows where to go and how to get there quickly.",
  "Backup communication plans":
    "Choose one contact outside the area in case local cell service becomes unreliable.",
  "Medication and first-aid checks":
    "Review prescriptions, refill timing, and first-aid supplies before storm season peaks.",
  "Password and device protection":
    "Turn on device updates and use strong, unique passwords for key family accounts."
};

function saveChecklistState() {
  const state = checklistItems.map((item) => item.checked);
  localStorage.setItem(checklistStorageKey, JSON.stringify(state));
  savedStatus.textContent = "Checklist progress saved on this device.";
}

function loadChecklistState() {
  const stored = localStorage.getItem(checklistStorageKey);

  if (!stored) {
    return;
  }

  try {
    const state = JSON.parse(stored);

    checklistItems.forEach((item, index) => {
      item.checked = Boolean(state[index]);
    });
  } catch (error) {
    savedStatus.textContent = "Checklist could not be restored, but you can start fresh.";
  }
}

function updateProgress() {
  const completed = checklistItems.filter((item) => item.checked).length;
  progressText.textContent = `${completed} of ${checklistItems.length} done`;

  if (completed === checklistItems.length) {
    preparednessText.textContent = "Ready to review monthly";
  } else if (completed >= 3) {
    preparednessText.textContent = "Building momentum";
  } else if (completed >= 1) {
    preparednessText.textContent = "Making progress";
  } else {
    preparednessText.textContent = "Getting started";
  }
}

function setReminder(topic) {
  focusTopic.textContent = topic;
  focusCopy.textContent = reminderCopy[topic];

  reminderButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.topic === topic);
  });
}

function updateKitPlanner() {
  const householdCount = Math.max(1, Number(householdCountInput.value) || 1);
  const supplyDays = Math.max(1, Number(supplyDaysInput.value) || 1);
  const totalWater = householdCount * supplyDays;
  const totalMeals = householdCount * supplyDays * 3;
  const flashlightRangeMin = Math.max(2, Math.ceil(householdCount / 2));
  const flashlightRangeMax = Math.max(flashlightRangeMin, householdCount);
  const batterySets = Math.max(2, flashlightRangeMin * 2);
  const specialNote = specialNoteInput.value.trim();

  waterTotal.textContent = `${totalWater} gallon${totalWater === 1 ? "" : "s"}`;
  mealTotal.textContent = `${totalMeals} simple meal${totalMeals === 1 ? "" : "s"}`;
  flashlightTotal.textContent = `${flashlightRangeMin} to ${flashlightRangeMax} lights`;
  batteryTotal.textContent = `${batterySets} spare sets`;
  plannerNote.textContent = specialNote
    ? `Remember to add extra supplies for: ${specialNote}.`
    : "Add extra supplies for medications, infants, pets, and anyone who relies on medical equipment.";
}

function showPrintFeedback(message) {
  if (!printFeedback) {
    return;
  }

  printFeedback.textContent = message;
  printFeedback.classList.add("is-visible");

  window.clearTimeout(printFeedbackTimeoutId);
  printFeedbackTimeoutId = window.setTimeout(() => {
    printFeedback.classList.remove("is-visible");
    printFeedback.textContent = "";
  }, 2200);
}

function setPrintCardOpenState(toggle, isOpen) {
  const card = toggle.closest(".print-card");
  const body = card?.querySelector(".print-card-body");
  const icon = toggle.querySelector(".print-card-icon");

  if (!card || !body || !icon) {
    return;
  }

  card.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  body.hidden = !isOpen;
  icon.textContent = isOpen ? "−" : "+";
}

checklistItems.forEach((item) => {
  item.addEventListener("change", () => {
    updateProgress();
    saveChecklistState();
  });
});

reminderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setReminder(button.dataset.topic);
  });
});

resetChecklistButton.addEventListener("click", () => {
  checklistItems.forEach((item) => {
    item.checked = false;
  });

  updateProgress();
  saveChecklistState();
  savedStatus.textContent = "Checklist reset for a fresh start.";
});

kitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateKitPlanner();
});

kitForm.addEventListener("input", () => {
  updateKitPlanner();
});

if (printAllCardsButton) {
  printAllCardsButton.addEventListener("click", () => {
    showPrintFeedback("Opening print dialog for all preparedness cards...");
    window.setTimeout(() => {
      window.print();
    }, 180);
  });
}

printCardToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setPrintCardOpenState(toggle, !isOpen);
  });
});

loadChecklistState();
updateProgress();
updateKitPlanner();
