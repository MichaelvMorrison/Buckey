console.log('hello');

var data;

function getRandomInt(max) {
  return Math.floor(Math.random()*Math.floor(max));
}

function printTip(data) {
console.log(data);
var tipnum = getRandomInt(data.length);

$('#tipheading').html(data[tipnum].header);
$('#tipbody').html(data[tipnum].body);
$('#tipsource').html(data[tipnum].source);
}

$(document).ready(function(){
$.ajax({
   url: "json/tips.json",
   async: false,
   dataType: 'json',
   success: function(result) {
     $.each(result,function(){
       data = this;
       printTip(data);
     });
   }
 });


});