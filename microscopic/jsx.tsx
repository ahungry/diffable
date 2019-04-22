
const title = "Hello World";

document.getElementById('app').appendChild(
  <div>
    <h1>{title}</h1>
    <h2>This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally
            injected into a web page using a script</h2>
  </div>
);

var hello = <Hello clicked={0} name="Matt" />
