var title = "Hello World";
document.getElementById('app').appendChild(React.createElement("div", null,
    React.createElement("h1", null, title),
    React.createElement("h2", null, "This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally injected into a web page using a script")));
