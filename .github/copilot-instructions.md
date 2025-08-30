# Good Citizen Assistant

Good Citizen Assistant is a React web application that helps users find their elected officials and view Congressional voting records. The application uses Redux for state management, Material-UI for the interface, and integrates with Google Civic Information API and ProPublica Congress API.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup
- **Node.js**: Version 20+ required (current: v20.19.4)
- **npm**: Version 10+ required (current: 10.8.2)
- **API Keys**: Required for full functionality (see Environment Variables section)

### Bootstrap and Build Process
Run these commands in order to set up the development environment:

1. **Install dependencies**: 
   ```bash
   npm install
   ```
   - Takes approximately 90 seconds to complete
   - **NEVER CANCEL** - Wait for completion even with warnings about peer dependencies
   - Warnings about Material-UI v4 and deprecated packages are expected and non-blocking

2. **Build the application**:
   ```bash
   npm run build
   ```
   - Takes approximately 12 seconds to complete
   - **NEVER CANCEL** - Always wait for completion
   - Creates optimized production build in `/build` directory
   - Build warnings about browserslist are cosmetic and can be ignored

3. **Run tests**:
   ```bash
   npm test -- --watchAll=false --passWithNoTests
   ```
   - Takes approximately 2 seconds to complete
   - **NEVER CANCEL** - Tests run quickly but wait for completion
   - Current test suite includes basic smoke tests
   - Full application testing requires API keys (test in integration environment)

### Development Workflow

**Start development server**:
```bash
npm start
```
- Launches on http://localhost:3000
- **NEVER CANCEL** - Development server takes ~10-15 seconds to start
- Shows deprecation warnings - these are expected and non-blocking
- Application loads and functions without API keys (shows error messages for API calls)

**Serve production build**:
```bash
npm install -g serve
serve -s build -l 3001
```
- Serves optimized build on http://localhost:3001
- Use this to test production build locally

## Environment Variables

The application requires two API keys for full functionality:

1. **Google Civic Information API**: For finding elected officials
2. **ProPublica Congress API**: For Congressional voting records

### Setting up API Keys:
1. Copy `.env.example` to `.env`
2. Get Google API key from: https://console.developers.google.com/
3. Get ProPublica API key from: https://www.propublica.org/datastore/api/propublica-congress-api
4. Add keys to `.env`:
   ```
   REACT_APP_GOOGLE_API=your_google_api_key_here
   REACT_APP_PROPUBLICA_API=your_propublica_api_key_here
   ```

**Without API keys**: The application runs but shows error messages when trying to fetch data.

## Validation and Quality Assurance

### Linting
```bash
npx eslint src/ --ext .js,.jsx
```
- Only 2 minor warnings in test files (unused imports)
- **DO NOT** run ESLint on the `/build` directory - it will show many false positives
- No critical linting errors in source code

### Manual Testing Scenarios
**ALWAYS test these scenarios after making changes:**

1. **Basic Navigation**:
   - Visit http://localhost:3000
   - Navigate to "Find My Reps" and "Voting History" sections
   - Verify navigation works and pages load

2. **Representative Lookup** (with API keys):
   - Go to "Find My Reps"
   - Enter test address: "1600 Pennsylvania Avenue, Washington, DC 20500"
   - Verify representatives are displayed with contact information
   - Test clicking on voting history links

3. **Error Handling** (without API keys):
   - Attempt representative lookup
   - Verify error message: "There was a problem looking up your representatives..."
   - Ensure application doesn't crash

### Build Validation
**ALWAYS run these commands before submitting changes:**
```bash
npm run build   # NEVER CANCEL - Wait ~12 seconds
npm test -- --watchAll=false --passWithNoTests   # Wait ~2 seconds
npx eslint src/ --ext .js,.jsx   # Check for linting issues
```

## Repository Structure

### Key Directories
- `/src/Components/` - React components (App.js, RepForm.js, VotingRecords.js, etc.)
- `/src/store/` - Redux store, actions, and reducers
- `/public/` - Static assets and index.html
- `/build/` - Generated production build (created by `npm run build`)

### Important Files
- `src/Components/App.js` - Main application component with routing
- `src/store/index.js` - Redux store configuration
- `src/store/repInfo.js` - Representative information API calls
- `src/store/records.js` - Voting records API calls
- `src/store/members.js` - Congress members API calls
- `package.json` - Dependencies and npm scripts
- `.env.example` - Environment variables template

### Dependencies Overview
- **React 17** with hooks and functional components
- **Redux + React-Redux** for state management
- **Material-UI v4** for UI components (generates expected deprecation warnings)
- **React Router v5** for navigation
- **Axios** for API calls

## Common Tasks and Troubleshooting

### Adding New Features
1. **Always** run the build and test commands first to ensure baseline functionality
2. Follow existing patterns in `/src/Components/` for new components  
3. Use Redux for state management - follow patterns in `/src/store/`
4. Test with and without API keys to ensure graceful error handling

### Deployment
- Application is configured for Heroku deployment via Travis CI
- Build artifacts in `/build/` directory are deployment-ready
- Environment variables must be configured in deployment environment

### Common Issues
- **Peer dependency warnings**: Expected with Material-UI v4, non-blocking
- **Axios import errors in tests**: Use simplified tests or mock APIs
- **API call failures**: Ensure environment variables are properly set
- **Build warnings**: Browserslist and deprecation warnings are cosmetic

## Time Expectations
- **npm install**: ~90 seconds (**NEVER CANCEL**)
- **npm run build**: ~12 seconds (**NEVER CANCEL**)
- **npm test**: ~2 seconds (**NEVER CANCEL**)
- **npm start**: ~10-15 seconds for dev server to start (**NEVER CANCEL**)

**CRITICAL**: Never cancel long-running commands. Build processes may take longer in different environments but should always be allowed to complete.