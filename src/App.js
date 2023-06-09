//import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import React, { useEffect, useState } from 'react';

//CI
//https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json
//https://observablehq.com/@d3/d3-scaleordinal
//d3.extent
//Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]
function App() {
  const [data, setData] = useState([]);
  const [yValue, setYValue] = useState("sepalWidth");
  const [xValue, setXValue] = useState("sepalLength");

  const yMax = (Math.max(...data.map(item => item[yValue])));
  const yMin = (Math.min(...data.map(item => item[yValue])));
  const xMax = (Math.max(...data.map(item => item[xValue])));
  const xMin = (Math.min(...data.map(item => item[xValue])));
  //配列名は複数形
  const [filterKinds, setfilterKinds] = useState(["setosa","versicolor","virginica"]);

  const margin = { "top": 60, "bottom": 60, "right": 60, "left": 60 };

  const def_width = 500;
  const def_one_width = 5;
  const def_one_width_space = def_width / def_one_width;

  const def_height = 500;
  const def_one_height = 10;
  const def_one_height_space = def_height / def_one_height;

  const browse_width = 20, browse_height = 20;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    let url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json';
    fetch(url)
    .then(function (response) {
      return response.json(); //読み込むデータをJSONに設定
    })
    .then(function (json) {
      const json_def = json;
      setData(json_def);
    });
  }, []);

 /* //reactでcss
  const circleStyle = {
    display: 'block',
    transition: "cx .5s ease, cy .5s ease"
    //,transitionProperty: "cx, cy",
    //transitionDuration: ".5s ease"
  }*/
  /*const path_x = d3.path();
  path_x.moveTo(margin.top,margin.left+def_height);
  path_x.lineTo(margin.top+def_width+browse_width,margin.left+def_height);
  setXPath(path_x.toString());*/

  const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0,def_width]);

  const yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([0,def_height]);//.range([def_height,0]);

  const handleSelectXChange = (event) => {
    setXValue(event.target.value);
  };

  const handleSelectYChange = (event) => {
    setYValue(event.target.value);
  };

  const speciesSelectBtn = (speciesSelectValue) => {
    if (filterKinds.includes(speciesSelectValue)) {
      setfilterKinds(filterKinds.filter(item => item !== speciesSelectValue));
    } else {
      setfilterKinds([...filterKinds, speciesSelectValue]);
    }
    setData(data.filter(item => filterKinds.includes(item.species)));
  };


  return (
    <div className="App">
      <div>tytle</div>
      <section id="main_graph">
        <svg version="1.1" 
            baseProfile="full"
            width={browse_width+def_width+margin.top+margin.bottom} height={browse_height+def_height+margin.left*2}
            xmlns="http://www.w3.org/2000/svg">
          <line x1={margin.left} y1={0} x2={margin.left} y2={margin.top+def_height} stroke="#353535" />
          <line x1={margin.left} y1={margin.top+def_height} x2={margin.left+def_width+margin.left} y2={margin.top+def_height} stroke="#353535" />
       
          {data.map((item, index) => (
            <circle
              key={index}
              cx={browse_width+margin.left+xScale(item[xValue])}
              cy={-browse_height+(margin.top+def_height)-yScale(item[yValue])} // 位置を調整するために適切な値を設定してください
              r={5}
              fill={color(item.species)}
            />
          ))}

          {Array.from({ length: def_one_width+1}).map((_, i) => (
            <>
              <line x1={browse_width+margin.top+(i*def_one_width_space)} y1={margin.top+def_height} x2={browse_width+margin.left+(i*def_one_width_space)} y2={margin.top+def_height+10} stroke="#353535" />
              <text x={browse_width+margin.left+(i*def_one_width_space)} y={margin.top+def_height+10} font-size="18" fill="#353535" textAnchor="middle" dominantBaseline="text-before-edge">{(xMin + (xMax-xMin)/def_one_width*i).toFixed(1)}</text>
            </>
          ))}

          {Array.from({ length: def_one_height+1}).map((_, i) => (
            <>
              <line x1={margin.top-10} y1={-browse_height+(def_height+margin.left)-((i)*(def_one_height_space))} x2={margin.top} y2={-browse_height+(def_height+margin.left)-((i*def_one_height_space))} stroke="#353535" />
              <text x={margin.top-10} y={-browse_height+(def_height+margin.left)-((i)*(def_one_height_space))} font-size="18" fill="#353535" textAnchor="end" dominantBaseline="middle">{(yMin + (yMax-yMin)/def_one_height*i).toFixed(1)}</text>
            </>
          ))}
        </svg>
        <div id="horizontalValue">{xValue}</div>
        <div id="verticalValue">{yValue}</div>
      </section>

      <svg id="graphItem">
        <circle cx="10" cy="10" r="5" fill={color("setosa")}/>
        <text x="20" y="10" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn("setosa")}>setosa</text>

        <circle cx="10" cy="30" r="5" fill={color("versicolor")}/>
        <text x="20" y="30" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn("versicolor")}>versicolor</text>

        <circle cx="10" cy="50" r="5" fill={color("virginica")}/>
        <text x="20" y="50" font-size="18" textAnchor="start" dominantBaseline="middle"onClick={() => speciesSelectBtn("virginica")}>virginica</text>
      </svg>

      <div>
        <h2>横</h2>
        <select onChange={handleSelectXChange}>
          <option value="">選択してください</option>
          <option value="sepalLength">sepalLength</option>
          <option value="sepalWidth">sepalWidth</option>
          <option value="petalLength">petalLength</option>
          <option value="petalWidth">petalWidth</option>
        </select>
      </div>

      <div>
        <h2>縦</h2>
        <select onChange={handleSelectYChange}>
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
