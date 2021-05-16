const { unSignKey } = require("./jwt.lib");

exports.getConnectionSchema = (id, SKey, source) => {
  console.log(`Source: ${source}`);
  if (source === "desktop") {
    return {
      id,
      key: SKey,
      source,
      room: SKey,
    };
  } else if (source === "Mobile") {
    console.log(`${source} Key: ${SKey.toString()}`);
    return {
      id,
      key: unSignKey(SKey).key,
      source: source,
      room: unSignKey(SKey).key,
    };
  }
};
exports.getSKey = (source, SKey) => {
  if (source === "Mobile") {
    return unSignKey(SKey).key;
  } else {
    return SKey;
  }
};
