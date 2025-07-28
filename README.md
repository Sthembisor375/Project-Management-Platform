# Project Management Dashboard

This is a React + Vite project for managing projects, tickets, clients, and workload.

## Developer Usage Instructions

### 1. Install Dependencies

```
npm install
```

### 2. Run the App in Development Mode

```
npm run dev
```

- The app will start on the default Vite port (usually http://localhost:5173).
- You can now develop and test the application locally.

### 3. Build for Production

```
npm run build
```

- This will generate a production-ready build in the `dist` folder.

---

## User Instructions

### 1. Login
- Start the app and navigate to the login page (`/`).
- Enter your credentials to log in.

### 2. Dashboard Navigation
- Use the sidebar to navigate between Dashboard, Workload, Tickets, Clients, and Settings.
- The active section is highlighted in the sidebar.
- You can collapse or expand the sidebar using the caret icon in the top left.

### 3. Creating Tickets
- Click the "Create Ticket" button in the dashboard section.
- A popup form will appear below the button, aligned next to the sidebar.
- Fill in the ticket details and submit.

### 4. Logging Out
- Click the "Logout" button in the top right of the top bar.
- This will clear your session and redirect you to the login page.

---

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## UI Libraries Used

- **Bootstrap Icons**: This project uses [Bootstrap Icons](https://icons.getbootstrap.com/) for various UI icons.
- **HeadlessUI**: Some components (such as popovers and modals) are built using [HeadlessUI](https://headlessui.com/) for accessible, unstyled UI primitives.
