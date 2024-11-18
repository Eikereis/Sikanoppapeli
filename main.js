/*Game Begin: have 2 slots and have a button to increase slots for players+names. Also let players choose the end point count; Set 100 at the beginning
Rules: 1 Dice; Let the playe throw as many times until dice hits 1. Also let him to stop throwing if he chooses to: If stops throwing, sum the dice rolls. Else Dont.
Rules: 2 Dice; Let player throw as many times; If both dice have same number. Double the amount. If you throw 2 ones. you get 25 points. If you throw 1 one. Their turn ends. No summing;
Note: If you throw 3 doubles in a row. your round ends and you dont get points. */

let face0=new Image();
face0.src="d1.gif";
let face1=new Image();
face1.src="d2.gif";
let face2=new Image();
face2.src="d3.gif";
let face3=new Image();
face3.src="d4.gif";
let face4=new Image();
face4.src="d5.gif";
let face5=new Image();
face5.src="d6.gif";




    let playerscore = 0;
    let requiredscore = 0;
    let players = [];




    function throwdice(){
        let score = 0
        let randomdice=Math.round(Math.random()*5);
        document.images["mydice"].src=eval("face"+randomdice+".src");
        let diceroll = randomdice+1;
        if (diceroll == 1) {
            score=0
            diceroll = 0
            console.log("Rolled 1. Ending Turn.")
        }else {
            score = score + diceroll
        }
        console.log(diceroll);
    }


    function throw2dice(){
        document.getElementById("otherdice").style.display="block"
        let score = 0
        let randomdice1=Math.round(Math.random()*5);
        let randomdice2=Math.round(Math.random()*5);
        document.images["mydice"].src=eval("face"+randomdice1+".src");
        document.images["myotherdice"].src=eval("face"+randomdice2+".src");
        if(randomdice1 == randomdice2) {
            if (randomdice1 == 0) {
                score = score + 25
            }
            else {
                score = score + (randomdice1+randomdice2+2)*2
            }
        }else if(randomdice1 == 0 || randomdice2 == 0) {
            score = 0 
        }
        else {
            score = score + randomdice1+randomdice2+2
        }
        console.log(score)
    }



    function addPlayer(){
        nimi = document.getElementById("pelaajat").value 
        players.push([nimi, playerscore])
        console.log(players)
    }

