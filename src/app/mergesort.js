//merge function, takes in a left list, a right list, and a command
function merge(left, right, command) {
    let list = [];

    switch (command) { //case switcher to sort by different fields
        case "severity":
            while (left.length && right.length) {
                if (left[0].Sev < right[0].Sev) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "state":
            while (left.length && right.length) {
                if (left[0].State < right[0].State) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "visibility":
            while (left.length && right.length) {
                if (parseFloat(left[0].Vis) < parseFloat(right[0].Vis)) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "temperature":
            while (left.length && right.length) {
                if (parseFloat(left[0].Temp) < parseFloat(right[0].Temp)) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "date":
            while (left.length && right.length) {
                var l = new Date(left[0].Date)
                var r = new Date(right[0].Date)
                if (l < r) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "weather":
            while (left.length && right.length) {
                if (left[0].Weath < right[0].Weath) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;

        case "time":
            while (left.length && right.length) {
                if (left[0].Time < right[0].Time) {
                    list.push(left.shift());
                }
                else {
                    list.push(right.shift());
                }
            }
            break;
    }

    for (let i = 0; i < left.length; i++) { //merges the left array
        list.push(left[i])
    }

    for (let i = 0; i < right.length; i++) { //merges the right array
        list.push(right[i])
    }

    return list
};

//driver function for mergeSorting
export function mergeSort(list, command) {
    if (list.length <= 1) {
        return list;
    }
    const middle = Math.floor(list.length / 2); //finds the middle of the array
    const left = mergeSort(list.slice(0, middle), command); //splits into left array
    const right = mergeSort(list.slice(middle), command); //splits into right array

    return merge(left, right, command);
};
