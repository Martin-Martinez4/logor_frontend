
export const differenceArrayAFromArrayB = (arrayA: string[], arrayB: string[]) => {

    return arrayA.filter(tag => !arrayB.includes(tag))
}

