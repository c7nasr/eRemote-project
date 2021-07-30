import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    request: namor.generate({ words: 1, numbers: 0 }),
    date: namor.generate({ words: 1, numbers: 0 }),
    time: Math.floor(Math.random() * 30),
    category: Math.floor(Math.random() * 100),
    retries: Math.floor(Math.random() * 100),
    type:
      statusChance > 0.66
        ? "Wrong Try"
        : statusChance > 0.33
        ? "Unlock"
        : "Lock",
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
