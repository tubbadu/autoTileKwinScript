// journalctl -g "js:" -f 


function setTimeout(func, time){
    var timer = new QTimer();
    timer.interval = time; // set the time in milliseconds
    timer.singleShot = true; // in-case if setTimout and false in-case of setInterval
    timer.timeout.connect(this, func);
    timer.start();
}
  
  
  //workspace.slotWindowQuickTileRight()
  
  workspace.clientAdded.connect(client => {
  
      workspace.activeClient = client
      var appName = client.resourceName
      var app = client.geometry // x, y, height, width
      var freeWidth = workspace.clientArea("PlacementArea", workspace.activeScreen, 0).width
      var freeHeight = workspace.clientArea("PlacementArea", workspace.activeScreen, 0).height
      var freeX = workspace.clientArea("PlacementArea", workspace.activeScreen, 0).x
      var freeY = workspace.clientArea("PlacementArea", workspace.activeScreen, 0).y
  
      //print(appName + ": " + app.x + ", " + app.y + ", " + app.height + ", " + app.width + ", " + freeX + ", " + freeY + ", " + freeHeight + ", " + freeWidth)
      if(app.height == freeHeight && (Math.abs((freeWidth/2) - app.width) < 1.1)){ // is half maximized vertically
        //maximize it well
        //check if left or right or nothing
        if(Math.abs(app.x-freeX) < 1.1){ // if left
          print("left")
          workspace.activeClient = client
          setTimeout(function () {
              workspace.slotWindowQuickTileLeft()
          }, 1);
        } else if(Math.abs(freeWidth/2 + freeX - app.x) < 1.1){ // if right
          print("right")
          workspace.activeClient = client
          setTimeout(function () {
              workspace.slotWindowQuickTileRight()
          }, 1);
        } else {
          print("nothing")
  
        }
      } else {
        print("nothing to do")
      }
  });
  
  /**/
  
  /*
  function log(txt){
    console.log(txt)
  }
  
  
  function dewit2() {
      var appName = "telegram" // to be changed
      var appClass = "telegramdesktop" // to be changed
      var found = false
      var clients = workspace.clientList();
      for (var i=0; i<clients.length; i++){
        var client = clients[i];
        if (client.moveable) { //change or in and
          //log(client);
          //log(client.resourceName);
          //log(client.resourceClass);
          //toggle it
          if(client.resourceName == appName && client.resourceClass == appClass){
            found = true
            if(workspace.activeClient == client){
              // minimize it
              client.minimized = true;
            }
            else{
              // raise it
              workspace.activeClient = client;
            }
          }
        }
      }
      if(!found){
        log("running it")
        //run it
        //callDBus('org.kde.klauncher5', '/KLauncher', 'exec_blind', '/usr/bin/bash', '/home/tubbadu/.bin/telegram');
        //callDBus('org.kde.klauncher5', '/KLauncher', 'exec_blind', '/usr/bin/bash', 'konsole');
        callDBus("org.kde.krunner","/org/kde/krunner","org.kde.KDBusService","CommandLine", "konsole", "usr/bin/bash");
      }
  }
  
  dewit2()
  registerShortcut("toggleTelegram", "do magic thing", "Meta+K", dewit2);
  
  */
  
  
  