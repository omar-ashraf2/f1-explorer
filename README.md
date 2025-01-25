# Formula One Explorer

## Live Preview

You can access the live version of the **Formula One Explorer** at:  
[**Formula One Explorer - Live Preview**](https://f1-explorer.vercel.app/)

## Overview

The **Formula One Explorer** is a web application that allows users to explore Formula 1 seasons, races, and driver details using the **Ergast API**. Built with **React** and **TypeScript**, the application provides a modular, performant, and responsive interface to interact with Formula 1 data.

## Features

- **Season Listing**: Displays all available Formula 1 seasons with pagination and toggle between List view and Card view.
- **Races for a Season**: Fetches races for the selected season with pagination. Users can pin favorite races, and the pinned races persist after a page refresh.
- **Race Details**: Shows detailed information about each race, including participating drivers and their performance, visualized using charts.

## Technical Approach & Architectural Decisions

### Frontend Framework

- **React**: Used for its component-based architecture, which makes it easy to build and maintain modular and scalable UIs.
- **TypeScript**: Ensures type safety and improves maintainability, reducing the potential for runtime errors in a complex application.
- **React Router**: Utilized to handle navigation between pages, enabling a seamless user experience.

### State Management

- **Context API**: Used for managing global state, such as pinning favorite races, ensuring shared state across components without prop drilling.

### API Integration

- **Axios**: Used to fetch data from the **Ergast API**. It simplifies API calls and error handling.
- The app fetches and displays data for Formula 1 seasons, races, and driver results using various API endpoints.

### Charts & Data Visualization

- **ReactECharts** (`echarts-for-react`): Used for visualizing driver performance. ECharts is a flexible and highly customizable charting library that supports multiple types of visualizations.

### UI & Styling

- **TailwindCSS**: A utility-first CSS framework used for styling. It allows for fast, responsive design without writing custom CSS, enabling a consistent look and feel across the app.
- **Light & Dark Modes**: The app supports both light and dark themes, and the theme can be dynamically changed based on user preference.

### Persistence

- **localStorage**: Used to persist the state of pinned races across page refreshes, ensuring that the user’s preferences are retained.

## Setting Up and Running the Project

### Prerequisites

- Node.js version >=14.0
- NPM (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/omar-ashraf2/f1-explorer.git
   cd f1-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add the `.env` file for environment configuration:

   - Create a `.env` file at the root of the project with the following content:
     ```env
     REACT_APP_API_URL=https://ergast.com/api/f1
     ```

4. Start the development server:
   ```bash
   npm start
   ```

This will start the application at `http://localhost:5173` in development mode.

### Running Tests

To run the unit tests for the project, use the following command:

```bash
npm test
```

### Building for Production

To build the app for production:

```bash
npm run build
```

This will create an optimized build of the app in the `build` folder, ready to be deployed.

## API Usage

The app fetches data from the **Ergast API** to retrieve information about Formula 1 seasons, races, and drivers. You can visit the [Ergast API](https://ergast.com/mrd/) for more details.

### Data Endpoints Used

- **/api/f1/seasons.json**: Fetches all available Formula 1 seasons.
- **/api/f1/{season}/races.json**: Fetches races for the selected season.
- **/api/f1/{season}/{round}/results.json**: Fetches the race results for a specific season and race round, including driver details.

## Conclusion

The **Formula One Explorer** is a dynamic and interactive web application for exploring Formula 1 data. It showcases the integration of external APIs, the use of React for building a responsive UI, and effective state management with the Context API. The app provides an intuitive interface for users to explore seasons, races, and driver details, with features like pagination, pinning, and data visualization.
