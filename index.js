import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            name: "ans",
            type: "input",
            message: "Enter you name:"
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("Your account has been created");
                console.log(`welcome, ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    name: "ans",
                    type: "list",
                    message: "Select a course",
                    choices: ["IT", "English language", "Cooking"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English language":
                        courseFees = 2000;
                        break;
                    case "Cooking":
                        courseFees = 1000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    name: "ans",
                    type: "confirm",
                    message: "Do you want to enroll in this course ?"
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudents = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Please select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudents.ans);
            console.log("student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        name: "ans",
        type: "confirm",
        message: "Do you want to continue ?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
