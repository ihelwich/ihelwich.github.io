const form = document.querySelector("form");
const output = document.createElement("span");
const addCourseButton = document.getElementById("add-course");

function displayFormData(){
    const formData = new formData(form);
    formData.forEach((value, key)=>{
        const p = document.createElement("p");
        p.textContent = `${format(key)}: ${value}`;
        output.appendChild(p);
    });
}

function format(string){
    string = string.replace(/-/g, ' ');
    string.split(" ").map(word => word.charAt(0).toUpperCase()).join(" ");
    return string;
}

addCourseButton.addEventListener("click", (event) => {
    event.preventDefault();

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
})

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
    location.reload();
});