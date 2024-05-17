// Function to scan for JavaScript functions
function scanForFunctions() {
    var functionNames = [];
    for (var prop in window) {
        if (typeof window[prop] === 'function') {
            functionNames.push(prop);
        }
    }
    return functionNames;
}

// Fetch React library code
fetch('https://unpkg.com/react@17/umd/react.development.js')
    .then(response => response.text())
    .then(reactCode => {
        // Evaluate React code
        eval(reactCode);

        // Fetch ReactDOM code
        return fetch('https://unpkg.com/react-dom@17/umd/react-dom.development.js');
    })
    .then(response => response.text())
    .then(reactDOMCode => {
        // Evaluate ReactDOM code
        eval(reactDOMCode);

        // Define and render React components
        var FunctionButtons = function({ functionNames }) {
            return React.createElement('div', { className: 'function-buttons' },
                functionNames.map(funcName =>
                    React.createElement('button', {
                        className: 'button',
                        onClick: () => window[funcName]()
                    }, funcName)
                )
            );
        };

        var functionNames = scanForFunctions(); // Assuming you have the scanForFunctions function defined

        // Create a new window
        var newWindow = window.open('', 'Function Buttons', 'width=900,height=400');

        // Render FunctionButtons component into the new window
        ReactDOM.render(
            React.createElement(FunctionButtons, { functionNames: functionNames }),
            newWindow.document.body
        );
    })
    .catch(error => {
        console.error('Error fetching or evaluating React code:', error);
    });
