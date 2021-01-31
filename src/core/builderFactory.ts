/* eslint-disable max-classes-per-file */
type Builder<Props, Result> = ({} extends Props
  ? {
      build: () => Result;
    }
  : {}) &
  { [P in keyof Props]-?: SetFunction<Props, P, Result> };

type SetFunction<Props, K extends keyof Props, Result> = (
  value: Exclude<Props[K], undefined>,
) => Builder<Pick<Props, Exclude<keyof Props, K>>, Result>;

type BuildFunction<Props, Result> = (props: Props) => Result;

const propsObject = Symbol('');
const buildFunction = Symbol('');
class BuilderImplement<Props, Result> {
  // 最初のnew BuilderImplement()を実行するときにBuildFunction<Props, Result>型の引数が与えられるということを表す
  constructor(bf: BuildFunction<Props, Result>) {
    return new Proxy(
      {
        [propsObject]: {},
        [buildFunction]: bf,
      },
      {
        get(target: any, prop: any, receiver: any) {
          if (prop === 'build') {
            // build関数
            return () => target[buildFunction](target[propsObject]);
          }
          // それ以外はsetter関数
          return (value: any) => {
            // eslint-disable-next-line no-param-reassign
            target[propsObject][prop] = value;
            return receiver;
          };
        },
      },
    );
  }
}

export function builderFactory<Props, Result>(
  bf: BuildFunction<Props, Result>,
): new () => Builder<Props, Result> {
  return class {
    constructor() {
      return new BuilderImplement(bf);
    }
  } as any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FooBarBuilder = builderFactory<
  {
    foo: number;
    bar: string;
  },
  string
>(({ foo, bar }) => `foo = ${foo}, bar = ${bar}`);
