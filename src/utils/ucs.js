function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function readTxtFile(filePath) {
  const fs = require('fs');
  const data = fs.readFileSync(filePath, 'utf8');
  var lines = data.split("\n");
  var nodes = [];
  var adjacencyMatrix = [];
  for (var i = 1; i < lines.length; i++) {
    var row = lines[i].trim().split(" ").map(Number);
    var nama = lines[i].trim().split(" ").map(String)[0];
    if (i-1 < lines[0]) {
      var node = {
        "id": i-1,
        "nama":nama,
        "x": row[1],
        "y": row[2]
      };
      nodes.push(node);
    }
    else {
      adjacencyMatrix.push(row);
    }
  }
  var graph = {
    "node": nodes,
    "matrix": adjacencyMatrix
  };
  return graph;
}

function euclideanDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


/* perhitungan menggunakan euclidean distance */
function ucsEuclidean(graph, start, goal) {
    let queue = [[start, 0,[start]]];
    let visited = new Set();
  
    while (queue.length > 0) {
      let [current, cost,riwayat] = queue.shift();
        if (current === goal) {
        return [cost,riwayat];
      }
  
    
      visited.add(current);
  
      
      for (let i = 0; i < graph.matrix[current].length; i++) {
        if (graph.matrix[current][i] === 1 && !visited.has(i)) {
          newCost = cost + euclideanDistance(graph.node[current], graph.node[i]);
          queue.push([i, newCost,riwayat.concat(i)]);
        }
      }
      queue.sort((a, b) => a[1] - b[1]);
    }
  
    return null;
  }
  
/* perhitungan menggunakan haversine distance */
function ucsHaversine(graph, start, goal) {
    let queue = [[start, 0,[start]]];
    let visited = new Set();
    while (queue.length > 0) {
      let [current, cost,riwayat] = queue.shift();
        if (current === goal) {
        return [cost,riwayat];
      }
  
    
      visited.add(current);
  
      
      for (let i = 0; i < graph.matrix[current].length; i++) {
        if (graph.matrix[current][i] === 1 && !visited.has(i)) {
          newCost = cost + haversine(graph.node[current].x, graph.node[current].y, graph.node[i].x, graph.node[i].y);
          queue.push([i, newCost,riwayat.concat(i)]);
        }
      }
      queue.sort((a, b) => a[1] - b[1]);
    }
  
    return null;
  }

  // test

function ucsGraphBerbobot(graph,start,goal){
  let queue = [[start, 0,[start]]];
  let visited = new Set();
  while (queue.length > 0) {
    let [current, cost,riwayat] = queue.shift();
      if (current === goal) {
      return [cost,riwayat];
    }

  
    visited.add(current);

    
    for (let i = 0; i < graph.matrix[current].length; i++) {
      if (graph.matrix[current][i] > 0 && !visited.has(i)) {
        newCost = cost + graph.matrix[current][i];
        queue.push([i, newCost,riwayat.concat(i)]);
      }
    }
    queue.sort((a, b) => a[1] - b[1]);
  }

  return null;
}

// let graph = readTxtFile("src/utils/test2.txt")
// let [a,b] = ucsEuclidean(graph, 1, 7)
// let [c,d] = ucsHaversine(graph, 1, 7)
// console.log("euclidean")
// b.forEach(element => {
//     console.log(element)
//     console.log(graph.node[element].nama);   
// });
// console.log(a,b); 
// console.log("haversine")
// d.forEach(element => {
//   console.log(element)
//   console.log(graph.node[element].nama);   
// });
// console.log(c,d);

