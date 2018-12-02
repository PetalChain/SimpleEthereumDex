var OM = artifacts.require("OrderMatchingPartial");
var OMInstance;
var version;
var orderBookLength;
var orderBookNewLength;
var firtsEventAdd;
var firtsEventMatch;
var secondEventMatch;
var thirdEventMatch;
var fourthEventMatch;
var secondAmount;

contract('Order Matching', function(accounts) {
    it("test of the Order Matching contract: partial matching 3", function() {
        return OM.deployed().then(function(instance) {
            OMInstance = instance;
            return OMInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            return OMInstance.version({from: accounts[0]});             
        }).then(function(result) {
            return OMInstance.addOrder(80,100,true,"ETH",{from: accounts[0]});             
        }).then(function(result) {
            firtsEventAdd = result.logs[0].event;
            return OMInstance.getOrderBookLenght({from: accounts[0]});             
        }).then(function(result) {
            orderBookLength = result;
            console.log(" - ");
            return OMInstance.addOrder(100,100,false,"ETH",{from: accounts[0]});             
        }).then(function(result) {
            firtsEventMatch = result.logs[0].event;
            secondEventMatch = result.logs[1].event;
            thirdEventMatch = result.logs[2].event;
            return OMInstance.getOrderBookLenght({from: accounts[0]});             
        }).then(function(result) {
            orderBookNewLength = result;
            return OMInstance.getOrderAmount(1, {from: accounts[0]});             
        }).then(function(result) {
            secondAmount = result;            
            assert.equal(version, "OM.Partial.0.0.1", "version matching");      
            assert.equal(orderBookLength, 1, "order book initial length");                              
            assert.equal(orderBookNewLength, 2, "order book new length");
            assert.equal(secondAmount.toNumber(), 20, "new sell order");           
            assert.equal(firtsEventAdd, "OrderAddedToBook", "Event Matching");
            assert.equal(firtsEventMatch, "OrderAddedToBook", "Event Matching");
            assert.equal(secondEventMatch, "OrderMatch", "Event Matching");
            assert.equal(thirdEventMatch, "OrderDeletedFromBook", "Event Matching");            
        });
    });
});
