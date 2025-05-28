# CalculatorTask

Scientific calculator with modern interface, theme support, and advanced functionality. The project is implemented using the Command pattern and object-oriented approach.

## ✨ Features

- **Basic operations**: addition, subtraction, multiplication, division
- **Scientific functions**: trigonometric functions (sin, cos, tan), logarithm, power functions
- **Memory operations**: MC (clear), MR (recall), M+ (add), M- (subtract)
- **Additional functions**: factorial, square and cube root, reciprocal
- **Calculation history**: save and reuse results
- **Theme system**: built-in themes and custom theme editor
- **Keyboard shortcuts**: full keyboard input support
- **Undo operations**: Ctrl+Z to undo last operation

## 🚀 How to Run the App

### Requirements

- Node.js (version 14 or higher)
- npm or yarn

### Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CalculatorTask
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm start
   ```

   The application will open in the browser at `http://localhost:8080`

4. **Build for production**

   ```bash
   npm run build
   ```

   Built files will be created in the `dist/` folder

### Additional Commands

- **Run tests**: `npm test`
- **Tests with watch mode**: `npm run test:watch`
- **Code coverage**: `npm run test:coverage`
- **Linting**: `npm run lint`
- **Fix linting**: `npm run lint:fix`
- **Code formatting**: `npm run format`

## 🏗️ Technical Documentation

### Architecture

The project is built on a modular architecture using inheritance pattern and Command pattern:

```text
BaseCalculator → EventHandler → OperationsHandler → MemoryHandler → Calculator
```

### Core Modules

#### Core (System Core)

- **BaseCalculator**: Base class with common properties and methods
- **EventHandler**: User input handling (keyboard, mouse)
- **OperationsHandler**: Mathematical operations execution
- **MemoryHandler**: Calculator memory management
- **Calculator**: Main class combining all functionality

#### Commands (Command Pattern)

Each mathematical operation is implemented as a separate command:

- `AddCommand`, `SubtractCommand`, `MultiplyCommand`, `DivideCommand`
- `SinCommand`, `CosCommand`, `TanCommand`, `LogCommand`
- `SquareCommand`, `SqrtCommand`, `CubeCommand`, `FactorialCommand`
- And others...

#### UI (User Interface)

- **Display**: Managing display of results and history
- **ThemeSystem**: Theme system with custom theme editor capabilities

#### Utils (Utilities)

- **formatter**: Number formatting for display
- **mathUtils**: Mathematical functions and constants

### Technologies

#### Build and Development

- **Webpack**: Modular application bundling
- **Babel**: ES6+ transpilation to compatible code
- **CSS Loader**: Style processing
- **Webpack Dev Server**: Local development server with hot reload

#### Testing

- **Jest**: Testing framework
- **JSDOM**: DOM emulation for tests
- **Babel-jest**: Test transpilation

#### Code Quality

- **ESLint**: Static code analysis (Airbnb configuration)
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for code quality checks
- **Lint-staged**: Checking only changed files

### Design Patterns

1. **Command Pattern**: Each operation is encapsulated in a separate class
2. **Inheritance Chain**: Inheritance chain for separation of responsibilities
3. **Observer Pattern**: UI updates when state changes
4. **Module Pattern**: Modular code organization

### Webpack plug-ins

html-webpack-plugin — generates an HTML file and automatically adds links to the built JS files </br>
mini-css-extract-plugin — extracts CSS into separate files (then embe them back) (for better minification) </br>
terser-webpack-plugin — minimize JavaScript </br>
clean-webpack-plugin — clean dist dir before new build

## Project Structure

```text
CalculatorTask/
│
├── src/                      # Source files
│   ├── core/                 # Calculator core functionality
│   │   ├── BaseCalculator.js # Abstract base calculator class
│   │   ├── Calculator.js     # Main calculator class
│   │   ├── EventHandler.js   # Event handling
│   │   ├── MemoryHandler.js  # Memory operations
│   │   └── OperationsHandler.js # Mathematical operations
│   │
│   ├── commands/             # Command pattern implementation
│   │   ├── Command.js        # Base command class
│   │   ├── AddCommand.js     # Addition command
│   │   ├── SubtractCommand.js # Subtraction command
│   │   └── ...               # Other operation commands
│   │
│   ├── ui/                   # User interface components
│   │   └── Display.js        # Calculator display
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatter.js      # Number formatting
│   │   └── mathUtils.js      # Math operations implementations
│   │
│   ├── styles/               # CSS styles
│   │   └── main.css          # Main stylesheet
│   │
│   ├── index.js              # Application entry point
│   └── index.html            # HTML template
│
├── tests/                    # Test files
│   └── unit/                 # Unit tests
│       ├── calculator.test.js # Calculator tests
│       └── display.test.js   # Display tests
│
├── webpack/                  # Webpack configuration
│   ├── webpack.common.js     # Common config
│   ├── webpack.dev.js        # Development config
│   └── webpack.prod.js       # Production config
│
├── dist/                     # Compiled files (not in repository)
│
├── coverage/                 # Test coverage reports
│
├── .vscode/                  # VS Code configuration
│
├── .husky/                   # Git hooks
│
├── package.json              # Project dependencies and scripts
├── babel.config.js           # Babel configuration
├── jest.config.js            # Jest configuration
├── .eslintrc.js              # ESLint configuration
├── .prettierrc.js            # Prettier configuration
└── README.md                 # Project documentation
```
