export const SHAPES = [
  {
    name: 'Square',
    value: 'square',
    path: 'M 0 0 H 100 V 100 H 0 Z'
  },
  {
    name: 'Circle',
    value: 'circle',
    path: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0'
  },
  {
    name: 'Triangle',
    value: 'triangle',
    path: 'M50,0 L100,100 L0,100 Z'
  },
  {
    name: 'Reverse Triangle',
    value: 'reverse-triangle',
    path: 'M0,0 L100,0 L50,100 Z'
  },
  {
    name: 'Star',
    value: 'star',
    path: 'M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z'
  },
  {
    name: 'Heart',
    value: 'heart',
    path: 'M50,100 L87,63 A25,25 0 0,0 50,25 A25,25 0 0,0 13,63 Z'
  },
  {
    name: 'Rectangle',
    value: 'rectangle',
    path: 'M 0 0 H 150 V 100 H 0 Z'
  },
  {
    name: 'Line',
    value: 'line',
    path: 'M 0,50 L 100,50'
  },
  {
    name: 'Diamond',
    value: 'diamond',
    path: 'M50,0 L100,50 L50,100 L0,50 Z'
  },
  {
    name: 'Pentagon',
    value: 'pentagon',
    path: 'M50,0 L97,35 L79,91 L21,91 L3,35 Z'
  },
  {
    name: 'Hexagon',
    value: 'hexagon',
    path: 'M25,0 L75,0 L100,50 L75,100 L25,100 L0,50 Z'
  },
  {
    name: 'Cross',
    value: 'cross',
    path: 'M0,0 L100,100 M100,0 L0,100'  // Changed path to create an X shape
  },
  {
    name: 'Arrow',
    value: 'arrow',
    path: 'M0,40 H70 L70,10 L100,50 L70,90 L70,60 H0 Z'
  },
  {
    name: 'Curved Line',
    value: 'curved-line',
    path: 'M 0,50 Q 50,0 100,50'  // Quadratic Bezier curve
  }
];
