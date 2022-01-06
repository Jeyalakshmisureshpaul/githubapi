

function createElementDOM(elType,classNames,attributeNames = {},visibleText) 
{
  const inputDiv = document.createElement(elType);
  inputDiv.classList.add(...classNames);

  for (const [key, value] of Object.entries(attributeNames)) 
  {
    inputDiv.setAttribute(key, value);
  }
  inputDiv.innerHTML = visibleText;
  return inputDiv;
}

async function fetchAPI(url, callbck) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    const data = await resp.json();
    callbck(data);
  } catch (error) {
    rowDiv.innerHTML = "";
    alert("Error in fetching  data , Getting " + error);
  }
}

const btn = document.getElementsByTagName("button");
const userInput = document.getElementById("userid");

const formDiv = createElementDOM(
  "form",
  ["form-inline", "justify-content-center"],
  {},
  ""
);

const groupDiv = createElementDOM(
  "div",
  ["form-group", "mx-sm-3", "mb-2"],
  {},
  ""
);

const labelDiv = createElementDOM(
  "label",
  ["sr-only"],
  { for: "userid" },
  "Username"
);

const inputDiv = createElementDOM(
  "input",
  ["form-control"],
  {
    type: "text",
    id: "userid",
    placeholder: "Enter github user name "
  },
  ""
);

const buttonDiv = createElementDOM(
  "button",
  ["btn", "btn-primary", "mb-2"],
  { type: "submit"
    
},
  "Search"
);

groupDiv.append(labelDiv, inputDiv);

formDiv.append(groupDiv, buttonDiv);

document.body.append(formDiv);


btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  const userBtn = document.getElementById("userid");
  if (userBtn.value) {
    fetchAPI(
      `https://api.github.com/users/${userBtn.value}/repos`,
      createRepoDom
    );
  } else {
    alert("Please enter the user name first");
  }

  userBtn.value = "";
  userBtn.blur();
});

const containerDiv = createElementDOM("div", ["container", "my-5"], {}, "");

const rowDiv = createElementDOM("div", ["row", "row-cols-2"], {}, "");



function createRepoDom(data) {
  rowDiv.innerHTML = "";
  if (data) {
    data.forEach((el) => {
      const columnDiv = createElementDOM("div", ["col", "d-flex"], {}, "");

      const cardDiv = createElementDOM(
        "div",
        ["card", "flex-fill", "mb-3", "border-success", "bg-warning"],
        { style: "max-width:540px" },
        ""
      );

      const childRowDiv = createElementDOM(
        "div",
        ["row", "no-gutters"],
        {},
        ""
      );

      const childColDiv = createElementDOM("div", ["col-md-4"], {}, "");

      const imgDiv = createElementDOM(
        "img",
        ["card-img"],
        {
          src: el.owner.avatar_url,
          alt: "user image",
        },
        ""
      );

      const colCardDiv = createElementDOM("div", ["col-md-8"], {}, "");

      const CardBodyDiv = createElementDOM("div", ["card-body"], {}, "");

      const CardTitleDiv = createElementDOM(
        "h5",
        ["card-header", "font-weight-bold", "mb-3"],
        {},
        el.name[0].toUpperCase() + el.name.slice(1)
      );

      const linkDiv = createElementDOM(
        "a",
        ["card-text"],
        { target: "_blank", role: "button", href: el.html_url },
        el.html_url
      );

      const DescriptionDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        el.description
      );

      const forkDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        `Forked ${el.forks_count} times & Starred ${el.stargazers_count} times`
      );

      CardBodyDiv.append(CardTitleDiv, DescriptionDiv, forkDiv, linkDiv);

      colCardDiv.append(CardBodyDiv);

      childColDiv.append(imgDiv);

      childRowDiv.append(childColDiv, colCardDiv);

      cardDiv.append(childRowDiv);

      columnDiv.append(cardDiv);

      rowDiv.append(columnDiv);
    });
  } else {
    alert("Please check with the user once, it seems it's incorrect!!! ");
  }

  containerDiv.append(rowDiv);

  document.body.append(containerDiv);
}