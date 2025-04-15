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
        }

        if (count === 6){
            const imgAlt = data.get("image-alt-caption");
            const imgCaption = data.get("image-caption");

            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = "images/professional_headshot_200px.png"; // Static image path as file uploads aren't retained in JS
            img.alt = imgAlt;

            const caption = document.createElement("figcaption");
            caption.textContent = `${displayName(data)}'s ${format(imgCaption)}`;

            figure.appendChild(img);
            figure.appendChild(caption);
            document.querySelector("main").appendChild(figure);
        }

        if (count === 11){
            const courseHeading = document.createElement("li");
            courseHeading.innerHTML = `<strong>Courses I'm Taking & Why</strong>`;
            const nestedCourseList = document.createElement("ul");

            document.querySelectorAll("#course-list li").forEach((courseItem) => {
                const code = courseItem.getElementsByClassName("course-code")?.value.trim();
                const name = courseItem.getElementsByClassName("course-name")?.value.trim();
                const reason = courseItem.getElementsByClassName("course-reason")?.value.trim();

                if (code && name && reason) {
                    const courseLi = document.createElement("li");
                    courseLi.innerHTML = `<strong>${code} ${name}:</strong> ${reason}`;
                    nestedCourseList.appendChild(courseLi);
                }
            });

            courseHeading.appendChild(nestedCourseList);
            output.appendChild(courseHeading);
        }

        const li = document.createElement("li");
        li.innerHTML = `<strong>${format(key)}</strong>: ${value}`;
        output.appendChild(li);
    });
    
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