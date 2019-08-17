const len = 784;
const total_data = 10000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN =   2;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

let animal = ['CAT', 'RAINBOW','TRAIN'];
let nn;

function preload(){
    cats_data = loadBytes('data/cats10000.bin');
    trains_data = loadBytes('data/trains10000.bin');
    rainbows_data = loadBytes('data/rainbows10000.bin');
}



function setup(){
    createCanvas(280, 280);
    background(255);

    //prepare the data
    prepareData(cats, cats_data, CAT);
    prepareData(rainbows, rainbows_data, RAINBOW);
    prepareData(trains, trains_data, TRAIN);


    //create the neural network
    nn = new NeuralNetwork(784, 64, 3);

    //radomize the data
    let training = [];
    training = training.concat(cats.training);
    training = training.concat(rainbows.training);
    training = training.concat(trains.training);

    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(rainbows.testing);
    testing = testing.concat(trains.testing);

    let trainButton = select('#train');
    let epochCounter = 0;
    trainButton.mousePressed(function(){
        trainEpoch(training);
        epochCounter++;
        console.log("Epoch: " + epochCounter);
    });

    let testButton = select('#test');
    testButton.mousePressed(function(){
        let percent = testAll(testing);
        epochCounter++;
        console.log("Percent: " + nf(percent, 2, 2)+"%");
    });

    let guessButton = select('#guess');
    guessButton.mousePressed(function(){
        let inputs = [];
        let img = get();
        img.resize(28,28);
        img.loadPixels();
        for(let i = 0; i< len; i++){
            let bright = img.pixels[i*4];
            inputs[i] = (255 - bright)/255.0;
        }

        let guess = nn.predict(inputs);
        let m = max(guess);
        let classification = guess.indexOf(m);
        alert(animal[classification]);

    });

    let clearButton = select('#clear');
    clearButton.mousePressed(function(){
        background(255);
    });

    /*for(let i = 1; i < 6; i++){
        trainEpoch(training);
        console.log("Epoch: " + i);
        let percent = testAll(testing);
        console.log("% Correct: " + percent);
    }*/

    /*let total = 1000;

    for(let n = 0; n < total; n++){
        let img = createImage(28,28);
        img.loadPixels();
        let offset = n*784;
        for( let i = 0; i < 784; i++){
            let val = 255-cats.bytes[i + offset];
            img.pixels[i*4 + 0] = val;
            img.pixels[i*4 + 1] = val;
            img.pixels[i*4 + 2] = val;
            img.pixels[i*4 + 3] = 255;
        }
        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;
        image(img, x, y);
    }*/
}

function draw(){
    strokeWeight(8);
    stroke(0);
    if(mouseIsPressed){
        
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    
}
