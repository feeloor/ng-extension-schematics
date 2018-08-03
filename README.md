# @feeloor/ng-extension-schematics

An extension of default angular schematics.


# How to Install
1. Create a new angular application
2. Add **@feeloor/ng-extension-schematics** via *npm* using `npm install @feeloor/ng-extension-schematics`
3. You can now use any command. For example: `ng g feature-module my-feature --collection=@feeloor/ng-extension-schematics`
4. (Optional) To change your default schematics run `ng config cli.defaultCollection @feeloor/ng-extension-schematics`

# Available Commands

In this package use can use any of the default Angular schematics.

* **component or c**
  * Automatically exports component in parent index.ts file.
  * Example-usage: `ng g c my-component`
* **core-module or cm**
  * Have same options as a default Angular Module
  * Creates a CoreModule
  * Includes barrel-files and prepared folders for
    * Services
    * Guards
    * Models
    * Interceptors
    * Resolvers
  * Example-usage: `ng g cm core`
* **feature-module or fm**
  * Have same options as a default Angular Module (but routing is true by default)
  * Creates a Feature Module
  * Includes barrel-files and prepared folders for
    * components
    * services
    * models
  * Example-usage: `ng g fm my-feature`
* **shared-module or sm**
  * Have same options as a default Angular Module
  * Creates a SharedModule
  * Includes barrel-files and prepared folders for
    * components
    * pipes
    * directives
  * Example-usage: `ng g sm shared`
* **path-alias or pa**
  * This command generates a new path alias and adds it to your `tsconfig.json`.
  * Parameters
    * name - The name of the alias.
    * path - The path to where the alias should point.
  * Example-usage: `ng g pa @base src/app`
