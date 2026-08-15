"use strict";

// Edit this list when NOVA confirms its final service offering.
const services = [
  {
    name: "Kitchen Remodeling",
    description: "Kitchen renovation options can be discussed and scoped during your estimate.",
    image: "assets/images/service-kitchen.jpg",
    alt: "Remodeled kitchen with white cabinetry, stone island, and pendant lighting",
    position: "center",
  },
  {
    name: "Bathroom Remodeling",
    description: "Bathroom renovation options can be discussed and scoped during your estimate.",
    image: "assets/images/bathroom-light.jpg",
    alt: "Contemporary gray and white bathroom with a walk-in shower and clean-lined fixtures",
    position: "center",
  },
  {
    name: "Interior Renovation",
    description: "Interior renovation options can be discussed and scoped around the needs of your space.",
    image: "assets/images/service-interior-living.jpg",
    alt: "Warm modern living room with neutral finishes and abundant natural light",
    position: "center",
  },
  {
    name: "Exterior Renovation",
    description: "Exterior renovation options can be discussed and scoped during your estimate.",
    image: "assets/images/service-exterior-home.jpg",
    alt: "Updated blue residential exterior with contrasting trim and landscaped entry",
    position: "62% center",
  },
  {
    name: "Flooring",
    description: "Flooring work can be reviewed as part of the project scope during your estimate.",
    image: "assets/images/service-flooring.jpg",
    alt: "Bright empty room with newly installed wood flooring and white walls",
    position: "center",
  },
  {
    name: "Painting",
    description: "Painting needs can be reviewed as part of an interior or exterior project estimate.",
    image: "assets/images/service-painting.jpg",
    alt: "Freshly finished room with light walls, wood floors, and large windows",
    position: "center",
  },
  {
    name: "Repairs & Improvements",
    description: "Share the improvement or repair you have in mind so NOVA can review the requested scope.",
    image: "assets/images/service-repairs.jpg",
    alt: "Minimal residential staircase with refined wood and plaster details",
    position: "center 46%",
  },
];

// Temporary presentation images demonstrate the future gallery layout only.
// Replace each object with verified NOVA project information and photography.
const featuredProjects = [
  {
    title: "Kitchen Renovation",
    category: "kitchen",
    categoryLabel: "Kitchen",
    description: "A focused presentation for kitchen layouts, surfaces, cabinetry, and finish details.",
    image: "assets/images/project-kitchen.jpg",
    alt: "Contemporary white kitchen with a central island, wood accents, and natural light",
    position: "center",
  },
  {
    title: "Bathroom Remodel",
    category: "bathroom",
    categoryLabel: "Bathroom",
    description: "A clean format for documenting material selections, fixtures, and finished spaces.",
    image: "assets/images/project-bathroom-modern.jpg",
    alt: "Contemporary bathroom with custom cabinetry, double vanity, and a tiled walk-in shower",
    position: "64% center",
  },
  {
    title: "Interior Renovation",
    category: "interior",
    categoryLabel: "Interior",
    description: "An editorial view designed to highlight proportion, finishes, and the character of a space.",
    image: "assets/images/project-interior-modern.jpg",
    alt: "Modern living room with textured walls, a large window, and restrained neutral finishes",
    position: "center 54%",
  },
];

const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

function setMenu(open) {
  if (!menuButton || !mobileNav) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  mobileNav.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

const serviceList = document.querySelector("[data-service-list]");
const servicePanel = document.querySelector(".service-summary");
const serviceCount = document.querySelector("[data-service-count]");
const serviceTitle = document.querySelector("[data-service-title]");
const serviceDescription = document.querySelector("[data-service-description]");
const serviceMedia = document.querySelector("[data-service-media]");
const serviceImage = document.querySelector("[data-service-image]");

function selectService(index, moveFocus = false) {
  const service = services[index];
  if (!service) return;

  serviceList?.querySelectorAll("[role='tab']").forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });

  if (serviceCount) {
    serviceCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`;
  }
  if (serviceTitle) serviceTitle.textContent = service.name;
  if (serviceDescription) serviceDescription.textContent = service.description;
  if (serviceMedia) serviceMedia.dataset.serviceIndex = String(index);
  if (serviceImage) {
    serviceImage.src = service.image;
    serviceImage.alt = service.alt;
    serviceImage.style.objectPosition = service.position || "center";
  }
  if (servicePanel) servicePanel.setAttribute("aria-labelledby", `service-tab-${index}`);
}

if (serviceList && servicePanel) {
  servicePanel.id = "service-panel";
  servicePanel.setAttribute("role", "tabpanel");

  services.forEach((service, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "service-tab";
    tab.id = `service-tab-${index}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "service-panel");
    tab.setAttribute("aria-selected", String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;

    const number = document.createElement("span");
    number.className = "service-tab-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const label = document.createElement("span");
    label.className = "service-tab-label";
    label.textContent = service.name;

    tab.append(number, label);
    tab.addEventListener("click", () => selectService(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % services.length;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + services.length) % services.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = services.length - 1;
      selectService(nextIndex, true);
    });

    serviceList.append(tab);
  });

  selectService(0);
}

const projectGrid = document.querySelector("[data-project-grid]");
const projectFilters = document.querySelector("[data-project-filters]");
let activeProjectFilter = "all";
const projectDialog = document.querySelector("[data-project-dialog]");
const projectDialogGrid = document.querySelector("[data-project-dialog-grid]");
const projectDialogClose = document.querySelector("[data-project-dialog-close]");

function projectVisual(project) {
  if (project.beforeImage && project.afterImage) {
    return `
      <div class="before-after" data-before-after style="--after-start: 50%">
        <img src="${project.beforeImage}" alt="${project.beforeAlt || `Before view of ${project.title}`}" />
        <div class="before-after-after">
          <img src="${project.afterImage}" alt="${project.afterAlt || `After view of ${project.title}`}" />
        </div>
        <input type="range" min="0" max="100" value="50" aria-label="Compare before and after images" data-before-after-control />
      </div>`;
  }

  return `<div class="project-visual"><img src="${project.image}" alt="${project.alt || project.title}" loading="lazy" decoding="async" style="object-position: ${project.position || "center"}" /></div>`;
}

function availableProjects() {
  if (activeProjectFilter === "all") return featuredProjects.map((project, index) => ({ project, index }));
  return featuredProjects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => project.category === activeProjectFilter);
}

function projectCard(project, index, compact = false) {
  const article = document.createElement("article");
  article.className = compact ? "dialog-project" : `project-card project-card-${index + 1}`;
  article.innerHTML = `
    ${projectVisual(project)}
    <div class="project-card-copy">
      <p class="project-number">${String(index + 1).padStart(2, "0")}</p>
      <div>
        <p class="project-category">${project.categoryLabel}</p>
        <h3>${project.title}</h3>
        ${compact ? `<p>${project.description}</p>` : ""}
      </div>
    </div>`;

  const comparison = article.querySelector("[data-before-after]");
  const comparisonControl = article.querySelector("[data-before-after-control]");
  comparisonControl?.addEventListener("input", () => {
    comparison.style.setProperty("--after-start", `${comparisonControl.value}%`);
  });
  return article;
}

function renderProjectGrid() {
  if (!projectGrid) return;
  projectGrid.replaceChildren();
  const entries = availableProjects();
  projectGrid.classList.toggle("is-filtered", activeProjectFilter !== "all");
  entries.forEach(({ project, index }) => projectGrid.append(projectCard(project, index)));
}

renderProjectGrid();

if (projectFilters) {
  projectFilters.hidden = false;
  projectFilters.querySelectorAll("button").forEach((filter) => {
    if (filter.dataset.filter !== "all") {
      filter.hidden = !featuredProjects.some((project) => project.category === filter.dataset.filter);
    }
    filter.addEventListener("click", () => {
      activeProjectFilter = filter.dataset.filter;
      projectFilters.querySelectorAll("button").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filter));
      });
      renderProjectGrid();
    });
  });
}

const viewProjectsButton = document.querySelector("[data-view-projects]");
viewProjectsButton?.addEventListener("click", () => {
  if (!projectDialog || !projectDialogGrid) return;
  projectDialogGrid.replaceChildren();
  featuredProjects.forEach((project, index) => projectDialogGrid.append(projectCard(project, index, true)));
  projectDialog.showModal();
});

projectDialogClose?.addEventListener("click", () => projectDialog?.close());
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const fileInput = document.querySelector("[data-file-input]");
const fileSummary = document.querySelector("[data-file-summary]");

fileInput?.addEventListener("change", () => {
  if (!fileSummary) return;

  const files = Array.from(fileInput.files || []);
  if (!files.length) {
    fileSummary.textContent = "JPG, PNG or WEBP · Multiple files allowed";
    return;
  }

  const previewNames = files.slice(0, 2).map((file) => file.name).join(", ");
  const remaining = files.length > 2 ? ` + ${files.length - 2} more` : "";
  fileSummary.textContent = `${files.length} photo${files.length === 1 ? "" : "s"} selected: ${previewNames}${remaining}`;
});

const estimateForm = document.querySelector("[data-estimate-form]");
const formStatus = document.querySelector("[data-form-status]");

function validateEstimateForm() {
  if (!estimateForm) return false;

  let valid = true;
  const requiredFields = estimateForm.querySelectorAll("input[required]:not([type='radio']), select[required], textarea[required]");
  requiredFields.forEach((field) => {
    const fieldValid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!fieldValid));
    if (!fieldValid) valid = false;
  });

  const contactOptions = Array.from(estimateForm.querySelectorAll("input[name='contactMethod']"));
  const contactFieldset = estimateForm.querySelector(".contact-method");
  const contactSelected = contactOptions.some((option) => option.checked);
  contactFieldset?.setAttribute("aria-invalid", String(!contactSelected));
  if (!contactSelected) valid = false;

  return valid;
}

estimateForm?.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
});

estimateForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = validateEstimateForm();

  if (!valid) {
    if (formStatus) formStatus.textContent = "Please complete the required fields before continuing.";
    estimateForm.querySelector("[aria-invalid='true']")?.focus();
    return;
  }

  if (formStatus) {
    formStatus.textContent = "Form validated. Secure delivery must be connected before the site goes live; this preview has not sent your request.";
  }
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
