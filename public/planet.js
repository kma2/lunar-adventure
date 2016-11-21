const octagon = function(radius, start_x, start_y) {
  const edgeLength = radius/Math.sqrt(4+(2 * Math.sqrt(2))) * 2;

  const v1_x = start_x;
  const v1_y = start_y;
  const v2_x = start_x + edgeLength;
  const v2_y = start_y;

  let finalArray = [[v1_x, v1_y], [v2_x, v2_y]];

  return finalArray;
}

  var mainPlanet = octagon(250, 500, 150);
  var largeAsteroid = octagon(120, 1000, 300);
  var mediumAsteroid = octagon(60, 200, 75);
  var smallAsteroid = octagon(30, 900, 150);

        // draws a planet shape edge by edge
const createPlanet = function(array, numSegs, height) {
  var points = [];
  var height = height || 180;
  var displace = height / 10;
  var roughness = 0.8;
  var numSegs = numSegs;

  let edgeLength = array[1][0] - array[0][0];
  const segLength = edgeLength/numSegs;
  let power = Math.pow(2, Math.ceil(Math.log(edgeLength) / (Math.log(2))));

  // TOP OF OCTAGON
  let x = array[0][0]
  let y = array[0][1];
  for(var j = 0; j < numSegs - 1; j++){
    x += segLength;
    y += (Math.random()*displace*2) - displace;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }

  // TOP RIGHT OF OCTAGON - work in progress
  displace = height / 10;
  for(j = 0; j < numSegs; j++){
    x += (Math.random()*displace*2) + displace/2;
    y += (Math.random()*displace*2) + displace/2;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }

  // RIGHT SIDE OF OCTAGON
  displace = height / 10;
  for(j = 0; j < numSegs; j++){
    x += (Math.random()*displace*2) - displace;
    y += segLength;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }


  // BOTTOM RIGHT OF OCTAGON - work in progress
  displace = height / 10;
  for(j = 0; j < numSegs; j++){
    x -= segLength/1.6;
    y += (Math.random()*displace*2) + displace/2;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }


  // BOTTOM OF OCTAGON
  displace = height / 10;
  points.push(x)
  points.push(y)
  for(j = 0; j < numSegs; j++){
    x -= segLength;
    y += (Math.random()*displace*2) - displace;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }

  // BOTTOM LEFT of OCTAGON - work in progress
  displace = height / 10;
  for(j = 0; j < numSegs; j++){
    x -= (Math.random()*displace*2) + displace/2;
    y -= (Math.random()*displace*2) + displace/2;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }

  // LEFT SIDE OF OCTAGON
  displace = height / 10;
  points.push(x)
  points.push(y)
  for(j = 0; j < numSegs; j++){
    x -= (Math.random()*displace*2) - displace;
    y -= segLength;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }

  // TOP LEFT OF OCTAGON - work in progress
  displace = height / 10;
  for(j = 0; j < numSegs; j++){
    x += segLength/2;
    y -= (Math.random()*displace*2) - displace/10;
    points.push(x);
    points.push(y);
    displace *= roughness;
  }
  x = (array[0][0] + x)/2;
  y = (array[0][1] + y)/2;
  console.log(x);
  console.log(y);
  points.push(x);
  points.push(y);

  return points
};


mainPlanet = createPlanet(mainPlanetArray, 10);
largeAsteroid = createPlanet(largeAsteroid, 4);
mediumAsteroid = createPlanet(mediumAsteroid, 2, 90);
smallAsteroid = createPlanet(smallAsteroid, 2, 45);