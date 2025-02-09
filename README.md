<p align="center">
  <a href="" rel="noopener">
    <img width=700px src="./ProjPic.png" alt="Project Logo">
  </a>
</p>

<h3 align="center">Travel Planner App</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/malakdamlakhi/Travel-app.svg)](https://github.com/malakdamlakhi/Travel-app/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/malakdamlakhi/Travel-app.svg)](https://github.com/malakdamlakhi/Travel-app/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  The Travel Planner App is a project designed to help users organize and plan their trips effortlessly. The application integrates multiple APIs to fetch relevant travel information, including weather updates and city images.
</p>

## 📌 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Authors](#authors)

## 📝 About <a name="about"></a>

This project follows a structured web development process:

- **Planning & Design**: Initial phase where the structure and UI/UX elements are decided.
- **Front-end Development**: Implementing user interface using HTML, SCSS, and JavaScript.
- **Back-end Development**: Setting up an Express.js server to handle requests and API interactions.
- **API Integration**: Connecting with external services such as Geonames, Weatherbit, and Pixabay.
- **Authentication & Security**: Ensuring secure handling of API keys and user data.
- **Testing & Debugging**: Using Jest for unit testing to ensure smooth functionality.
- **Deployment**: Packaging the project for production and deploying it using platforms like Netlify or Heroku.
- **Maintenance & Updates**: Continuous improvements and enhancements based on user feedback.

## 🚀 Getting Started <a name="getting_started"></a>

To run this project locally, follow these steps:

### Prerequisites
- **Web Browser**: Any modern browser (Chrome, Firefox, Edge, Safari) is required.
- **Code Editor**: Recommended editors include VS Code, Sublime Text, or JetBrains WebStorm.
- **Node.js & npm**: Ensure Node.js is installed to manage dependencies. **Required Node.js Version: v22.13.1**
- **Package Manager**: Use `npm` (included with Node.js) or `yarn` to install dependencies.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/malakdamlakhi/Travel-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Travel-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add API keys with different variable names. Example:
   ```env
   GEO_USERNAME=your_geonames_username
   WEATHER_API_KEY=your_weatherbit_api_key
   PIXABAY_API_KEY=your_pixabay_api_key
   ```
5. Ensure the keys are updated correctly in the server functions.

## 🔬 Running Tests <a name="tests"></a>

Run Jest tests using:
```sh
npm run test
```
You can add more test cases to improve project coverage.

## 🌍 Deployment <a name="deployment"></a>

1. Build the project for production:
   ```sh
   npm run build
   ```
2. Deploy using a platform of choice, such as Netlify, Vercel, or Heroku.

## 👩‍💻 Author <a name="authors"></a>

- **Malak Damlakhi** - Development & Project Implementation
  
Feel free to contribute by submitting pull requests or reporting issues!