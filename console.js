// Init DOM
const consoleContainer = document.createElement("div");
consoleContainer.classList.add("console");
const legend = document.createElement("small");
legend.textContent = "Console";
consoleContainer.append(legend);
const vConsole = document.createElement("pre");
consoleContainer.append(vConsole);

window.addEventListener('DOMContentLoaded', (event) => {
	document.body.append(consoleContainer);
});

// Style
const style = document.createElement("style");
style.textContent = `.console {
	margin: 2em 0;
}
.console small {
	text-transform: uppercase;
	color: silver;
}
pre {
	border: solid 1px Silver;
	height: 30vh;
	overflow-y: scroll;
	margin: 0 0;
	font-size: .85em;
	resize:both;
}`;
document.head.append(style)

const originalConsole = console.log;

// Overwrite console.log
console.log = (...a) => {
  a.map((l) => {
    let t;

    if (typeof l.toString == "function") {
      l = l.toString();
    } else {
      l = JSON.stringify(l);
    }

    t = document.createTextNode(`${l} `);
    vConsole.appendChild(t);
  });

  vConsole.appendChild(document.createTextNode("\n"));
  vConsole.scrollTop = vConsole.scrollHeight;
  originalConsole(...a);
}
