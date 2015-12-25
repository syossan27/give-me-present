var OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
  endPoint:   'ecs.amazonaws.jp',     // APIのエンドポイント。日本の場合はecs.amazonaws.jp
  awsId:      process.env.AWSID, // 自分のAccess Key ID
  awsSecret:  process.env.AWSSECRETID, // 自分のSecret Access Key
  assocId:    process.env.ASSOCID // 自分のアソシエイトID
});

// Random BrowseNode
var BrowseNode = require('./BrowseNode.json')
var randomIndex = Math.floor( Math.random() *  BrowseNode["index"].length)
var randomBrowseNode = BrowseNode["index"][randomIndex]
var category = randomBrowseNode['category']
var id = randomBrowseNode['id']
console.log(BrowseNode["index"][randomIndex])

// Setting RequestParametor
var RequestParam
if (
  category === 'Apparel' ||
  category === 'Classical' ||
  category === 'DVD' ||
  category === 'Jewelry' ||
  category === 'Music' ||
  category === 'VHS' ||
  category === 'Video'
) {
  RequestParam = {
    'SearchIndex': category,
    'BrowseNode': id,
    'ResponseGroup': 'Small,OfferSummary',
    'Sort': 'salesrank'
  }
} else {
  var MinimumPrice = Math.floor( Math.random() * 10000)
  console.log(MinimumPrice)
  RequestParam = {
    'SearchIndex': category,
    'BrowseNode': id,
    'MinimumPrice': MinimumPrice,
    'ResponseGroup': 'Small,OfferSummary',
    'Sort': 'salesrank'
  }
}

opHelper.execute('ItemSearch', RequestParam, function(error, results){
  if(error){
    console.error(error);
  }else{
    // TODO: もし該当商品がなかったらやり直し
    var items = results.ItemSearchResponse.Items[0].Item[0];
    console.log(items)
  }
});
