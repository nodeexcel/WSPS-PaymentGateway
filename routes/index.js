var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/pay', function (req, res) {

  // get session 
  request.post(`https://test-gateway.mastercard.com/form/version/51/merchant/WASATTEST/session`,{}, function (err, data) {
    console.log(err, JSON.parse(data.body));
    req.body['sessionId'] = JSON.parse(data.body).session.id;
    // console.log(req.body)
    let options = {
      url: 'https://test-gateway.mastercard.com/api/rest/version/51/merchant/WASATTEST/order/order-1s2yiYyLVM/transaction/trans-vfI9MhdHFr',
      method: 'PUT',
    json: {
        "apiOperation":"PAY",
        "order":{
          "amount":req.body.orderAmount,
          "currency":req.body.orderCurrency
        },
        "sourceOfFunds.type":"CARD",
        "session":{
          "id": req.body.sessionId
        }
      },
      auth : {
        user: "merchant.WASATTEST",
        pass: "2a3a7d4b24c901a43b458ecdfd77fc96",
        sendImmediately: false
    }
    }
    // console.log(options)
    request(options,function(err, response){
      console.log(response.body)
      // if(err){
      //   res.send(err)
      // }else{
      //   res.send(response)
      // }
    })
  })
});
module.exports = router;
