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

    let count = 0;
    data.forEach((value, key) => {
        count++;
        if (count <= 5){
            return;
        }else if(count === 11){
            const li = document.createElement("li");

            const courseHeader = document.createElement("li");
            courseHeader.textContent = "Courses I'm Taking & Why:";
            output.appendChild(courseHeader);
            output.appendChild(document.createElement("li"));

            const courseListItems = document.querySelectorAll("#course-list li");
            courseListItems.forEach((li, index) => {
                const code = li.querySelector(".course-code").value;
                const name = li.querySelector(".course-name").value;
                const reason = li.querySelector(".course-reason").value;

                const courseList = document.createElement("ul");
                const courseItem = document.createElement("li");
                courseItem.textContent = `<strong>${code} - ${name}:</strong> ${reason}`;

                courseList.appendChild(courseItem);
                li.appendChild(courseList);
            })
        }else{
            const li = document.createElement("li");
            li.innerHTML = `<strong>${format(key)}</strong>: ${value}`;
            output.appendChild(li);
        }
    x});
    
    form.hidden = "true";
    document.querySelector("h3").textContent = displayName(data);
    document.querySelector("main").appendChild(output);
}

addCourseButton.addEventListener("click", (event) => {
    event.preventDefault();

    const courseList = document.getElementById("course-list");
    const li = document.createElement("li");

    const courseCode = document.createElement("input");
    courseCode.className = "course-code";
    courseCode.placeholder = "e.g. ITIS 3135";
    courseCode.required = "true";

    const courseName = document.createElement("input");
    courseName.className = "course-name";
    courseName.placeholder = "e.g. Web-Based Application Design and Development";
    courseName.required = "true";

    const courseReason = document.createElement("input");
    courseReason.className = "course-reason";
    courseReason.placeholder = "e.g. Required";
    courseReason.required = "true";

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