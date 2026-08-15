# NOVA General Contractor LLC website

Lightweight, dependency-free website built with semantic HTML, CSS, and JavaScript.

## Preview locally

Open `index.html` in a browser, or run any simple static web server from this directory.

## Content that is ready to edit

- Services are stored in the `services` array near the top of `script.js`.
- Featured project entries are stored in the `featuredProjects` array in `script.js`.
- Presentation-photo sources are documented in `PHOTO-CREDITS.md`.
- Contact information and page copy are in `index.html`.
- Colors and layout tokens are at the top of `styles.css`.

## Adding a verified project

Replace a presentation entry in `featuredProjects` with confirmed information:

```js
{
  title: "Confirmed project title",
  category: "kitchen",
  categoryLabel: "Kitchen",
  description: "Confirmed project description.",
  image: "assets/projects/project-name.jpg",
  alt: "Accurate description of the completed NOVA project",
}
```

For a real Before/After comparison, use `beforeImage`, `afterImage`, `beforeAlt`, and `afterAlt` instead of `image` and `alt`. Do not enable this without a verified pair from the same NOVA project.

## Before launch

- Connect the estimate form to a secure form endpoint or backend. The current form validates input but intentionally does not claim to send it.
- Replace all presentation photography with approved NOVA photography and verified project descriptions.
- Confirm the exact service list, service area, and business hours.
- Add the final production URL and a real Open Graph image.
- Add `GeneralContractor` structured data after the location/service-area details are confirmed.
