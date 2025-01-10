const blockShapes = {
  "red-block": {
    rotations: [
      [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: -1 },
      ],
      [
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: -1, col: 0 },
      ],
      [
        { row: -1, col: 0 },
        { row: -1, col: -1 },
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
    ],
  },
  "yellow-block": {
    rotations: [
      [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 },
        { row: 0, col: -1 },
      ],
      [
        { row: -1, col: -1 },
        { row: 0, col: 0 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: -1, col: 0 },
      ],
      [
        { row: -1, col: 1 },
        { row: -1, col: -1 },
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
    ],
  },
  "green-block": {
    rotations: [
      [
        { row: -1, col: -1 },
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: -1 },
        { row: 0, col: -2 },
        { row: -1, col: 1 },
        { row: -1, col: 0 },
        { row: 0, col: 0 },
      ],
      [
        { row: 0, col: 1 },
        { row: -2, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 0 },
        { row: -1, col: 0 },
      ],
      [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 0, col: 0 },
      ],
    ],
  },
  "gray-block": [
    { row: -1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
  ],
  "cyan-block": {
    rotations: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: -1, col: 0 },
      ],
      [
        { row: 0, col: 1 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
      ],
      [
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: -2 },
        { row: 0, col: -3 },
        { row: 0, col: 0 },
      ],
      [
        { row: -1, col: 0 },
        { row: -2, col: 0 },
        { row: -3, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 0 },
      ],
    ],
  },
  "magenta-block": {
    rotations: [
      [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 1, col: -1 },
      ],
      [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: -1, col: 0 },
        { row: 0, col: 0 },
        { row: -1, col: -1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: -1 },
        { row: 0, col: 1 },
        { row: 0, col: 0 },
        { row: -1, col: 1 },
      ],
      [
        { row: 0, col: -1 },
        { row: -1, col: -1 },
        { row: 1, col: 0 },
        { row: 0, col: 0 },
        { row: 1, col: 1 },
      ],
    ],
  },
  "purple-block": {
    rotations: [
      [
        { row: -1, col: 0 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
      [
        { row: -1, col: 0 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: -1 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
    ],
  },
  "pink-block": {
    rotations: [
      [
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
      ],
      [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: 0 },
        { row: 0, col: -1 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: 1 },
        { row: 0, col: -1 },
        { row: 0, col: -2 },
        { row: -1, col: 0 },
        { row: 0, col: 0 },
      ],
      [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: -2, col: 0 },
      ],
    ],
  },
  "orange-block": {
    rotations: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: -1 },
        { row: -1, col: 0 },
        { row: 0, col: -2 },
      ],
      [
        { row: 0, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: -2, col: 0 },
      ],
    ],
  },
  "lime-block": [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ],
  "white-block": {
    rotations: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: -1 },
        { row: -1, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
      ],
    ],
  },
  "light-blue-block": {
    rotations: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: -2 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: -2 },
        { row: -1, col: 0 },
        { row: -2, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: -1, col: 0 },
        { row: -2, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
    ],
  },
};

export default blockShapes;
