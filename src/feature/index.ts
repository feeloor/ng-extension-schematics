import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { Schema } from './schema';
import { getDefaultIndexTS } from '../utility';

export default function(options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'module', options),
    (tree: Tree, _context: SchematicContext) => {
      const parsedPath = normalize(options.path + '/' + options.name);

      // Creating barrel for Module
      tree.create(normalize(parsedPath + '/index.ts'), `
// Components
export * from './components';

// Services
export * from './services';

// Models
export * from './models';

// Module
export * from './${options.name}.module';
      `);

      // Creating barrel and folder for all Components
      tree.create(normalize(parsedPath + '/components/index.ts'), getDefaultIndexTS());

      // Creating barrel and folder for all Services
      tree.create(normalize(parsedPath + '/services/index.ts'), getDefaultIndexTS());

      // Creating barrel and folder for all Models
      tree.create(normalize(parsedPath + '/models/index.ts'), getDefaultIndexTS());

      return tree;
    }
  ]);
}
