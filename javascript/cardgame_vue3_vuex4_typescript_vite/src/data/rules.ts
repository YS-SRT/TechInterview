
import { type SortedAnalysisData } from './interface';


export function sortByPrefixAndSuffix(prefixSequence:string[], suffixSequence:string[], analysisData:SortedAnalysisData[]){

    analysisData.sort((first, second) =>{
        
         //max repeat count
         if(first.count > second.count){

            return -1;

          }else if (first.count === second.count){

            const firstPrefixIndex = prefixSequence.indexOf(first.prefix);
            const secondPrefixIndex = prefixSequence.indexOf(second.prefix);
            //prefix 
            if(firstPrefixIndex > secondPrefixIndex){
                
                return -1;

            }else if(firstPrefixIndex === secondPrefixIndex){

                const firstSuffixIndex = spliteAndCheckMaxIndex(first.suffixs, suffixSequence);
                const secondSuffixIndex = spliteAndCheckMaxIndex(second.suffixs, suffixSequence);
                
                //suffix
                if(firstSuffixIndex > secondSuffixIndex){
                    return -1;
                }
            }

         }

         return 1;


    })

}

function spliteAndCheckMaxIndex(suffixs:string, suffixSequence:string[]){
    let index = 0;
    suffixs.split('').forEach((item)=> {

        const temp = suffixSequence.indexOf(item);
        if(temp > index){

            index = temp;
        }

    })

    return index;
}