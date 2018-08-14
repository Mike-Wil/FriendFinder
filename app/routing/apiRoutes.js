var appData = require("../data/friends")
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(appData);
    });
    app.post("/api/survey", function(req, res) {
        var userArray = req.body;
        
        for (let j=0;j<userArray.scores.length;j++) {
            userArray.scores[j]=parseInt(userArray.scores[j]); 
        }
        //handle incoming survey results and handle compatibility logic
        let mostCompatible ={};
        let compatibility = Infinity;
        for (let i=0;i<appData.length;i++) {
            let currCompatibility = arrayCompare(userArray.scores,appData[i].scores);
            if (currCompatibility <compatibility) {
                mostCompatible = appData[i];
                compatibility = currCompatibility;
            }
        }
        console.log('Your best friend is: ' + mostCompatible.name);
        console.log('Your compatibility is: '+compatibility);
        appData.push(userArray);
        res.json(mostCompatible);
    });

    function arrayCompare(arr1,arr2) {
        return arr1.reduce((summed,value,i)=>{
            return summed + Math.abs(value-arr2[i])
        },0);
    }
}