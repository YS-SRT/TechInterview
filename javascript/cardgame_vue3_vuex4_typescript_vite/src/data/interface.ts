
export type Record = {
    roundId:number,
    playerId:number,
    cards:string,
    result:boolean  //result(win = 1 / lost = 0)
}

export interface IResultInfo {

    history: Record [] 
}

export type SortedAnalysisData = {
   playerId:number
   prefix:string,
   count:number,
   suffixs:string
}


