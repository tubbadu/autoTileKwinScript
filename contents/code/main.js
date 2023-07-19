function log(t){
    const DEBUG=false;
    if(DEBUG) console.warn("debug: " + t)
}
function setTimeout(func, time){
    var timer = new QTimer();
    timer.interval = time; // set the time in milliseconds
    timer.singleShot = true; // in-case if setTimout and false in-case of setInterval
    timer.timeout.connect(this, func);
    timer.start();
}


function autoTile(client){
    const geom = JSON.stringify([client.x, client.y, client.height, client.width]); // perhaps it's better to use client.geometry, that gives a QRectF
    const ret = {
        "[960,0,1080,960]": function() {workspace.slotWindowQuickTileRight()}, // right
        "[40,0,1080,920]": function() {workspace.slotWindowQuickTileLeft()}, // left
        "[40,540,540,1880]": function() {workspace.slotWindowQuickTileBottom()}, // down
        "[40,0,540,1880]": function() {workspace.slotWindowQuickTileTop()}, // up
        "[960,0,540,960]": function() {workspace.slotWindowQuickTileTopRight()}, // up-right
        "[40,0,540,920]": function() {workspace.slotWindowQuickTileTopLeft()}, // up-left
        "[40,540,540,920]": function() {workspace.slotWindowQuickTileBottomLeft()}, // down-left
        "[960,540,540,960]": function() {workspace.slotWindowQuickTileBottomRight()} // down-right
    }
    log("is ok" + ret[geom])
    if(ret[geom] === undefined){
        log("not tiling")
    } else {
        log("tiling")
        ret[geom]();
    }
}

function onClientAdded(client){
    log("tiling started:")
    setTimeout(function() {
        autoTile(client);
        log("done")
    }, 100)
}

workspace.clientAdded.connect(client => onClientAdded(client))
