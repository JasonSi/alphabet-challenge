var stats = document.getElementById("stats")
stats.innerHTML = 'A'
var flag = 65

function createCanvas(score){
  canvas = document.createElement("canvas")
  canvas.width="600"
  canvas.height="400"
  canvas.innerHTML = ' '//不知为何一定要有这个不然没有关闭标签
  stats.innerHTML=''
  stats.appendChild(canvas)
  ctx = canvas.getContext('2d')
  ctx.fillStyle = "#436A3E"
  ctx.font="150pt sans-serif"
  ctx.fillText(score,50,250)
}

document.onkeydown = function(e){
  //屏蔽浏览器快捷键
  e.preventDefault()

  if(e.keyCode==32){
    //(重新)开始游戏
    flag = 65
    stats.innerHTML = String.fromCharCode(flag)
  }

  if(e.keyCode<=90 && e.keyCode>= 65){
    //按键为字母
    keyInput = String.fromCharCode(e.keyCode)
    if(e.keyCode == flag){
      //输入正确的情况
      flag++

      if (e.keyCode==65) {
        startTime = Date.now()
        stats.innerHTML = String.fromCharCode(flag)
      }
      else if(flag<91 && flag>65){
        stats.innerHTML = String.fromCharCode(flag)
      }
      else if(flag == 91){
        endTime = Date.now()
        score = (endTime - startTime)/1000.0
        if(score<10){
          //10秒之外不显示时间避免几万秒溢出容器，并给予嘲讽
          //成绩用Canvas绘制，尽力避免通过修改页面来作弊
          //非要作弊可以直接改代码我也没什么办法
          createCanvas(score)
        }
        else {
          stats.innerHTML = "Slow"
        }
      }

    }
    else{
      //警告声 输入错误
    }

  }

  else{
    //非字母、空格按键 警告声
  }
}
