var cvs = document.getElementById("canvas"),
 	ctx = cvs.getContext("2d"),
 	reset = document.getElementById("reset"),
 	msg = document.getElementById("msg"),
 	flag = true,
 	chessBoard = [],
 	wins = [],
 	count = 0,
 	myWin = [],
 	computerWin = [],
 	over = false;




function init(){

	flag = true;
	over = false;
	count = 0;  

	// 初始化棋盘上边的棋子
	for(var i = 0; i < 15; i++){
	 	chessBoard[i] = [];
	 	for(var j = 0; j < 15; j++){
	 		chessBoard[i][j] = 0;
	 	}
	}

	// 初始化赢法数组

	for(var i = 0; i < 15; i++){
		wins[i] = []
		for(var j = 0; j < 15; j++){
			wins[i][j] = [];
		}
	}
	// 横向的所有赢法
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 11; j++){
			for(var k = 0; k < 5; k++){
				wins[i][j + k][count] = true;
			}
		count ++;
		}
	}
	// 竖向的所有赢法
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 11; j++){
			for(var k = 0; k < 5; k++){
				wins[j + k][i][count] = true;
			}
			count ++;
		}
	}
	// 斜线上的所有赢法
	for(var i = 0; i < 11; i++){
		for(var j = 14; j > 3; j--){
			for(var k = 0; k < 5; k++){
				wins[i + k][j - k][count] = true;
			}
			count ++;
		}
	}

	// 反斜线上的所有赢法
	for(var i = 0; i < 11; i++){
		for(var j = 0; j < 11; j++){
			for(var k = 0; k < 5; k++){
				wins[i + k][j + k][count] = true;
			}
			count ++;
		}
	}

	for(var i = 0; i < count; i++){
		myWin[i] = 0;
		computerWin[i] = 0;
	}
	msg.innerHTML = "";
	ctx.clearRect(0,0,450,450);
	drawBgFont();
	drawChessBoard();
}


function drawBgFont(){
	ctx.fillStyle = "#efefef";
	ctx.font = "bold 100px 楷体";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("五子棋", cvs.width / 2, cvs.height / 2);
}

function drawChessBoard(){
 	ctx.strokeStyle = "#a8a8a8";
 	ctx.lineWidth = "1";
	for(var i = 0; i < 15; i++){
		// 绘制横线
		ctx.beginPath();
		ctx.moveTo(15 + i * 30, 15);
		ctx.lineTo(15 + i * 30, 435);
		ctx.stroke();
		ctx.closePath();

		//绘制竖线
		ctx.beginPath();
		ctx.moveTo(15, 15 + i * 30);
		ctx.lineTo(435, 15 + i * 30);
		ctx.stroke();
		ctx.closePath();
	}
}

function drawPieces(i, j, flag){

	ctx.beginPath();
	ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	ctx.closePath();

	// 设置渐变的颜色
	var gradient = ctx.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13,15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if(flag){
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	}else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}
	ctx.fillStyle = gradient;
	ctx.fill();

}


function computerAI(){

	var myScore = [],
	    computerScore = [],
	    maxScore = 0,
	    m = 0,
	    n = 0;

	for(var i = 0; i < 15; i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0; j < 15; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 15; j++){
			if(chessBoard[i][j] === 0){
				for(var k = 0; k < count; k++){
					if(wins[i][j][k]){
						if(myWin[k] === 1){
							myScore[i][j] += 7;
						}else if(myWin[k] === 2){
							myScore[i][j] += 35;
						}else if(myWin[k] === 3){
							myScore[i][j] += 800;
						}else if(myWin[k] === 4){
							myScore[i][j] += 15000;
						}

						if(computerWin[k] === 1){
							computerScore[i][j] += 15;
						}else if(computerWin[k] === 2){
							computerScore[i][j] += 400;
						}else if(computerWin[k] === 3){
							computerScore[i][j] += 1800;
						}else if(computerWin[k] === 4){
							computerScore[i][j] += 100000;
						}
					}
				}
 
				if(myScore[i][j] > maxScore){
					maxScore = myScore[i][j];
					m = i;
					n = j;
				}else if(myScore[i][j] === maxScore){
					if(computerScore[i][j] > computerScore[m][n]){
						maxScore = computerScore[i][j];
						m = i;
						n = j;
					}
				}

				if(computerScore[i][j] > maxScore){
					maxScore = computerScore[i][j];
					m = i;
					n = j;
				}else if(computerScore[i][j] === maxScore){
					if(myScore[i][j] > myScore[m][n]){
						maxScore = myScore[i][j];
						m = i;
						n = j;
					}
				}

			}
		}
	}


	drawPieces(m, n, false);
	chessBoard[m][n] = 2;

	for(var k = 0; k < count; k++){
		if(wins[m][n][k]){
			computerWin[k] ++;
			myWin[k] = 6;
		}
		if(computerWin[k] === 5){
			over = true;
			msg.innerHTML = "You defeat!";
		}

	}
	if(!over){
		flag = !flag;
	}

}

cvs.addEventListener("click", function(e){


	if(over){
		return;
	}
	if(!flag){
		return;
	}

	var x = e.offsetX,
		y = e.offsetY,
		i = Math.floor(x / 30),
		j = Math.floor(y / 30);

	if(chessBoard[i][j] === 0){
		drawPieces(i, j, flag);
		chessBoard[i][j] = 1;

		for(var k = 0; k < count; k++){
			if(wins[i][j][k]){
				myWin[k] ++;
				computerWin[k] = 6;
			}
			if(myWin[k] === 5){
				over = true;
				msg.innerHTML = "You win!"
			}

		}
		if(!over){
			flag = !flag;
			computerAI();
		}
	}

}, false);

reset.onclick = init;
init();



