import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { Schema } from './schema';
import { getDefaultIndexTS } from '../utility';

export function core(options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'module', options),
    (tree: Tree, _context: SchematicContext) => {
      const parsedPath = normalize(options.path + '/' + options.name);
      
      // Creating barrel for Module
      tree.create(normalize(parsedPath + '/index.ts'), `
// Services
export * from './services';

// Models
export * from './models';

// Guards
export * from './guards';

// Interceptors
export * from './interceptors';

// Resolvers
export * from './resolvers';

// Module
export * from './${options.name}.module';
      `);

      // Creating barrel and folder for all Services
      tree.create(normalize(parsedPath + '/services/index.ts'), getDefaultIndexTS());

      // Creating barrel and folder for all Models
      tree.create(normalize(parsedPath + '/models/index.ts'), getDefaultIndexTS());
      
      // Creating barrel and folder for all Guards
      tree.create(normalize(parsedPath + '/guards/index.ts'), getDefaultIndexTS());
      
      // Creating barrel and folder for all Interceptors
      tree.create(normalize(parsedPath + '/interceptors/index.ts'), getDefaultIndexTS());
      
      // Creating barrel and folder for all Resolvers
      tree.create(normalize(parsedPath + '/resolvers/index.ts'), getDefaultIndexTS());

      return tree;
    }
  ]);
}