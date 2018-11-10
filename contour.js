let cs, cx, m, s, d, l, w, h, b, rT, rs, xf = 40
cs = document.getElementById('c')
cx = cs.getContext('2d')

m = new Worker('conrec.js')
s = (a) => {
  let cl = Math.floor(Math.random() * 40 ) + 180
  return `rgba(${(cl-15)},${(cl-15)},${cl},${a})`
}
d = v => {

  cx.beginPath()
  cx.strokeStyle = s(0.3)
cx.lineWidth = 1
cx.lineJoin = 'round'
let clr = `rgba(${v.level/10},${v.level/10},${v.level/16+125},0.1)`
console.log(clr)
cx.fillStyle= clr

//  cx.fillStyle= 'rgba(227,218,205,1)'
  //cx.fillStyle= '#f2efe5'
//  cx.fillStyle= 'rgba(255,255,255,0.4)'
 cx.globalCompositeOperation = 'color-burn'

   cx.shadowColor = '#e3dacd'
   cx.shadowBlur = 3
   cx.shadowOffsetX = 1
   cx.shadowOffsetY = 1
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
  cx.closePath()
  //cx.stroke()
  cx.fill()
  cx.stroke()
}
l = 100
b = () => {
  w = window.outerWidth
  h = window.outerHeight
  l = Math.floor(Math.max(w,h)/xf);
  cs.width = w;
  cs.height = h;
  let r = [...Array(l).keys()]

  let data = r.map(()=>r.map(()=>Math.floor(Math.random()*1000)-500))
  data.push(r.map(()=>0))
  data.unshift(r.map(()=>0))
  data.forEach(function(d) {
    d.push(0);
    d.unshift(0);
  });
  r.push((l+1))
  r.push((l+2))

  m.postMessage({l:l,r:r,data:data})
}
m.onmessage = function(e) {
  let cw = cx.canvas.width, ch = cx.canvas.height
  cx.clearRect(0, 0, cw, ch);

  console.log(e.data)
  e.data.sort((a,b)=>a.level-b.level).forEach(a => d(a));
}
b()
rs=()=>{clearTimeout(rT);rT = setTimeout(()=>{b()},100)}
window.onresize = rs



let n = new Worker('noise.js')
n.postMessage(true)
  let c2 = document.createElement('canvas');
  c2.width = c2.height =50;
n.onmessage = function(e) {

  var two = c2.getContext("bitmaprenderer");
  two.transferFromImageBitmap(e.data);
  //document.body.style.backgroundImage = `url(${c2.toDataURL("image/png")})`
}