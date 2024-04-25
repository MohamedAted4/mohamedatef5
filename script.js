document.addEventListener("DOMContentLoaded", function() {
    const studentsSwitch = document.getElementById("studentsSwitch");
    const departmentsSwitch = document.getElementById("departmentsSwitch");
    const coursesSwitch = document.getElementById("coursesSwitch");
    const content = document.getElementById("content");

    // Function to fetch and display student information
    function displayStudents() {
        fetch('/students')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Replace the content with the students' information
                content.innerHTML = `
                    <h2>Students</h2>
                    <!-- Insert students' information here -->
                `;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            });
    }

    // Function to fetch and display department information
    function displayDepartments() {
        fetch('/departments')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Replace the content with the departments' information
                content.innerHTML = `
                    <h2>Departments</h2>
                    <!-- Insert departments' information here -->
                `;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            });
    }

    // Function to fetch and display course information
    function displayCourses() {
        fetch('/courses')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Replace the content with the courses' information
                content.innerHTML = `
                    <h2>Courses</h2>
                    <!-- Insert courses' information here -->
                `;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                content.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            });
    }

    // Event listener for the students switch
    studentsSwitch.addEventListener("click", function() {
        // Display students section
        displayStudents();
        // Highlight the active switch
        studentsSwitch.classList.add('active');
        departmentsSwitch.classList.remove('active');
        coursesSwitch.classList.remove('active');
    });

    // Event listener for the departments switch
    departmentsSwitch.addEventListener("click", function() {
        // Display departments section
        displayDepartments();
        // Highlight the active switch
        studentsSwitch.classList.remove('active');
        departmentsSwitch.classList.add('active');
        coursesSwitch.classList.remove('active');
    });

    // Event listener for the courses switch
    coursesSwitch.addEventListener("click", function() {
        // Display courses section
        displayCourses();
        // Highlight the active switch
        studentsSwitch.classList.remove('active');
        departmentsSwitch.classList.remove('active');
        coursesSwitch.classList.add('active');
    });
});
