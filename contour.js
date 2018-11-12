let cs, cx, m, s, d, l, w, h, b, rT, rs, xf = 40,
rnd = (i,x) => { return Math.floor(Math.random()*x)+i}
cs = document.getElementById('c')
cx = cs.getContext('2d')

m = new Worker('conrec.min.js')
s = (a) => {
  let cl = rnd(180,40)
  return `rgba(${(cl-15)},${(cl-15)},${cl},${a})`
}
d = v => {
  let clr = 'rgba(242, 239, 229,.05)',p = v.map(a=>{return {x:(a.x*xf),y:(a.y*xf)}}),
  pl =p.length
  cx.beginPath()
  cx.shadowColor = '#e3dacd'
  cx.shadowBlur = 4
  cx.shadowOffsetX = 1
  cx.shadowOffsetY = 1
  cx.strokeStyle = s(0.3)
  cx.lineWidth = 1
  cx.lineJoin = 'round'
  switch(v.level) {
    case 400:
    clr = 'rgba(150,222,135,.05)'
    break
    case 600:
    clr = 'rgba(60,128,211,.05)'
    break
    case 800:
    clr = 'rgba(95,188,211,.05)'
    break
  }
  cx.fillStyle= clr
  cx.globalCompositeOperation = 'multiply'
  if(pl < 2) return false
  cx.moveTo(p[0].x, p[0].y)
  if(pl == 2)
  {
      cx.lineTo(p[1].x, p[1].y)
      return false;
  }
  for (var i = 1; i < pl - 2; i ++)
  {
      let xc = (p[i].x + p[i + 1].x) / 2
      let yc = (p[i].y + p[i + 1].y) / 2
      cx.quadraticCurveTo(p[i].x, p[i].y, xc, yc)
  }
  cx.quadraticCurveTo(p[i].x, p[i].y, p[i+1].x, p[i+1].y)
  cx.closePath()
  cx.fill()
  cx.stroke()
}
b = () => {
  w = window.innerWidth
  h = window.innerHeight
  lw = Math.round(w/xf)-1
  lh = Math.round(h/xf)-1
  cs.width = w
  cs.height = h
  let rw = [...Array(lw).keys()]
  let rh = [...Array(lh).keys()]
  let data = rw.map(()=>rh.map(()=>rnd(-50,1000)))
  data.push(rw.map(()=>-100))
  data.unshift(rw.map(()=>-100))
  data.forEach(d=> {
    d.push(-100);
    d.unshift(-100);
  });
  rw.push((lw),(lw+1))
  rh.push((lh),(lh+1))
  m.postMessage({x:lw+1,y:lh+1,rw:rw,rh:rh,data:data,n:5})
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

  let c3 = document.createElement('canvas');
  c3.width = c3.height = 50
  let ctx3 = c3.getContext('2d')
  for(let i = 0; i<50; i++) {
    for(let j = 0; j<50; j++) {
      let no  = 150+ rnd(0,60)
      let y = rnd(-1,2)+j
      ctx3.fillStyle = `rgba(${no},${no},${no},0.5)`
      ctx3.fillRect(i,y,1,1)
    }
  }
  document.styleSheets[0].addRule('.border:after','border: 0.1em solid transparent;')
  document.styleSheets[0].addRule('.border:after',`border-image: url(${c3.toDataURL()}) 2 5 2 5 stretch round;`);

  //Array.from( document.getElementsByClassName('border')).forEach(a=>a.style.borderImage =  `url(${c3.toDataURL()})`)