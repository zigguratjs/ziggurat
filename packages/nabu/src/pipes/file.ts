import {AsyncFactory} from '@ziqquratu/core';
import {Pipe} from '@ziqquratu/pipe';
import {File, FileAccess, GeneratorSink} from '../interfaces';
import {pipe, Transform} from '../pipes';

export function toBufferedFile<T>(): Transform<File<T>, File<Buffer>> {
  return pipe<File>(async file => {
    let res = file.content;

    if (file.content && !Buffer.isBuffer(file.content)) {
      const content = []
      for await (const chunk of file.content) {
        content.push(chunk);
      }
      res = Buffer.from(content.toString());
    }
    return {...file, content: res};
  });
}

export function toFile(path: string): Pipe<Buffer, File<Buffer>> {
  return async buffer => ({path, content: buffer, isDir: false});
}

export function toFileSystem(protocol: AsyncFactory<FileAccess>): GeneratorSink<File, void> {
  return async files => {
    const fa = await protocol.create();
    return fa.write(files);
  }
}
