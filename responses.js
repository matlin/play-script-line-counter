//to be added to response object
// or used with call/apply e.g. Responses.done.call(res, data);
module.exports = {
  done: function(data){
    this.type('json').status(200).send(data);
  },
  failed: function(message){
    this.type('json').status(500)
  },
  cached: function(data){
    this.type('json').status(304).send(data);
  },
  badLink: function(message){
    this.type('json').status(400).send({message});
  },
  fileToLarge: function(message){
    this.type('json').status(413).send({message});
  },
};
