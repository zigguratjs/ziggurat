import {IOGate, Pipe} from '@ziqquratu/pipe';

export const chain = (pipes: Pipe[]): Pipe => async (data: any) => {
  let res = data;
  for (const pipe of pipes) {
    res = await pipe(res);
  }
  return res;
};

export const onKey = (key: string, ...pipes: Pipe[]) => {
  const pipe = chain(pipes);
  return (async (data: any) => Object.assign(data, {[key]: await pipe(data[key])})) as Pipe
}

export const input = (...transforms: IOGate<Pipe>[]): Pipe => {
  return chain(transforms.map(t => t.input));
  //return pipe(key ? onKey(key, p) : p);
}

export const output = (...transforms: IOGate<Pipe>[]): Pipe => {
  return chain(transforms.map(t => t.output).reverse());
  //return pipe(key ? onKey(key, p) : p);
}