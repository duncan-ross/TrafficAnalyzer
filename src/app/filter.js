export function filter(criteria, filterKey, list)
{
    // inputs
    var listSize = list.length;
    var low = 0
    var high = listSize - 1
    
    // output
    var newList = []

    // if the filterKey is a range (i.e. severity, visibility, or temperature)
    if (Array.isArray(filterKey))
    {
        var min = filterKey[0]
        var max = filterKey[1]

        var firstOccurrence = first(list, low, high, min, listSize, criteria);
        var lastOccurence  = last(list, low, high, max, listSize, criteria);
    }
    //  else filterKey NOT a range
    else if (criteria == "date")
    {
        var firstOccurrence;
        var date = new Date(filterKey);
        date.setDate(date.getDate()+1);
        for (let i = 0; i < listSize; i++)
        {
          
            var checker = new Date(list[i].Date.substring(0,8));
            
            if ((date.getDate()==checker.getDate())&&(date.getMonth()==checker.getMonth()))
            {
                firstOccurrence = i;
                break;
            }
        }
        var lastOccurence = firstOccurrence;
        for (let j = firstOccurrence + 1; j < listSize; j++)
        {
            var checker = new Date(list[j].Date.substring(0,8))

            if (!((date.getDate()==checker.getDate())&&(date.getMonth()==checker.getMonth())))
            {
                lastOccurence = j;
                break;
            }
        }

    }
    else // time (day/night), state, or weather (alphabetical sort)
    {
        var firstOccurrence = first(list, low, high, filterKey, listSize, criteria)
        var lastOccurence = last(list, low, high, filterKey, listSize, criteria)
    }
    

    // Move the filtered data into a new list
    for (let i = firstOccurrence; i < lastOccurence+1; i++)
    {
        // pushback the old in-range elements into a new list
        newList.push(list[i]);
    }

    return newList;
}

// find the first occurence of a given val in an array
function first(list, low, high, min, listSize, criteria)
{
    if (high >= low)
    {
        var mid = parseInt(low + (high - low) / 2);
        if(mid==0){return 0;}
        switch (criteria)
        {
            case "severity":
                if (min == 1)
                {
                    return 0;
                }
                
                var leftSplitter = list[mid-1].Sev
                var rightSplitter = list[mid].Sev
                break;
            case "visibility":
                var leftSplitter = list[mid-1].Vis
                var rightSplitter = list[mid].Vis
                break;
            case "temperature":
                var leftSplitter = list[mid-1].Temp
                var rightSplitter = list[mid].Temp
                break;
            case "time":
                if (min == "Day")
                {
                    return 0;
                }
                var leftSplitter = list[mid-1].Time
                var rightSplitter = list[mid].Time
                break;
            case "state":
                if (min < "CA")
                {
                    return;
                }
                else if (min == "CA")
                {
                    return 0;
                } 
            var leftSplitter = list[mid-1].State
                var rightSplitter = list[mid].State
                break;
            case "weather":
                var leftSplitter = list[mid-1].Weath
                var rightSplitter = list[mid].Weath
                break;
    
            case "date":
                min = new Date(min)
                min = min.toLocaleDateString('en-US');
                var min = new Date(min)
                var leftSplitter = new Date(list[mid-1].Date)
                leftSplitter.setHours(0, 0, 0, 0)

                var rightSplitter = new Date(list[mid].Date)
                rightSplitter.setHours(0, 0, 0, 0)

                if ((mid == 0 || min >= leftSplitter) && rightSplitter == min)
                {
                    return mid;
                }
                else if (min > rightSplitter)
                {
                    return first(list, mid + 1, high, min, listSize, criteria);
                }
                else
                {
                    return first(list, low, mid-1, min, listSize, criteria);
                }
                break;
    
            default:
        }
        if ((mid == 0 || min > leftSplitter) && rightSplitter == min)
        {
            return mid;
        }
        else if (min > rightSplitter)
        {
            return first(list, mid + 1, high, min, listSize, criteria);
        }
        else
        {
            return first(list, low, mid-1, min, listSize, criteria);
        }
    }
    return -1;
}

// find the last occurence of a given val in an array
function last(list, low, high, max, listSize, criteria)
{
    if (high >= low && high!=0)
    {
        var mid = parseInt(low + (high - low) / 2);
        if(mid==0){return 0;}
        switch (criteria)
        {
            case "severity":
                var leftSplitter = list[mid-1].Sev
                var rightSplitter = list[mid].Sev
                break;
            case "visibility":
                var leftSplitter = list[mid-1].Vis
                var rightSplitter = list[mid].Vis
                break;
            case "temperature":
                var leftSplitter = list[mid-1].Temp
                var rightSplitter = list[mid].Temp
                break;
            case "time":
                var leftSplitter = list[mid-1].Time
                var rightSplitter = list[mid].Time
                break;
            case "state":
                if (max < "CA")
                {
                    return;
                }
                var leftSplitter = list[mid-1].State
                var rightSplitter = list[mid].State
                break;
            case "weather":
                var leftSplitter = list[mid-1].Weath
                var rightSplitter = list[mid].Weath
                break;
    
            case "date":
                max = new Date(max)
                max = max.toLocaleDateString('en-US');
                var max = new Date(max)


                var leftSplitter = new Date(list[mid-1].Date)
                leftSplitter = leftSplitter.toLocaleDateString('en-US');
                var leftSplitter = new Date(leftSplitter)

                var rightSplitter = new Date(list[mid].Date)
                rightSplitter = rightSplitter.toLocaleDateString('en-US');
                var rightSplitter = new Date(rightSplitter)

                break;
    
            default:
        }

        if ((mid == listSize - 1 || max < rightSplitter) && leftSplitter == max)
        {
            return mid;
        }
        else if (max < rightSplitter)
        {
            return last(list, low, mid - 1, max, listSize, criteria);
        }
        else
        {
            return last(list, mid + 1, high, max, listSize, criteria);
        }
    }
    return -1;
}

