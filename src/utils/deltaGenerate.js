export default function deltaGenerate(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.lat;
    maxX = point.lat;
    minY = point.lng;
    maxY = point.lng;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.lat);
    maxX = Math.max(maxX, point.lat);
    minY = Math.min(minY, point.lng);
    maxY = Math.max(maxY, point.lng);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX*2.5,
    longitudeDelta: deltaY*2.5,
  };
}
