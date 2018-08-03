import { Rule, chain, externalSchematic } from '@angular-devkit/schematics';
import { addToBarrel } from '../utility';
import { Schema } from './schema';

export default function(_options: Schema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'service', _options),
    addToBarrel(`export * from './${_options.name}.service';`, _options.path || '')
  ]);
}
