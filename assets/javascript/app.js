$(document).ready(function(){
  
  var config = {
    apiKey: "AIzaSyCYhbAXxHQgws2uFuQnUzx49dLly8Qc5LI",
    authDomain: "choochoo-ddb37.firebaseapp.com",
    databaseURL: "https://choochoo-ddb37.firebaseio.com",
    projectId: "choochoo-ddb37",
    storageBucket: "choochoo-ddb37.appspot.com",
    messagingSenderId: "167280705170"
  };

    firebase.initializeApp(config);
    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = 0;
    var minutes = 0;
    var train = ""
    
  $("#submit").on("click", function(){
    event.preventDefault();
      trainName = $("#name").val().trim();
      destination = $("#inputDestination").val().trim();
      frequency = $("#frequency").val().trim();
      train = $("#firstTrain").val().trim();
      

        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
          // dateAdded: database.ServerValue.TIMESTAMP

        });
        $("#name").val("");
        $("#inputDestination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
  });

  database.ref().on("child_added", function(snapshot){
    var displayTrain = snapshot.val().trainName;
    var displayDestination = snapshot.val().destination;
    var displayFrequency = snapshot.val().frequency;
    var displayNextArrival = snapshot.val().nextArrival;
    var displayMinutesAway = snapshot.val().minutes;


     //momment js has to be in here then add it to line 63
     var train = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(train, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % displayFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = displayFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));



    $("#currentTrain").append(
      "<tr><td>"      + displayTrain + 
          "</td><td>" + displayDestination + 
          "</td><td>" + displayFrequency + 
          "</td><td>" + nextArrival.format("hh:mm") + 
          "</td><td>" + tMinutesTillTrain + 
      "</td></tr>");
  });

  // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM


});