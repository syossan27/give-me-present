var express = require('express');
var app = express();
var OperationHelper = require('apac').OperationHelper;
var opHelper = new OperationHelper({
  endPoint:   'ecs.amazonaws.jp',     // APIのエンドポイント。日本の場合はecs.amazonaws.jp
  awsId:      process.env.AWSID, // 自分のAccess Key ID
  awsSecret:  process.env.AWSSECRETID, // 自分のSecret Access Key
  assocId:    process.env.ASSOCID // 自分のアソシエイトID
});

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.use('/', express.static('dist'));

app.get('/getItem', function(req, res){
  // Random BrowseNode
  var BrowseNode = require('./BrowseNode.json')
  var randomIndex = Math.floor( Math.random() *  BrowseNode["index"].length)
  var randomBrowseNode = BrowseNode["index"][randomIndex]
  var category = randomBrowseNode['category']
  var id = randomBrowseNode['id']
  var keywords = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "ん", 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  // Setting RequestParametor
  var RequestParam
  if (
    category === 'Apparel' ||
    category === 'Classical' ||
    category === 'DVD' ||
    category === 'Jewelry' ||
    category === 'Music' ||
    category === 'VHS' ||
    category === 'Kitchen' ||
    category === 'Video'
  ) {
    RequestParam = {
      'Keywords': keywords[ Math.floor( Math.random() * keywords.length) ],
      'SearchIndex': category,
      'BrowseNode': id,
      'ResponseGroup': 'Small,OfferSummary',
      'Sort': 'salesrank'
    }
  } else {
    var MinimumPrice = Math.floor( Math.random() * 10000)
    RequestParam = {
      'Keywords': keywords[ Math.floor( Math.random() * keywords.length) ],
      'SearchIndex': category,
      'BrowseNode': id,
      'MinimumPrice': MinimumPrice,
      'ResponseGroup': 'Small,OfferSummary',
      'Sort': 'salesrank'
    }
  }

  opHelper.execute('ItemSearch', RequestParam, function(error, results){
    if(error){
      res.send(500, 'Something broke!');
    } else {
      if (results.ItemSearchResponse.Items != undefined) {
        var items = results.ItemSearchResponse.Items[0].Item[0];
        res.send(items)
      } else{
        res.send(500, 'Something broke!');
      }
    }
  });
});

app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
