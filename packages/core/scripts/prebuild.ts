import fs from 'fs';
import path from 'path';

import { federation } from '../webpack'

const remotes = Object.keys(federation.remotes);

remotes
  .map((remote) => (
    path.resolve(__dirname, `../../remotes/${remote}/build/types`)
  ))
  .forEach((source, index) => {
    fs.cpSync(
      source,
      path.resolve(__dirname, `../../../types/${remotes[index]}`),
      { recursive: true }
    )

    fs.cpSync(
      source,
      path.resolve(__dirname, `../../../node_modules/@types/${remotes[index]}`),
      { recursive: true }
    )
  });