const form = document.querySelector("form");
const output = document.createElement("ul");
const addCourseButton = document.getElementById("add-course");

function format(string){
    string = string.replace(/-/g, ' ');
    return string.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function displayName(data){
    const first = data.get("first-name");
    const middle = data.get("middle-initial");
    const last = data.get("last-name");
    const mascot = data.get("mascot");

    return middle ? `${first} ${middle}. ${last}'s ${mascot}` : `${first} ${last}'s ${mascot}`;
}

function displayFormData(){
    const data = new FormData(form);
    const main = document.querySelector("main");
    const nameHeader = document.querySelector("h3");
    // const imageSrc = "images/professional_headshot_200px.png";
    const imageAlt = document.getElementById("image-alt-caption").value;
    const imageCaption = document.getElementById("image-caption").value;

    output.innerHTML = "";

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = imageAlt;
    const caption = document.createElement("figcaption");
    caption.textContent = format(data.get("first-name")) + " " + format(data.get("last-name")) + "'s " + format(imageCaption);
    figure.appendChild(img);
    figure.appendChild(caption);
    main.appendChild(figure);

    const fields = [
        ["personal-background", "Personal Background"],
        ["professional-background", "Professional Background"],
        ["academic-background", "Academic Background"],
        ["web-development-background", "Background in this Subject"],
        ["primary-computer-platform", "Primary Computer Platform"]
    ];

    fields.forEach(([key, label]) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${label}:</strong> ${data.get(key)}`;
        output.appendChild(li);
    });

    const courseList = document.createElement("li");
    courseList.innerHTML = `<strong>Courses I'm Taking &amp; Why</strong>`;

    const nestedList = document.createElement("ul");
    document.querySelectorAll("#course-list li").forEach((li) => {
        const code = li.querySelector(".course-code").value;
        const name = li.querySelector(".course-name").value;
        const reason = li.querySelector(".course-reason").value;

        const nestedLi = document.createElement("li");
        nestedLi.innerHTML = `<strong>${code} ${name}:</strong> ${reason}`;
        nestedList.appendChild(nestedLi);
    });

    courseList.appendChild(nestedList);
    output.appendChild(courseList);

    const fact1 = document.createElement("li");
    fact1.innerHTML = `<strong>Interesting Item to Remember me by:</strong> ${data.get("interesting-item-to-remember-me-by")}`;
    output.appendChild(fact1);

    const fact2 = document.createElement("li");
    fact2.innerHTML = `<strong>I'd also like to Share:</strong> ${data.get("i'd-also-like-to-share")}`;
    output.appendChild(fact2);

    nameHeader.textContent = displayName(data);
    form.hidden = "true";
    main.appendChild(output);
}

addCourseButton.addEventListener("click", (event) => {
    event.preventDefault();

    const courseList = document.getElementById("course-list");
    const li = document.createElement("li");

    const courseCode = document.createElement("input");
    courseCode.className = "course-code";
    courseCode.placeholder = "e.g. ITIS 3135";

    const courseName = document.createElement("input");
    courseName.className = "course-name";
    courseName.placeholder = "e.g. Web-Based Application Design and Development";

    const courseReason = document.createElement("input");
    courseReason.className = "course-reason";
    courseReason.placeholder = "e.g. Required";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-course";
    deleteBtn.textContent = "Delete Course";
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        li.remove();
    });

    li.appendChild(courseCode);
    li.appendChild(courseName);
    li.appendChild(courseReason);
    li.appendChild(deleteBtn);
    courseList.appendChild(li);
});

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        alert("Please fill in all required fields.");
        event.preventDefault();
        return;
    }
    event.preventDefault();
    displayFormData();
});

form.addEventListener("reset", (event) => {
    event.preventDefault();

    document.getElementById("checkbox").checked = false;

    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        if (input.type !== "submit" && input.type !== "reset"){
                input.value = "";
            }
    });

    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";
});