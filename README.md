# Leeta

This repository contains my submission for the frontend developer take-home assessment for **Leeta**.

The focus of this project was on core frontend logic, clean and modular code structure, and solid functionality. The application simulates a core part of an e-commerce platform: browsing products, filtering, searching, managing favorites, and interacting with a shopping cart.

In addition to the web implementation, I also created a mobile version of the project to demonstrate multi-platform capability. The APK file can be downloaded using the link below.

## Mobile Version

**Download APK**: [https://expo.dev/accounts/gabbykarry/projects/chippa-fun/builds/9015f699-ec3f-4d54-97cc-55b109db07b6](#)

The mobile version is built using React Native (with Expo) and mirrors the core product listing and interaction experience from the web. It is organized in its own branch (`mobile`).

---

## Assessment Overview

**Estimated Time for Submission**: 72 hours
**Tech Stack**: React, TypeScript, Tailwind CSS, Zustand (state management)

### Task Summary

#### 1. Build a Product Listing Filter Component

- Users can filter products by:
  - Category
  - Price range (min-max)
  - Vendor name

- Filters are real-time, stateful, and applied without external libraries
- Edge cases (e.g., empty list, no matches) are handled gracefully

#### 2. Implement a Debounced Product Search

- A search bar filters products by name
- Custom-built 500ms debounce logic
- No external debounce libraries used

#### 3. Favorite System Using LocalStorage

- Users can favorite/unfavorite products by toggling a heart icon
- Favorites persist across page refresh using localStorage
- Users can filter to view only favorite products

#### Bonus: Responsive Layout

- Fully responsive layout for both desktop and mobile views
- Product grid and cart adapt cleanly across breakpoints
- Mobile devices feature a floating cart toggle for optimized experience

---

## Features Implemented

- Real-time filtering by multiple criteria
- Debounced search for product names
- Persistent favorites using localStorage
- Add-to-cart functionality with quantity updates and removal
- Responsive cart sidebar (desktop) and slide-in drawer (mobile)
- Zustand for global state management
- Fully modular component architecture

---

## How to Run (Web)

```bash
# Clone the repo
# main branch for web, mobile branch for mobile
https://github.com/gabbykarry/leeta.git

# Navigate into the web project directory
cd leeta

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## Deployment

**Live Demo**: [https://leeta-inky.vercel.app/](#)

---

## Folder Structure

```
src/
  components/        // UI components
  data/              // Mock product data
  store/             // Zustand store for state management
  types/             // TypeScript interfaces and types
  App.tsx            // Main app container
```

---

## Final Notes

This project was built with clarity, performance, and extensibility in mind. The code is organized, well-typed, and cleanly separated by concern. I ensured each requirement of the assessment was carefully implemented and extended it with a mobile version for good measure.

Thanks.
