function trainEpoch(training){
    shuffle(training, true);

    //train for one epoch

    for(let i = 0; i < training.length; i++){
        let data = training[i];
        let inputs = Array.from(data).map(x => x /255);
        let label = training[i].label;
        let targets = [0,0,0];
        targets[label] = 1;
        nn.train(inputs, targets);
    }
}

function testAll(testing){
    let correct = 0;
     //train for one epoch

    for(let i = 0; i < testing.length; i++){
        let data = testing[i];
        let inputs = Array.from(data).map(x => x /255);
        let label = testing[i].label;
        let targets = [0,0,0];
        targets[label] = 1;
        let guess = nn.predict(inputs);

        let m = max(guess);
        let classification = guess.indexOf(m);

        if(classification == label){
            correct++;
        }
    }
    let percent = 100 * (correct / testing.length);
    return percent;
}

function draw(){
    strokeWeight(8);
    stroke(0);
    if(mouseIsPressed){
        
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    
}























