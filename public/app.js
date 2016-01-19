var stats = document.getElementById("stats")
stats.innerHTML = 'A' //其实应该是欢迎语啥的
var flag = 65
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
        stats.innerHTML = (endTime - startTime)/1000.0
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
