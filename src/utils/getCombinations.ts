
// generate an array of numbered item types (ex: "A" + "1") 
export const getNumberedItems = (nums: number[], types: string[]) => {
    const res = [];
    for(let i = 0; i < nums.length; ++i) {
        for(let j = 1; j <= nums[i]; ++j) {
            res.push(`${types[i]}${j}`);
        }
    }
    return res;
};


export const getCombinations = async (nums: number[], types: string[], pathLen: number): Promise<string[][]> => {

    // get the items based on the numbers from the request
    const items = getNumberedItems(nums, types);

    const res: string[][] = [];

    const backtrack = async (start: number, path: string[], used: Set<string>): Promise<void> => {
        // when current combination reaches the required length add it to the result 
        if(path.length === pathLen) {
            res.push(path); // new modified copy of the 'path' array
            return;
        }

        for(let i = start; i < items.length; i++) {
            // get the letter
            const prefix = items[i][0];
            // if the letter is not used yet, recurse using the next item
            if (!used.has(prefix)) {
                // use the next item as 'start'
                // push current item to a new COPY of the 'path' array
                // add current letter to a new 'used' set
                await backtrack(i + 1, [...path, items[i]], new Set([...used, prefix])); 
                // no need to step back in 'path' and 'used', since they are not modified and not used in backtrack()
            }
        }
    };

    // initialize backtracking
    await backtrack(0, [], new Set());

    return res;
};
