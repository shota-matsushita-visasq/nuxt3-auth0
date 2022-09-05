import type { Ref } from "vue";

export type Counter = {
  hoge: string;
  num: number;
};

export const useCounter = () => {
  // stateの定義
  const counter = useState("counter", () => ({ hoge: "test", num: 0 }));

  // stateの更新処理
  const updateNum = (counter: Ref<Counter>) => (num: number) => {
    counter.value.num = num;
  };

  // computed
  const plusOne = computed(() => counter.value.num + 1);

  return {
    counter: readonly(counter),
    updateNum: updateNum(counter),
    plusOne: readonly(plusOne),
  };
};
