import { Schema } from "./schema";
import { chain, SchematicContext, Tree } from "@angular-devkit/schematics";
import { PathFragment, normalize } from "@angular-devkit/core";

export interface TsConfigFragment {
    compilerOptions: {
        paths: any
    }
}

export default function(options: Schema) {
    return chain([
        (tree: Tree, _context: SchematicContext) => {
            _context.logger.debug(`Adding shortcut ${options.name} to point to ${options.path}`);

            // Find tsconfig.json
            const tsConfigFile = tree.root.subfiles.find((value: PathFragment) => {
                return value === 'tsconfig.json';
            });

            // If tsconfig wasn't found
            if (!tsConfigFile) {
                _context.logger.debug(`tsconfig.json was not found.`);
                return tree;
            }

            // Get tsconfig content
            const tsConfigContent = tree.read(normalize(tree.root.path + '/' + tsConfigFile));

            // Read file json and parse to object
            const tsConfigData: TsConfigFragment =
                JSON.parse(tsConfigContent ? tsConfigContent.toString() : '');

            // tsconfig doesn't have paths
            if (!tsConfigData.compilerOptions.hasOwnProperty('paths')) {
                _context.logger.debug(`No paths object was found, initializing new...`);
                tsConfigData.compilerOptions.paths = {};
            }

            // Add new alias
            tsConfigData.compilerOptions.paths[`${options.name}/*`] = [ `${options.path}/*` ];

            // Convert data to json and write to file
            tree.overwrite(tsConfigFile, JSON.stringify(tsConfigData, null, '\t'));

            return tree;
        }
    ]);
}
