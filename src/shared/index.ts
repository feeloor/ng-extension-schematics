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

// Pipes
export * from './pipes';

// Directives
export * from './directives';

// Module
export * from './${options.name}.module';
      `);

      // Creating barrel and folder for all Components
      tree.create(normalize(parsedPath + '/components/index.ts'), getDefaultIndexTS());

      // Creating barrel and folder for all Pipes
      tree.create(normalize(parsedPath + '/pipes/index.ts'), getDefaultIndexTS());

      // Creating barrel and folder for all Directives
      tree.create(normalize(parsedPath + '/directives/index.ts'), getDefaultIndexTS());

      return tree;
    }
  ]);
}
