

Travel Planner App

  The Travel Planner App is a project designed to help users organize and plan their trips effortlessly. The application integrates multiple APIs to fetch relevant travel information, including weather updates and city images.


This project follows a structured web development process:

- **Planning & Design**: Initial phase where the structure and UI/UX elements are decided.
- **Front-end Development**: Implementing user interface using HTML, SCSS, and JavaScript.
- **Back-end Development**: Setting up an Express.js server to handle requests and API interactions.
- **API Integration**: Connecting with external services such as Geonames, Weatherbit, and Pixabay.
- **Authentication & Security**: Ensuring secure handling of API keys and user data.
- **Testing & Debugging**: Using Jest for unit testing to ensure smooth functionality.
- **Deployment**: Packaging the project for production and deploying it using platforms like Netlify or Heroku.
- **Maintenance & Updates**: Continuous improvements and enhancements based on user feedback.


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

Run Jest tests using:
```sh
npm run test
```
You can add more test cases to improve project coverage.


1. Build the project for production:

   npm run build

2. Deploy using a platform of choice, such as Netlify, Vercel, or Heroku.

- **Malak Damlakhi** - Development .