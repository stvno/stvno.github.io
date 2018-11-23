let cs, cx, m, s, d, l, w, h, b, rT, rs, xf = 50, n=10
rnd = (i,x) => { return Math.floor(Math.random()*x)+i}
cs = document.getElementById('c')
cx = cs.getContext('2d')

m = new Worker('conrec.min.js')
d = v => {
  p = v.map(a=>{return {x:(a.x*xf),y:(a.y*xf)}}),
  pl =p.length
  cx.beginPath()
  cx.strokeStyle = v.level%300?'rgba(123,123,123,0.1)':'rgba(153,153,153,0.2)'
  cx.lineWidth = 1
  cx.lineJoin = 'round'
  // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas?answertab=active#tab-top
  if(pl < 2) return false
  cx.moveTo(p[0].x, p[0].y)
  if(pl == 2)
  {
      cx.lineTo(p[1].x, p[1].y)
      return false;
  }
  for (var i = 1; i < pl - 2; i ++)
  {
      let xc = (p[i].x + p[i + 1].x) / 2,
      yc = (p[i].y + p[i + 1].y) / 2
      cx.quadraticCurveTo(p[i].x, p[i].y, xc, yc)
  }
  cx.quadraticCurveTo(p[i].x, p[i].y, p[i+1].x, p[i+1].y)
  cx.closePath()
  cx.stroke()
}
b = () => {
  w = window.innerWidth
  h = window.innerHeight
  lw = Math.floor(w/xf)
  lh = Math.floor(h/xf)
  cs.width = w
  cs.height = h
  let rw = [...Array(lw).keys()],
   rh = [...Array(lh).keys()],
   data = rw.map(()=>rh.map(()=>rnd(0,1000)))
  data.push(rh.map(()=>-1))
  data.unshift(rh.map(()=>-1))
  data.forEach(d=> {
    d.push(-1);
    d.unshift(-1);
  });
  rw.push((lw),(lw+1))
  rh.push((lh),(lh+1))
  m.postMessage({x:lw+1,y:lh+1,rw:rw,rh:rh,data:data,n:n})
}
m.onmessage = function(e) {
  let cw = cx.canvas.width, ch = cx.canvas.height
  cx.clearRect(0, 0, cw, ch);
  e.data.sort((a,b)=>a.level-b.level).forEach(a => d(a));
}
b()
rs=()=>{clearTimeout(rT);rT = setTimeout(()=>{b()},100)}
window.onresize = rs



let c2 = document.createElement('canvas');
c2.width = c2.height = 50
let ctx = c2.getContext('2d')
for(let i = 0; i<50; i++) {
  for(let j = 0; j<50; j++) {
    j=j+2
    let no  = 150+ rnd(0,60)
    let y = rnd(-1,2)+j
    ctx.fillStyle = `rgba(${no},${no},${no},0.1)`
    ctx.fillRect(i,y,1,1)
    j=j+2
  }
}
document.body.style.backgroundImage = `url(${c2.toDataURL()})`

