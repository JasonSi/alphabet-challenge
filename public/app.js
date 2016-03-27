var stats = document.getElementById("stats")
stats.innerHTML = 'A'
var flag = 65

//预置配色方案
var themes = [
  {baseColor: '#ACBA85',textColor: '#4E8858',statsColor: '#436A3E'},
  {baseColor: '#E98D70',textColor: '#AA4A30',statsColor: '#dd6821'},
  {baseColor: '#B3E5FC',textColor: '#29B6F6',statsColor: '#0277BD'}
]
var index = 0
//初始化一个配色方案
changeTheme()

function createCanvas(score,fontColor){
  canvas = document.createElement("canvas")
  canvas.width  = "600"
  canvas.height = "400"
  canvas.innerHTML = ' '//不知为何一定要有这个不然没有关闭标签
  stats.innerHTML  =''
  stats.appendChild(canvas)
  ctx = canvas.getContext('2d')
  ctx.fillStyle = fontColor
  ctx.font="150pt Verdana sans-serif"
  ctx.fillText(score,50,250)
}

function playAudio(status){
  //传入起始播放时间，默认为0
  startTime = arguments[1] ? arguments[1] : 0
  //传入播放音量，默认0.5，以应对音量过大或过小
  volume    = arguments[2] ? arguments[2] : 0.5
  audio = document.getElementById(status.toLowerCase())
  audio.currentTime = startTime
  audio.loop    = false
  audio.volume  = volume
  audio.play()
}

function changeTheme(){
  body = document.getElementsByTagName("body")[0]
  body.style.backgroundColor = themes[index].baseColor
  body.style.color  = themes[index].textColor
  stats.style.color = themes[index].statsColor
  if(index==themes.length-1){
    index = 0
  }
  else{
    index += 1
  }
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
    if(e.keyCode == flag){
      //输入正确的情况
      flag++
      //输入正确 清除声
      playAudio('CLEAR',0.28)

      if (e.keyCode==65) {
        gameStart = Date.now()
        stats.innerHTML = String.fromCharCode(flag)
      }
      else if(flag<91 && flag>65){
        stats.innerHTML = String.fromCharCode(flag)
      }
      else if(flag == 91){
        gameOver = Date.now()
        score = (gameOver - gameStart)/1000.0
        if(score<10){
          //十秒内完成，胜利声
          playAudio('WIN',0,1)
          //10秒之外不显示时间避免几万秒溢出容器，并给予嘲讽
          //成绩用Canvas绘制，尽力避免通过修改页面来作弊
          //非要作弊可以直接改代码我也没什么办法
          createCanvas(score.toFixed(3),stats.style.color) //固定小数位确保图片在中间
        }
        else {
          // 十秒外完成，失败声
          playAudio('LOSE',0.1,0.25)
          stats.innerHTML = "LOSE"
        }
      }

    }
    else{
      //警告声 输入错误
      playAudio('WRONG',0.29)
    }

  }

  else{
    //非字母、空格按键 警告声
    if (e.keyCode!=32){
      playAudio('WRONG',0.29)
    }
  }
}
