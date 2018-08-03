import { Rule, chain, externalSchematic } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addToBarrel } from '../utility';

export default function(_options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', _options),
    addToBarrel(`export * from './${_options.name}/${_options.name}.component';`, _options.path || '')
  ]);
}
