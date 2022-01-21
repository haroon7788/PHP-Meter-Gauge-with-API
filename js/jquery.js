$(document).ready(function () {
  $("#input_val").focus();
  $(".gauge__fill").css("transform", "rotate(0turn)");
  $(".gauge__cover").text("0%");

  // Arrow Function.
  const setGaugeValue = (value) => {
    if (value < 0 || value > 100) {
      return;
    }
    $(".gauge__fill").css("transform", "rotate(" + value / 200 + "turn)");
    $(".gauge__cover").text(value + "%");
  };

  $("#submit-val").click(function (event) {
    event.preventDefault();

    // Step:1 First we'll store our form data in an Array of Object.
    const gaugeVal = $("#myForm").serializeArray();
    // returns data in [{name:'form-input-name', value:'form-value'}] Format.

    // Step:2 Now we have to store this array values into a JavaScript Object.
    let obj = {};
    // console.log(obj); // will print the object values. Bcz object is stored by Raference.
    gaugeVal.forEach((el) => {
      obj[el.name] = el.value.trim();
      // dataObj['key'] = 'value'; // syntax for storing value {key: 'value'} in JS Object.
    });

    // Step:3 And then we will convert this JS Object into JSON Object.
    jsonObj = JSON.stringify(obj);

    // Step:4 And now we can pass this JSON Object to our API through AJAX.
    $.ajax({
      url: "http://localhost/meter%20gauge/api.php",
      type: "PUT",
      data: jsonObj,
      success: function (request) {
        // console.log("INPUT = " + request.input_value);
        // console.log("INPUT = " + JSON.stringify(request));
        // console.log("Success Function");

        $("#myForm").trigger("reset");
        setGaugeValue(request.input_value);
      },
    });
  });
});
