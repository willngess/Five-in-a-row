var cvs = document.getElementById("canvas"),
 	ctx = cvs.getContext("2d"),
 	flag = true,
 	chessBoard = [];

 for(var i = 0; i < 15; i++){
 	chessBoard[i] = [];
 	for(var j = 0; j < 15; j++){
 		chessBoard[i][j] = 0;
 	}
}

function drawBgFont(){
	ctx.fillStyle = "#efefef";
	ctx.font = "100px 楷体";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("五子棋", cvs.width / 2, cvs.height / 2);
}

function drawChessBoard(){
 	ctx.strokeStyle = "#a8a8a8";
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

cvs.addEventListener("click", function(e){

	var x = e.offsetX,
		y = e.offsetY,
		i = Math.floor(x / 30),
		j = Math.floor(y / 30);

	if(chessBoard[i][j] === 0){
		drawPieces(i, j, flag);
		flag = !flag;
		if(flag){
			chessBoard[i][j] = 1;
		}else{
			chessBoard[i][j] = 2;
		}
	}

}, false);

drawBgFont();
drawChessBoard();
