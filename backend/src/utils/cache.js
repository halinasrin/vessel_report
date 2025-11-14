// cache utility: uses Redis if REDIS_URL present else in-memory Map with TTL
const dotenv = require("dotenv");
dotenv.config();
const redisUrl = process.env.REDIS_URL || "";
let client = null;

if (redisUrl) {
  const { createClient } = require("redis");
  client = createClient({ url: redisUrl });
  client.connect().catch(console.error);
}

const memCache = new Map(); // key -> {value, expiresAt}

const set = async (key, value, ttlSeconds = 300) => {
  if (client) {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } else {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    memCache.set(key, { value, expiresAt });
  }
};

const get = async (key) => {
  if (client) {
    const raw = await client.get(key);
    return raw ? JSON.parse(raw) : null;
  } else {
    const item = memCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      memCache.delete(key);
      return null;
    }
    return item.value;
  }
};

module.exports = { set, get };
