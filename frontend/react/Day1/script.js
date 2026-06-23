console.log(React);
let h1 = document.createElement("h1");
h1.textContent = "I am Real DOM";
document.body.append(h1);
let rh1 = React.createElement(
    "h1",
    {className: "react-h1"},
    "I am React h1"
);
let root = document.querySelector("#root");
let reactRoot = ReactDOM.createRoot(root).render(rh1);
