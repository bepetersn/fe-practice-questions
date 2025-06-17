
// This is a JavaScript coding problem from BFE.dev 

// Helper Functions
////////////////////////////////////////////

const just = (x: boolean): boolean => {
  return x;
}

const add = (x: number, y: number): number => {
  return x + y;
}

const join = (a: string, b: string, c: string): string => {
   return `${a}_${b}_${c}`
}

function evaluate(statement: string) {
  let truth_value = eval(statement);
  console.log(`${statement}: ${truth_value}`)
}

////////////////////////////////////////////

type Curry = (fn: (...args: any[]) => any) => (...args: any[]) => any

const curry: Curry = (innerf: Function) => {
  const curried = (innerf: Function) => {
    const curriedOnce = (...args: any[]): Function => {
      if (args.length >= innerf.length) {  // arity satisfaction check
        return innerf(...args);
      }
      return (...rest: any[]) => curriedOnce(...args, ...rest);
    }
    return curriedOnce;
  }
  return curried(innerf);
}

////////////////////////////////////////////


let curriedAdd = curry(add);
let curriedJoin = curry(join);
let curriedJust = curry(just);

////////////////////////////////////////////

console.log("Run");

let addTo3 = curriedAdd(3);
let addTo7 = curriedAdd(7);

evaluate(`3 == ${curriedJust(3)}`);
evaluate(`8 == ${addTo3(5)}`);
evaluate(`8 == ${addTo7(1)}`);
evaluate(`8 == ${curriedAdd(3, 5)}`);

evaluate(`1_2_3 == ${curriedJoin(1, 2, 3)}`)
evaluate(`1_2_3 == ${curriedJoin(1, 2)(3)}`)
evaluate(`1_2_3 == ${curriedJoin(1)(2)(3)}`)

