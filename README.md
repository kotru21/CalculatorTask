# CalculatorTask

## Webpack plug-ins

html-webpack-plugin — generates an HTML file and automatically adds links to the built JS files </br>
mini-css-extract-plugin — extracts CSS into separate files (then embe them back) (for better minification) </br>
terser-webpack-plugin — minimize JavaScript </br>
clean-webpack-plugin — clean dist dir before new build

## Project Structure

```
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
