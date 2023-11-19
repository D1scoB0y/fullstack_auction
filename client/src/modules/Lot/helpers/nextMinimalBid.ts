const intervals = [
    [10, 1],
    [100, 5],
    [200, 10],
    [500, 20],
    [1000, 50],
    [2000, 100],
    [5000, 200],
    [10000, 400],
    [20000, 1000],
    [50000, 2500],
    [100000, 5000],
    [200000, 10000],
    [500000, 20000],
];

const nextMinimalBid = (currentBid: number): number => {
    for (const interval of intervals) {
        if (currentBid <= interval[0]) {
            return currentBid + interval[1];
        }
    }
    return currentBid + 40000;
}

export default nextMinimalBid
