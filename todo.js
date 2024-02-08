// Some code snippets have been provided to you for ease of coding.
// You can choose to remove or change any of them to suit your needs.

var outstandingtasks=[];
var finishedtasks=[];
var maxtaskid=0;

function bootstrap()
{
    // Code for Q7 starts here. This code restores the values
    // of variables to their previous values (i.e., before browser
    // was closed). 
    // Check for and load outstanding tasks from cookies
    var outstandingTasksCookie = getCookie("outstandingtasks");
    if (outstandingTasksCookie) {
        outstandingtasks = JSON.parse(outstandingTasksCookie);
    } else {
        outstandingtasks = []; // Initialize if not found
    }

    // Check for and load completed tasks from cookies
    var completedTasksCookie = getCookie("finishedtasks");
    if (completedTasksCookie) {
        finishedtasks = JSON.parse(completedTasksCookie);
    } else {
        finishedtasks = []; // Initialize if not found
    }
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
// Code for Q7 ends here.

function addfunction()
{
    // Code for Q6: check error when an add is requested to an already full outstanding tasks lis
    // Check if the outstanding tasks list is full
    if (outstandingtasks.length >= 10) { // Assuming 10 is the limit
      alert('The outstanding tasks list is full. Please complete some tasks before adding new ones.');
      return; // Exit the function to prevent adding a new task
    }
    // Code for Q6 ends here.

    // Code for Q2 starts here. This function uses DOM read
    // to get the values of HTML fields. Subsequently, it
    // adds them to the JS variable called outstandingtasks. 
    // You are also required to save the contents of this variable
    // in a JS cookie (Q7). 
    
    // Retrieve values from form fields
    var serial = document.getElementById('taskSerial').value;
    var name = document.getElementById('taskName').value;
    var priority = document.getElementById('taskPriority').value;
    var deadline = document.getElementById('taskDeadline').value;

    // Create a task object
    var task = {
        serial: serial,
        name: name,
        priority: priority,
        deadline: deadline
    };

    // Assuming outstandingtasks is an array of tasks
    if (!Array.isArray(outstandingtasks)) {
        outstandingtasks = []; 
    }
    outstandingtasks.push(task);

    // Save the outstandingtasks array to a cookie
    // Note: Real applications should consider using localStorage or sessionStorage for larger data
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000)); // Cookie expires in 7 days
    var expires = "expires="+ d.toUTCString();
    document.cookie = "outstandingtasks=" + JSON.stringify(outstandingtasks) + ";" + expires + ";path=/";
    //Code for Q2 ends here.

    console.log(outstandingtasks);
    
    //Q6: Reminder messages for task added successfully
    document.getElementById('messageArea').innerHTML = 'Task added successfully!';
}

function finishfunction()
{
    // Code for Q3 starts here. This function uses DOM read to
    // get the serial number from the user. Subsequently, it
    // searches/finds the Task matching the serial number and
    // deletes the task from outstandingtasks. Do not forget to
    // add the task to finished tasks before deleting it.
    var serial = document.getElementById('finishTaskId').value; // Get serial number from user input
    var taskIndex = outstandingtasks.findIndex(task => task.serial === serial); // Find the task index by serial

    if (taskIndex !== -1) { // If task found
        var finishedTask = outstandingtasks.splice(taskIndex, 1)[0]; // Remove the task from outstanding tasks

        // Assuming finishedtasks is an array of completed tasks
        if (!Array.isArray(finishedtasks)) {
            finishedtasks = []; // Initialize if not already an array
        }
        finishedtasks.push(finishedTask); // Add the task to finished tasks

        // Update cookies or localStorage here for both outstandingtasks and finishedtasks
        document.cookie = "outstandingtasks=" + JSON.stringify(outstandingtasks) + ";path=/";
        document.cookie = "finishedtasks=" + JSON.stringify(finishedtasks) + ";path=/";
    } else {
        alert("Task with serial number " + serial + " not found.");
    }
    // Code for Q3 ends.
    console.log(outstandingtasks);
}

function displayfunction()
{
    // Code for Q6:Before displaying tasks, check if lists are empty
    if (outstandingtasks.length === 0) {
      document.getElementById('messageArea').innerHTML = 'No outstanding tasks to display.';
  } else if (finishedtasks.length === 0) {
      document.getElementById('messageArea').innerHTML = 'No completed tasks to display.';
  }
    // Code for Q6 ends here.

    // Code for Q4 starts here. This function identifies the HTML
    // element corresponding to the Tables for outstanding 
    // and finished tasks. You must create the table by adding rows,
    // columns, and finally populate the text in the table. Code
    // for Outstanding tasks and finished tasks is similar. Use
    // the Demo code used in class as a starting point for table
    // creation using JS.
    // Clear existing table contents
    document.getElementById("displayoutstanding").getElementsByTagName("tbody")[0].innerHTML = "";
    document.getElementById("displaycompleted").getElementsByTagName("tbody")[0].innerHTML = "";

    // Populate Outstanding Tasks Table
    outstandingtasks.forEach(task => {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${task.serial}</td><td>${task.name}</td><td>${task.priority}</td><td>${task.deadline}</td><td>Outstanding</td>`;
        document.getElementById("displayoutstanding").getElementsByTagName("tbody")[0].appendChild(row);
    });

    // Populate Completed Tasks Table
    finishedtasks.forEach(task => {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${task.serial}</td><td>${task.name}</td><td>${task.priority}</td><td>${task.deadline}</td><td>Completed</td>`;
        document.getElementById("displaycompleted").getElementsByTagName("tbody")[0].appendChild(row);
    });
    // Code for Q4 ends.
}

