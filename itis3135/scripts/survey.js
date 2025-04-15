const form = document.querySelector("form");
const output = document.createElement("span");
const addCourseButton = document.getElementById("add-course");

function format(string){
    string = string.replace(/-/g, ' ');
    return string.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function displayFormData(){
    const data = new FormData(form);
    data.forEach((value, key) => {
        const p = document.createElement("p");
        p.textContent = `${format(key)}: ${value}`;
        output.appendChild(p);
    });
    form.hidden = "true";
    document.querySelector("main").appendChild(output);
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