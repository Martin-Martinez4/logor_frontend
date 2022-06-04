
export const differenceArrayAFromArrayB = (arrayA, arrayB) => {

    return arrayA.filter(tag => !arrayB.includes(tag))
}

