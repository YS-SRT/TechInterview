
import { createStore, useStore as callStore, Store } from "vuex"
import { type IResultInfo, type Record } from './interface';
import { type InjectionKey } from "vue";

export const key:InjectionKey<Store<IResultInfo>> = Symbol();

export function useStore(){
    return callStore(key)
}

export default createStore<IResultInfo>({
    state:{

       history : new Array<Record>()
    },

    getters:{

        getResult:(state): Array<Record> | undefined =>{

           return state.history;
        }
    },

    mutations:{

        updateResult(state:IResultInfo, record:Record){
          state.history.push(record);
        }
    },

    actions:{

        addResult({commit, state }, record: Record){
            commit("updateResult", record);
            return state;
        }
    }
})