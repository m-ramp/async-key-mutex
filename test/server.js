const Mutex = require("../src/index");

const key1 = "key1";
const key2 = "key2";

async function start() {
    const mutex1 = new Mutex();

    const release1 = await mutex1.acquire(key1);
    const release2 = await mutex1.acquire(key2);
    try {
        console.log("processing");
    } finally {
        let is1Locked = mutex1.isLocked(key1);
        release1(key1);
        is1Locked = mutex1.isLocked(key1);
        let is2Locked = mutex1.isLocked(key2);
        release2(key2);
        is2Locked = mutex1.isLocked(key2);
        console.log(is1Locked);
        console.log(is2Locked);
    }
}

start();
