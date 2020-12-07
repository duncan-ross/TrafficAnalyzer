var array_length;
/* to create MAX  array */
function heapify(list, i,command) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    //left side larger
    if (left < array_length) {
        var A,B;
        //dictionary for value comparisons
        switch (command) {
            case "severity":
                A = list[left].Sev;
                B = list[max].Sev;
                break;

            case "state":
                A = list[left].State;
                B = list[max].State;
                break;

            case "visibility":
                A = list[left].Vis;
                B = list[max].Vis;
                break;

            case "temperature":
                A = list[left].Temp;
                B = list[max].Temp;
                break;

            case "date":
                A = new Date(list[left].Date);
                B = new Date(list[max].Date);
                break;

            case "weather":
                A = list[left].Weath;
                B = list[max].Weath;
                break;

            case "time":
                A = list[left].Time;
                B = list[max].Time;

                break;
        }
        if (A>B) {
            max = left;
        }
    }
    //right side larger
    if (right < array_length) {
        var A,B;
        //dictionary for value comparisons
        switch (command) {
            case "severity":
                A = list[right].Sev;
                B = list[max].Sev;
                break;

            case "state":
                A = list[right].State;
                B = list[max].State;
                break;

            case "visibility":
                A = list[right].Vis;
                B = list[max].Vis;
                break;

            case "temperature":
                A = list[right].Temp;
                B = list[max].Temp;
                break;

            case "date":
                A = new Date(list[right].Date);
                B = new Date(list[max].Date);
                break;

            case "weather":
                A = list[right].Weath;
                B = list[max].Weath;
                break;

            case "time":
                A = list[right].Time;
                B = list[max].Time;

                break;
        }
        if (A>B) {
            max = right;
        }
    }

    //one of the sides was larger
    if (max != i) {
        swap(list, i, max);
        heapify(list, max,command);
    }
}

//simple swap function
function swap(list, A, B) {
    var temp = list[A];

    list[A] = list[B];
    list[B] = temp;
}

export function heapSort(list,command) {

    array_length = list.length;

    //heapify for length/2 times to convert to heap
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heapify(list, i,command);
    }

    //pop and reheapify to sort
    for (i = list.length - 1; i > 0; i--) {
        swap(list, 0, i);
        array_length--;
        heapify(list, 0,command);
    }
}
