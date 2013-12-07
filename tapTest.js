var counts = new Meteor.Collection( "counts");
var countId = 1;

if (Meteor.isClient) {
  Meteor.startup( function(){
    counts.upsert( {_id: countId}, {$set: { junk: 0}}, function(num, insertedId){
    });  
  });

  Template.hello.greeting = function () {
    return "Welcome to tapTest.";
  };

  Template.hello.clicksDP = function(){
    var count = counts.findOne( {_id: countId});
    return count && count.clicksDP;
  };

  Template.hello.clicks = function(){
    var count = counts.findOne( {_id: countId});
    return count && count.clicks;
  };

  Template.hello.events({
    
     'click #noDP' : function (e) {
      counts.update( {_id: countId}, {$inc: {clicks: 1}});
      console.log( "click: "+ e.isDefaultPrevented());
     },

     'click #dp' : function (e) {
      counts.update( {_id: countId}, {$inc: {clicksDP: 1}});
      e.preventDefault();
      console.log( "click: "+ e.isDefaultPrevented());
     },


  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    counts.remove({});// code to run on server at startup
  });

}
