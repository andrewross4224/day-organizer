// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Saves block data into local storage on button click
  $(".block").on('click', save);
  var clicked;
  var text;
  function save(event) {
    if (event.target.tagName.toLowerCase() === 'button') {
      clicked = $(event.target.parentElement);
      text = clicked.children('textarea').val();
      localStorage.setItem(event.target.parentElement.id, text);
    }
  }
  // Code for the clock at the top of the page
  setInterval(updateTime, 1000)
  function updateTime() {
    var date = dayjs().format("[The current date is] MMM DD, YYYY [at] hh:mm:ss a")
    var currentDate = $("#date")
    currentDate.text(date)
  };
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  setInterval(updateColor, 300000)
  function updateColor() {
    var container = $(".container-fluid");
    var hour = dayjs().format('H')
    
    container.children().each(function (i) {
      var test = container.children().eq(i).attr('id');
      if (hour === test) {
        container.children().eq(i).children('textarea').addClass('present');
      } else if (hour > test) {
        container.children().eq(i).children('textarea').addClass('past');
      } else {
        container.children().eq(i).children('textarea').addClass('future');
      }
    })
  }
  updateColor();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


