var container = $(".container");

const startTime = 17;
const endTime = 24;

// Start with blank object and load any saved data that overlaps the current schedule hours
var eventData = {};
var savedData = loadLocal();

for (let ii = startTime; ii < endTime+1; ii++) {
  if ((savedData != null)&&(('h'+ii) in savedData)) {
    eventData['h'+ii] = savedData['h'+ii];
  } else {
    eventData['h'+ii] = '';
  }
}

// Refresh time at 1s intervals
var currentTime = moment();
$('#currentDay').text(moment().format('MMMM Do YYYY — hh:mm:ss'));
setInterval(() => {
  $('#currentDay').text(moment().format('MMMM Do YYYY — hh:mm:ss'));
  currentTime = moment();
},1000)


// Add code to instantiate time blocks
let colorClass;
for (let ii = startTime; ii < endTime+1; ii++) {

  // timeblock instantiation
  let timeBlock = $('<div>');
  timeBlock.addClass('row timeblock d-flex align-items-center w-100')
  //imeBlock.addClass('row')

  let hour = $('<p>');
  hour.addClass('hour col-1 h-100');
  hour.text(ii);

  let eventBlock = $('<textarea>');

  // check status of hour (past, current, future)
  if (currentTime.hour() > ii) {
    colorClass = 'past'
  } else if (currentTime.hour() < ii) {
    colorClass = 'future'
  } else {
    colorClass = 'present';
  }
  eventBlock.addClass(colorClass);
  eventBlock.addClass('col-10 h-100');

  eventBlock.text(eventData['h'+ii]);

  let lockButton = $('<button>');
  lockButton.text('🔒');
  lockButton.addClass('saveBtn col-1 h-100');

  // check for previous data


  // append objects to main container
  timeBlock.append(hour);
  timeBlock.append(eventBlock);
  timeBlock.append(lockButton);

  container.append(timeBlock);

}

// Add on save click listener for each lock button
container.on('click','.saveBtn',function(event){ 
  let contents = $(this).siblings('textarea').val();
  let hour = $(this).siblings('.hour').text();
  
  eventData['h' + hour] = contents;

  saveLocal()
});

function saveLocal() {
  window.localStorage.setItem('savedEvents',JSON.stringify(eventData));
}

function loadLocal() {
  if (window.localStorage.getItem('savedEvents') != null) {
    return JSON.parse(window.localStorage.getItem('savedEvents'));
  } else {
    return null;
  }
}

