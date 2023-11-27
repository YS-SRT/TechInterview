<template>
  <div class="md:mx-auto relative bg-white overflow-hidden border-b">
    <div class="h-12 md:ml-10 md:pr-4 md:space-x-8 flex justify-center">
      <a
        class="font-medium text-gray-500 hover:text-gray-900 flex items-center"
        ># Round {{ roundCount }}</a
      >
    </div>
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-8 mx-auto">
          <h2
            class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white"
          >
            Game Player
          </h2>

          <div
            class="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
          >
            <div class="w-full max-w-xs text-center">
              <img
                class="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="../assets/player1.jpg"
                alt="avatar"
              />

              <!-- <div class="mt-2">
                <h3
                  class="text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  Player 1
                </h3>
              </div> -->
            </div>

            <div class="w-full max-w-xs text-center">
              <img
                class="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="../assets/player2.jpg"
                alt="avatar"
              />

              <!-- <div class="mt-2">
                <h3
                  class="text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  Player 2
                </h3>
              </div> -->
            </div>

            <div class="w-full max-w-xs text-center">
              <img
                class="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="../assets/player3.jpg"
                alt="avatar"
              />

              <!-- <div class="mt-2">
                <h3
                  class="text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  Player 3
                </h3>
              </div> -->
            </div>

            <div class="w-full max-w-xs text-center">
              <img
                class="object-cover object-center w-full h-48 mx-auto rounded-lg"
                src="../assets/player4.jpg"
                alt="avatar"
              />

              <!-- <div class="mt-2">
                <h3
                  class="text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  Player 4
                </h3>
              </div> -->
            </div>
          </div>
        </div>
      </section>
      <div
        class="flex flex-wrap justify-stretch items-center rounded-lg bg-white shadow-lg"
      >
        <div class="xl:w-1/4 md:w-1/2 p-0.5">
          <div class="border border-gray-200 p-0.5 rounded-lg">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              History: Player 1
            </h2>
            <div class="flex indent-px text-ellipsis overflow-hidden text-xs" v-for="item in top15RecordInHistory(0)" :key="item.roundId">
              <p :class="item.result ? 'text-red-700' : 'text-blue-600'">
                {{ item.cards }}
              </p>
            </div>
          </div>
        </div>

        <div class="xl:w-1/4 md:w-1/2 p-0.5">
          <div class="border border-gray-200 p-0.5 rounded-lg">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              History: Player 2
            </h2>
            <div class="flex indent-px text-ellipsis overflow-hidden text-xs" v-for="item in top15RecordInHistory(1)" :key="item.roundId">
              <p :class="item.result ? 'text-red-700' : 'text-blue-600'">
                {{ item.cards }}
              </p>
            </div>
          </div>
        </div>

        <div class="xl:w-1/4 md:w-1/2 p-0.5">
          <div class="border border-gray-200 p-0.5 rounded-lg">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              History: Player 3
            </h2>
            <div class="md:flex indent-px text-ellipsis overflow-hidden text-xs" v-for="item in top15RecordInHistory(2)" :key="item.roundId">
              <p :class="item.result ? 'text-red-700' : 'text-blue-600'">
                {{ item.cards }}
              </p>
            </div>
          </div>
        </div>

        <div class="xl:w-1/4 md:w-1/2 p-0.5">
          <div class="border border-gray-200 p-0.5 rounded-lg">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              History: Player 4
            </h2>
            <div class="md:flex indent-px text-ellipsis overflow-hidden text-xs" v-for="item in top15RecordInHistory(3)" :key="item.roundId">
              <p :class="item.result ? 'text-red-700' : 'text-blue-600'">
                {{ item.cards }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-show="btnSwitch"
      @click="startRound"
      class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 rounded text-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
    >
      Start Next Round
    </button>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/data";
import { type Record, type SortedAnalysisData } from "@/data/interface";
import { sortByPrefixAndSuffix } from "@/data/rules";
import { ref } from "vue";

export default {
  setup() {
    let roundCount = ref(0);
    let btnSwitch = ref(true);

    //for showing in debug window, use number[][] will be better
    let curPlayerCards: string[][] = [[], [], [], []];  
    let analysisData: SortedAnalysisData[] = [];
    let playerRecods: Record[] = [];
    const prefixSequence = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const suffixSequence = ["@", "#", "^", "*"];
    const store = useStore();

    let cards = [
      "2@",
      "2#",
      "2^",
      "2*",
      "3@",
      "3#",
      "3^",
      "3*",
      "4@",
      "4#",
      "4^",
      "4*",
      "5@",
      "5#",
      "5^",
      "5*",
      "6@",
      "6#",
      "6^",
      "6*",
      "7@",
      "7#",
      "7^",
      "7*",
      "8@",
      "8#",
      "8^",
      "8*",
      "9@",
      "9#",
      "9^",
      "9*",
      "10@",
      "10#",
      "10^",
      "10*",
      "J@",
      "J#",
      "J^",
      "J*",
      "Q@",
      "Q#",
      "Q^",
      "Q*",
      "K@",
      "K#",
      "K^",
      "K*",
      "A@",
      "A#",
      "A^",
      "A*",
    ];

    function startRound(): void {
      if (btnSwitch.value == true) {
        btnSwitch.value = false;
        roundCount.value++;
        shuffleCards();
        dealCard();
        judgeResult();
      }
    }

    function top15RecordInHistory(playerId: number) {
      return store.state.history
        .filter(
          (item) =>
            item.roundId >= roundCount.value - 15 && item.playerId == playerId
        )
        .reverse();
    }

    //Fisher–Yates for random sequence
    function shuffleCards(): void {
      let currentIndex = cards.length;
      let randomIndex = 0;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[currentIndex], cards[randomIndex]] = [
          cards[randomIndex],
          cards[currentIndex],
        ];
      }
    }

    function dealCard(): void {
      cards.forEach((value: string, index: number) => {
        curPlayerCards[index % 4][Math.trunc(index / 4)] = value;
      });
    }

    function judgeResult() {
      //1、analyze
      curPlayerCards.forEach((val, index) => {
        findRepeatCards(index, val);
        playerRecods.push({
          roundId: roundCount.value,
          playerId: index,
          result: false,
          cards: val.join(),
        });
      });

      //2、compare & sort
      sortByPrefixAndSuffix(prefixSequence, suffixSequence, analysisData);

      //3、winner
      const winPlayerId = analysisData[0].playerId;

      //TODO: log sorted data, should remove
      analysisData.forEach((val) => {
        console.log(
          "PlayerId: " +
            val.playerId +
            " count: " +
            val.count +
            " prefix: " +
            val.prefix +
            " suffixs: " +
            val.suffixs
        );
      });

      //4、store
      playerRecods.forEach((item) => {
        if (item.playerId === winPlayerId) {
          item.result = true;
        }
        store.dispatch("addResult", item);
      });

      //5、reset for next round
      resetAndPrepareNextRound();

      //TODO: Verify Vuex Store, should remove
      // store.state.history.forEach((item) => {
      //   console.log(
      //     "RoundId: " +
      //       item.roundId +
      //       " PlayerId: " +
      //       item.playerId +
      //       " Cards: " +
      //       item.cards +
      //       " Result: " +
      //       item.result
      //   );
      // });
    }

    function findRepeatCards(playerId: number, cardArray: string[]) {
      cardArray.reduce((analysisData, cur) => {
        let prefix = cur.charAt(0);
        let suffix = cur.charAt(1);

        //10 is special
        if (cur.charCodeAt(1) >= 48 && cur.charCodeAt(1) <= 57) {
          prefix = cur.substring(0, 2);
          suffix = cur.charAt(2);
        }

        let matchedRecord = isExistedInAnalysisData(
          playerId,
          prefix,
          analysisData
        );
        if (typeof matchedRecord !== "undefined") {
          matchedRecord.count += 1;
          matchedRecord.suffixs += suffix;
        } else {
          analysisData.push({
            playerId: playerId,
            prefix: prefix,
            count: 1,
            suffixs: suffix,
          });
        }

        return analysisData;
      }, analysisData);
    }

    function isExistedInAnalysisData(
      playerId: number,
      prefix: string,
      analysisData: SortedAnalysisData[]
    ) {
      return analysisData.find(
        (data) => data.prefix === prefix && data.playerId === playerId
      );
    }
    
    //cleanup
    function resetAndPrepareNextRound() {
      playerRecods = [];
      analysisData = [];
      curPlayerCards = [[], [], [], []];
      btnSwitch.value = true;
    }

    return {
      btnSwitch,
      roundCount,
      startRound,
      top15RecordInHistory,
    };
  },
};
</script>
@/store@/store/interface@/store/rules@/data@/data/interface@/data/rules
