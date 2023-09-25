$(function () {
  // Saves block data into local storage on button click
  var container = $(".container-fluid");
  var clear = $("#clear")
  clear.on('click',clearStorage);
  $(".block").on('click', save);
  function save(event) {
    if (event.target.tagName.toLowerCase() === 'button') {
      var clicked = $(event.target.parentElement);
      var text = clicked.children('textarea').val();
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
  // Code for setting color of text background based on hour
  setInterval(updateColor, 300000)
  function updateColor() {
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
  // function to set textarea values to those saved in local storage
  function setStorage() {
    container.children().each(function (i) {
      var index = container.children().eq(i).attr('id');
      var stored = localStorage.getItem(index)
      container.children().eq(i).children('textarea').text(stored)
    })
  }
  // function for clearing local storage
  function clearStorage(){
    localStorage.clear();
    location.reload()
  }
  // function to initialize page on load
  function init() {
    updateColor();
    setStorage();
  }
  init();
});

