let dayPlanner = []
// loop to generate array for loop
for(time = 9; time <= 23; time++) {
// letiable to store data in array
let id = time - 9 
let dataPlanner = ""

// set time
let displayHour = 0;
let ampm = "";

if (time === 12) {
    displayHour = 12
    ampm = "pm"
} else if (time > 12) { 
   displayHour = time - 12;
   ampm = "pm";
} else if (time < 12) {
   displayHour = time;
   ampm = "am";
}

displayHour = displayHour.toString()
dataPlanner = {
    id: id,
    displayHour: displayHour,
    time: time,
    ampm: ampm,
    dataPlanner:dataPlanner

}
dayPlanner.push(dataPlanner)
}
//end arrary 
//current date
function getCurrentDate() {
    let currentDate = moment().format('ddd, MMMM Do');
    $("#currentDay").text (currentDate);

}
// localStorage
function savePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}

//sets data in time spot
function displayPlannerData() {
    dayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner)
    }) 
}

//load data function -- runs save and display
function loadPlannerData() {
    let dataLoaded = JSON.parse(localStorage.getItem("dayPlanner"));

    if (dataLoaded) {
        dayPlanner = dataLoaded;
    }

    savePlannerData()
    displayPlannerData()
}

dayPlanner.forEach(function(hour) {
    // generates row
    let timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    //generate time fiel 
    let timeField = $("<div>")
        .addClass("col-md-2 hour")
        .text(hour.displayHour + hour.ampm);

    // generates schdeduler data
    let hourInput = $("<div>")
        .addClass("col-md-9 description p-0")
    let hourData = $("<textarea>");
        hourData.attr("id", hour.id);


    //compare time to current time - color codes
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
            console.log (hour.time)
    }


    hourInput.append(hourData);
    
    // generate save button for end of row
    let saveIcon = $("<i class='far fa-save fa-lg'></i>")
    let saveEnd = $("<button>")
        .addClass("col-md-1 saveBtn");

    //append elements to row 
    saveEnd.append(saveIcon);    
    timeRow.append(timeField, hourInput, saveEnd)
})

    //assure save button functions
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    //saving the correct information into array
    let saveIndex = $(this).siblings(".description").children().attr("id");
    dayPlanner[saveIndex].dataPlanner = $(this).siblings(".description").children().val();
    savePlannerData();
    displayPlannerData();
})


//get current date on page load
getCurrentDate()
//load data for page load
loadPlannerData()
