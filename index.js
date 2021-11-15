var textarea = document.getElementById("textarea");

var stats = [];
var obj;

function dropHandler(ev) {

  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        var reader=new FileReader();
        reader.onload=function() {
           document.getElementById('textarea').value=reader.result;
        }
        reader.readAsText(file);
      }
    }
  } else {
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }

  setTimeout(function() {
    generateStats();
  }, 350);
}

textarea.oninput = () => { generateStats(); }

function generateStats() {

var chars;
var words;
var sentences;
var paragraphs;

try { 
  chars = textarea.value.length;
} catch (e) { 
  console.log(e); 
}

try { 
  words = textarea.value.match(/\b(\w+)\b/g).length;
} catch (e) { 
  console.log(e); 
}

try { 
  sentences = textarea.value.match(/[\w|\)][.?!](\s|$)/g).length;
} catch (e) { 
  console.log(e); 
}

try { 
  paragraphs = textarea.value.replace(/\n$/gm, '').split(/\n/).length;
} catch (e) { 
  console.log(e); 
}

stats = [
  chars,
  words,
  sentences,
  paragraphs
];

var infoBoxes = document.getElementsByClassName("info-box");

for (i = 0; i < infoBoxes.length; i++) {
  if (stats[i] != undefined) {
    infoBoxes[i].children[0].innerHTML = stats[i];
  } else {
    infoBoxes[i].children[0].innerHTML = 0;
  }
}

}