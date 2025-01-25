//
// const path = require('path');
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --src ./ --files examples,REAEME.md

// my.writeFlag
// my.quietFlag
// my.a_src

export function init(my) {
  //
  my.root_path = join(__dirname, '..');
  my.buildnum_files = ['../README.md', './README.md', './demo/', './lib/', './qrcode/'];
  my.buildnum_path = 'gen/build_ver.txt';
  my.a_src = 'src';
  my.incrementFlag = 0;
  my.writeFlag = 0;

  for (let index = 0; index < process.argv.length; index++) {
    // console.log(index, process.argv[index]);
    let val = process.argv[index];
    if (val == '--root') {
      index++;
      my.root_path = process.argv[index];
    } else if (val == '--prod') {
      my.writeFlag = 1;
      my.incrementFlag = 1;
    } else if (val == '--dev') {
      my.writeFlag = 1;
      my.incrementFlag = 0;
    } else if (val == '--quiet') {
      my.quietFlag = 1;
    } else if (val == '--src') {
      index++;
      my.a_src = process.argv[index];
    } else if (val == '--files') {
      index++;
      my.a_files = process.argv[index];
    } else if (!val.startsWith('/')) {
      console.log('Unknown option', val);
    }
  }

  my.src_path = join(my.root_path, my.a_src);

  if (my.a_files) {
    my.buildnum_files = my.a_files.split(',').map((item) => {
      if (!item.startsWith('./')) {
        item = './' + item;
      }
      return item;
    });
    // console.log('buildnum_files', my.buildnum_files);
  }
}
