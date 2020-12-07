function partition(command, list, left, right){
    // Taking the last element as the pivot
    const piv_val = list[right];
    let piv_idx = left; 

    switch (command) {
        case "severity":
            for (let i = left; i < right; i++) {
                if (list[i].Sev < piv_val.Sev) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;

        case "state":
            for (let i = left; i < right; i++) {
                if (list[i].State < piv_val.State) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;   

        case "visibility":
   
            for (let i = left; i < right; i++) {
                if (parseFloat(list[i].Vis) < parseFloat(piv_val.Vis)) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;

        case "temperature":
            for (let i = left; i < right; i++) {

                if (parseFloat(list[i].Temp) < parseFloat(piv_val.Temp)) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;

        case "date":
            for (let i = left; i < right; i++) {
                var l_date = new Date(list[i].Start_Time)
                var piv_date = new Date(piv_val.Start_Time)

                if (l_date < piv_date) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;

        case "weather":
            for (let i = left; i < right; i++) {
                if (list[i].Weath < piv_val.Weath) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;

        case "time":
            for (let i = left; i < right; i++) {
                if (list[i].Time < piv_val.Time) {
                    // Swapping elements
                    [list[i], list[piv_idx]] = [list[piv_idx], list[i]];
                    // Moving to next element
                    piv_idx++;
                }
            }
            break;
    
    }

    
    // Putting the pivot value in the middle
    [list[piv_idx], list[right]] = [list[right], list[piv_idx]] 
    return piv_idx;
};

export function quickSortIterative(list,command) {
    // Creating an listay that we'll use as a stack, using the push() and pop() functions
    let stack = [];
    
    // Adding the entire initial listay as an "unsorted sublistay"
    stack.push(0);
    stack.push(list.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted sublistays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted sublistay
    	let right = stack.pop();
        let left = stack.pop();
        
        let piv_idx = partition(command, list, left, right);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that sublistay to the stack so we can sort it later
        if (piv_idx - 1 > left){
        	stack.push(left);
            stack.push(piv_idx - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that sublistay to the stack so we can sort it later
        if (piv_idx + 1 < right){
        	stack.push(piv_idx + 1);
            stack.push(right);
        }
    }
};

/* function __main__() {

    var filepath = '/Users/Federico/JavaScript/project3/cut_down_header.json'
    var list = require(filepath)

    var command = "time";

    quickSortIterative(command, list)

    for (let i = 0; i < list.length; i++) {
        console.log(list[i].Time)
    }

}

__main__() */