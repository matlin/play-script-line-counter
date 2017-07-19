const fs = require('fs');
const xml2js = require('xml2js');

class Parser{
  constructor(path, keys ,reducer){
    this.filePath = path;
    this.reducer = reducer;
    this.parser = new xml2js.Parser({explicitArray: false, normalizeTags: true});
  }

  async parse(){
    return new Promise(function(resolve, reject) {
      fs.readFile(this.filePath, (err, data) => {
          if (err) reject(err);
          this.parser.parseString(data, (err, result) => {
              if (err) reject(err);
              resolve(result);
          });
      });
    }).then(obj => {
      if (obj && this.keys && this.reducer) {
        return this.getAll(obj, keys).reduce(this.reducer);
      }
    }).catch(err => {
      console.err(err);
    });
  }

  getAll(obj, path){
    console.log(obj, path);
    if (path.length === 0){
      return obj;
    }else{
      if (typeof obj === "array"){
        const result = [];
        for (let elem of array){
          result.concat(getAll(elem, path.slice(1)));
        }
        return result;
      }else{
        return getAll(obj[path[0]], path.slice(1));
      }
    }
  }

}

module.exports = Parser;
