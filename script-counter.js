const http = require('http');

class ScriptCounter {
  static async analyze(url) {
      return new Promise(function(resolve, reject) {
        http.get(url, (res) => {
          if (res.statusCode !== 200){
            reject('Could not load xml script.');
          }else{
            let rawData = "";
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              try {
                const analysis = ScriptCounter.CountCharLines(rawData);
                resolve(analysis);
              } catch (e) {
                console.error(e.message);
              }
            });
          }
        });
      });
  }

  static async CountCharLines(text) {
    return new Promise(function(resolve, reject) {
      let lines = text.split("\n");
      let characters = {};
      let playTitle = null;
      let currentSpeaker = null;
      const titleRegEx = /<TITLE>(.*?)<\/TITLE>/;
      const speakerRegEx = /<SPEAKER>(.*?)<\/SPEAKER>/;
      const lineRegEx = /<LINE>.*?<\/LINE>/;
      for (let line of lines) {
        if (!playTitle && titleRegEx.test(line)){
          const title = line.match(titleRegEx)[1];
          if (title){
              playTitle = title;
          }
        }
        if (speakerRegEx.test(line)) {
          const speaker = line.match(speakerRegEx)[1];
          if (speaker && !characters[speaker]){
              characters[speaker] = 0;
          }
          currentSpeaker = speaker;
        }
        if (currentSpeaker && lineRegEx.test(line)) {
          characters[currentSpeaker]++;
        }
      }
      resolve({title:playTitle,characters});
    });
  }
}

module.exports = ScriptCounter;
