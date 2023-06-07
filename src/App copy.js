import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";

/*d3 */
function App() {
  /*scaleLinearで範囲
    .domine 定義域
    .nice 範囲が良い感じに

  accent = d3.scaleOrdinal(d3.schemeAccent); 色を順番に付けてくれる
  */
  //const =で更新するとエラー
  const data = [
    { name: d3.path(), value: 250, color:'orange'},
    { name: d3.path(), value: 200, color:'purple'},
    { name: d3.path(), value: 100, color:'pink'},
  ];
  
  const path_y = d3.path();
  path_y.moveTo(100,0);//終わり
  path_y.lineTo(100,500);//どこから

  const show_data = data.map((data, i) => {
    data.name.rect(100, 100+i*100, data.value, 30);
    const b = data.name.toString();
    return <path fill={data.color} d={b} strokeWidth="2" />;
  });

  const path_data1_text = d3.path();
  path_data1_text.moveTo(90,115);
  path_data1_text.lineTo(100,115);
  
  const path_data2_text = d3.path();
  path_data2_text.moveTo(90,215);
  path_data2_text.lineTo(100,215);

  const path_data3_text = d3.path();
  path_data3_text.moveTo(90,315);
  path_data3_text.lineTo(100,315);
  
  /*
  const bar = data.map((data, i) => {
    return(0,0);
  });
  */
 
  /*  
  const path = d3.path();
  path.moveTo(100,100);
  path.quadraticCurveTo(10,250,200,100);
  const path_x = d3.path();
  path_x.moveTo(300,200);//終わり
  path_x.lineTo(0,200);//どこから
  
  const data = [10,20,30];
  data.map((_, index) => {
    data[index] = 10;
  });

  let el;
  let message = function(msg, size, color) {
    const msgStyle = {
      fontSize: size,
      color: color
    };
    return <p style={msgStyle}>{msg}</p>
  }*/


  //textAnchor="end" 右端が0 start 左端が0
  //dominant-baseline text-before-edge:上の端が基準
  //transForm アフィン変換(オブジェクト座標, ワールド座標)

  /*path.moveTo(0,0);path.moveTo(10,0);path.moveTo(10,10);path.moveTo(0,10);
    path.closePath();  //パスを引くイメージ
  */
 //rect()
  return (
    <div className="App">
      1<br/>
      <svg version="1.1"
          baseProfile="full"
          width="400" height="400"
          xmlns="http://www.w3.org/2000/svg">
        <path stroke="black" fill="none" d={path_y} stroke-width="2"/>
        {show_data}

        <rect width="100" height="20" x="100"/>
        <path stroke="black" fill="none" d={path_data1_text} stroke-width="2"/>
        <path stroke="black" fill="none" d={path_data2_text} stroke-width="2"/>
        <path stroke="black" fill="none" d={path_data3_text} stroke-width="2"/>

        <text x="85" y="115" font-size="18" textAnchor="end" dominantBaseline="text-before-edge">A</text>
        <text x="85" y="215" font-size="18" textAnchor="end" dominantBaseline="central">B</text>
        <text x="85" y="315" font-size="18" textAnchor="end" dominantBaseline="central">C</text>

      </svg>
          
    </div>
  );
}

export default App;
