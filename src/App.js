import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import React, { useEffect, useState } from 'react';

//https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json
//https://observablehq.com/@d3/d3-scaleordinal
//d3.extent
//Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]
function App() {
  const [data, setData] = useState([]);
  const [xPath, setXPath] = useState(null);
  const [yPath, setYPath] = useState(null);
  const [verticalValue, setVerticalValue] = useState("sepalWidth");
  const [horizontalValue, setHorizontalValue] = useState("sepalLength");

  const [verticalMax, setVerticalMax] = useState(0);
  const [verticalMin, setVerticalMin] = useState(0);
  const [horizontalMax, setHorizontalMax] = useState(0);
  const [horizontalMin, setHorizontalMin] = useState(0);

  const [filterKinds, setfilterKinds] = useState(["setosa","versicolor","virginica"]);

  const margin = { "top": 60, "bottom": 60, "right": 60, "left": 60 };

  const def_width = 500;
  const def_one_width = 5;
  const def_one_width_space = def_width / def_one_width;

  const def_height = 500;
  const def_one_height = 10;
  const def_one_height_space = def_height / def_one_height;

  const browse_width = 20;//最小大値から＋
  const browse_height = 20;


  useEffect(() => {
    let url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json';
    fetch(url)
    .then(function (response) {
      return response.json(); //読み込むデータをJSONに設定
    })
    .then(function (json) {
      setData(json);

      /*setData(data.filter(({species}) => {
      return filterKinds.some(item => item === species);
    }));ここに書いて、第二をfilterKindsだとできる */
    });
  }, []);//data
  
  useEffect(() => {
    setData(data.filter(({species}) => {
      return filterKinds.includes(species);
    }));
  }, [filterKinds]);

  useEffect(() => {
    if (data.length > 0) {//注意 空でないか
      setVerticalMax(Math.max(...data.map(item => item[verticalValue])));
      setVerticalMin(Math.min(...data.map(item => item[verticalValue])));
      setHorizontalMax(Math.max(...data.map(item => item[horizontalValue])));
      setHorizontalMin(Math.min(...data.map(item => item[horizontalValue])));
//setVerticalMax(Math.max(...data.map(({sepalWidth}) => sepalWidth)));
      /*setData(data.filter(({species}) => {
        let result;
        if(filterKinds[0] == 1){result = species === "setosa"} 
        if(filterKinds[1] == 1){result = species === "versicolor"} 
        if(filterKinds[2] == 1){result = species === "virginica"} 
        return result;
      }));*/
      
      console.log(data);
    }
    
    //domainが0~100でrangeが0~500なら 50のとき250を返す
    /*axis */
    const path_x = d3.path();
    path_x.moveTo(margin.top,margin.left+def_height);
    path_x.lineTo(margin.top+def_width+browse_width,margin.left+def_height);
    const path_y = d3.path();
    path_y.moveTo(margin.top,margin.left-browse_height);
    path_y.lineTo(margin.top,margin.left+def_height);

    setXPath(path_x.toString());
    setYPath(path_y.toString());
  }, [verticalValue,horizontalValue]);

  const xScale = d3.scaleLinear()
    .domain([horizontalMin, horizontalMax])
    .range([0,def_width]);

  const yScale = d3.scaleLinear()
    .domain([verticalMin, verticalMax])
    .range([0,def_height]);
    //.range([def_height,0]);

  const handleSelectChange = (event) => {
    setHorizontalValue(event.target.value);
  };
  const handleSelectChange2 = (event) => {
    setVerticalValue(event.target.value);
  };

  const speciesSelectBtn = (speciesSelectValue) => {
    if(speciesSelectValue == 0){
      if(filterKinds[0] == 0)
        setfilterKinds(["setosa",filterKinds[1],filterKinds[2]]);
      else
        setfilterKinds(["",filterKinds[1],filterKinds[2]]);
    }else if(speciesSelectValue == 1){
      if(filterKinds[1] == 0)
        setfilterKinds([filterKinds[0],"versicolor",filterKinds[2]]);
      else
        setfilterKinds([filterKinds[0],"",filterKinds[2]]);
    }else if(speciesSelectValue == 2){
      if(filterKinds[2] == 0)
        setfilterKinds([filterKinds[0],filterKinds[1],"virginica"]);
      else
        setfilterKinds([filterKinds[0],filterKinds[1],""]);
    }
  };

  const color = d3.scaleOrdinal(d3.schemeCategory10);//値が同じなら同じ色、違うと違う色を返す
  /*scaleLinearで範囲
    .domine 定義域
    .nice 範囲が良い感じに

  accent = d3.scaleOrdinal(d3.schemeAccent); 色を順番に付けてくれる
  */
  //const =で更新するとエラー

  /*<path stroke="black" fill="none" d={path_x} stroke-width="2"/>
        <path stroke="black" fill="none" d={path_y} stroke-width="2"/> */
        //transform='translate(${x},10)'で親要素ごと移動

/*<line x1="0" y1="80" x2="100" y2="20" stroke="black" />*/
/*
function generateXPath(index) {
    const path = d3.path();
    path.moveTo(index, margin.left+def_height);
    path.lineTo(index, margin.left+def_height+10);
    return path.toString();
}
  function generateYPath(index) {
  const path = d3.path();
  path.moveTo(margin.top-5, index);
  path.lineTo(margin.top, index);
  return path.toString();
}

<path
  stroke="black" 
  fill="none" 
  d={generateXPath(browse_width+margin.top+def_one_width_space*index)}
  stroke-width="2"/>

<path
  stroke="black" 
  fill="none" 
  d={generateYPath(-browse_height+margin.left+def_height-def_one_height_space*index)}
  stroke-width="2"/>
*/
//fill={item[horizontalValue] === "setosa" ? "red" : "blue"}


  return (
    <div className="App">
      <div>tytle</div>
      <section id="main_graph">
        <svg version="1.1" 
            baseProfile="full"
            width={browse_width+def_width+margin.top+margin.bottom} height={browse_height+def_height+margin.left*2}
            xmlns="http://www.w3.org/2000/svg">
          <path stroke="#353535" fill="none" d={xPath} stroke-width="2"/>
          <path stroke="#353535" fill="none" d={yPath} stroke-width="2"/>
          
          {data.map((item, index) => (
            <circle
              key={index}
              cx={browse_width+margin.left+xScale(item[horizontalValue])}
              cy={-browse_height+(margin.top+def_height)-yScale(item[verticalValue])} // 位置を調整するために適切な値を設定してください
              r={5}
              fill={color(item.species)}
            />
          ))}

          {Array.from({ length: def_one_width+1}).map((_, i) => (
            <>
              <line x1={browse_width+margin.top+(i*def_one_width_space)} y1={margin.top+def_height} x2={browse_width+margin.left+(i*def_one_width_space)} y2={margin.top+def_height+10} stroke="#353535" />
              <text x={browse_width+margin.left+(i*def_one_width_space)} y={margin.top+def_height+10} font-size="18" fill="#353535" textAnchor="middle" dominantBaseline="text-before-edge">{(horizontalMin + (horizontalMax-horizontalMin)/def_one_width*i).toFixed(1)}</text>
            </>
          ))}

          {Array.from({ length: def_one_height+1}).map((_, i) => (
            <>
              <line x1={margin.top-10} y1={-browse_height+(def_height+margin.left)-((i)*(def_one_height_space))} x2={margin.top} y2={-browse_height+(def_height+margin.left)-((i*def_one_height_space))} stroke="#353535" />
              <text x={margin.top-10} y={-browse_height+(def_height+margin.left)-((i)*(def_one_height_space))} font-size="18" fill="#353535" textAnchor="end" dominantBaseline="middle">{(verticalMin + (verticalMax-verticalMin)/def_one_height*i).toFixed(1)}</text>
            </>
          ))}
        </svg>
        <div id="horizontalValue">{horizontalValue}</div>
        <div id="verticalValue">{verticalValue}</div>
      </section>

      <svg id="graphItem">
        <circle cx="10" cy="10" r="5" fill={color("setosa")}/>
        <text x="20" y="10" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn(0)}>setosa</text>

        <circle cx="10" cy="30" r="5" fill={color("versicolor")}/>
        <text x="20" y="30" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn(1)}>versicolor</text>

        <circle cx="10" cy="50" r="5" fill={color("virginica")}/>
        <text x="20" y="50" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn(2)}>virginica</text>
      </svg>

      <div>
        <h2>横</h2>
        <select onChange={handleSelectChange}>
          <option value="">選択してください</option>
          <option value="sepalLength">sepalLength</option>
          <option value="sepalWidth">sepalWidth</option>
          <option value="petalLength">petalLength</option>
          <option value="petalWidth">petalWidth</option>
        </select>
      </div>

      <div>
        <h2>縦</h2>
        <select onChange={handleSelectChange2}>
          <option value="">選択してください</option>
          <option value="sepalLength">sepalLength</option>
          <option value="sepalWidth">sepalWidth</option>
          <option value="petalLength">petalLength</option>
          <option value="petalWidth">petalWidth</option>
        </select>
      </div>


    </div>
  );
}
export default App;
