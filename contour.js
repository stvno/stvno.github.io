let cs, cx, m, s, d, l, w, h, b, rT, rs, xf = 40
cs = document.getElementById('c')
cx = cs.getContext('2d')
cx.lineWidth = 0.1
cx.lineJoin = 'round'
cx.globalCompositeOperation = 'multiply'
cx.shadowColor = '#ddd'
cx.shadowBlur = 2
cx.shadowOffsetX = 1
cx.shadowOffsetY = 1
m = new Worker('conrec.min.js')
s = (a) => {
  let cl = Math.floor(Math.random() * 40 ) + 180
  return `rgba(${(cl-15)},${(cl-15)},${cl},${a})`
}
d = v => {
  cx.beginPath()
  cx.strokeStyle = s(0.3)
  cx.fillStyle= s(0.02)
  let p = v.map(a=>{return {x:(a.x*xf),y:(a.y*xf)}})
  let pl =p.length;
  if(pl < 2) return false
  if(pl == 2)
  {
      cx.moveTo(p[0].x, p[0].y)
      cx.lineTo(p[1].x, p[1].y)
      return false;
  }
  cx.moveTo(p[0].x, p[0].y)
  for (var i = 1; i < pl - 2; i ++)
  {
      let xc = (p[i].x + p[i + 1].x) / 2
      let yc = (p[i].y + p[i + 1].y) / 2
      cx.quadraticCurveTo(p[i].x, p[i].y, xc, yc)
  }
  cx.quadraticCurveTo(p[i].x, p[i].y, p[i+1].x, p[i+1].y)
  cx.fill()
  cx.stroke()
}
l = 100
w = window.outerWidth
h = window.outerHeight;
b = () => {
  w = window.outerWidth;
  h = window.outerHeight;
  l = Math.floor(Math.max(w,h)/xf)+1;
  cs.width = w;
  cs.height = h;
  let r = [...Array(l).keys()]
  let rr= r.map(a=>a+Math.floor(Math.random() * 2) - 1  )
  let data = rr.map(a=>rr.map(b=>Math.round(Math.random()*100)))
  m.postMessage({l:l,r:r,rr:rr,data:data})
}
m.onmessage = function(e) {
  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
  e.data.forEach(a => d(a));
}
b()
rs=()=>{clearTimeout(rT);rT = setTimeout(()=>{b()},250)}
window.onresize = rs