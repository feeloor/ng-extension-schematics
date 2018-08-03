import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";

export function addToBarrel(content: string, dir: string) {
    return (tree: Tree, _context: SchematicContext) => {
        const indexPath = normalize(dir + '/index.ts');
        const file = tree.read(indexPath);
        const parsedContent = file && file.toString() === '' ? content : `\n${content}`;

        if (file) {
            tree.overwrite(indexPath, file + parsedContent);
        }

        return tree;
    }
}

export function getDefaultIndexTS(): string {
    return 'export {};';
}