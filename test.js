const fs = require("fs");
const readline = require("readline");

/* Prepare console input */
var rl = readline.createInterface({
  input: fs.createReadStream('sample_script.txt'),
  //input: process.stdin,
});

let characters = {};
let currentSpeaker = null;
const speakerRegEx = /<SPEAKER>([A-Za-z0-9]*)<\/SPEAKER>/;
const lineRegEx = /<LINE>.*?<\/LINE>/;
rl.on("line", function(line) {
  if(speakerRegEx.test(line)){
    const speaker = line.match(speakerRegEx)[1];
    if (!characters[speaker]) characters[speaker] = 0;
    currentSpeaker = speaker;
  }
  if(lineRegEx.test(line)){
    characters[currentSpeaker]++;
  }
});

rl.on('close', (input) => {
  if (input.DUNCAN === 3 && input.MALCOLM === 5 &&& input.Sergeant === 17){
    console.log("You've done it!");
  }else{
    console.error("You failed the test and broke something");
  }
});
