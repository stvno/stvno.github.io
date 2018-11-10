onmessage = function(e) {
  let cs = new OffscreenCanvas(50,50)
  let ctx = cs.getContext('2d')
  for(let i = 0; i<50; i++) {
    for(let j = 0; j<50; j++) {
      let no  = 15+ Math.floor(Math.random()*60)
      ctx.fillStyle = `rgba(${no},${no},${no},1)`
      ctx.fillRect(i,j,1,1)
    }
  }
  postMessage(cs.transferToImageBitmap())
}
