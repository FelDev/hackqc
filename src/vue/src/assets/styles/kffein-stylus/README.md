# KFFEIN Stylus

> Some KFFEIN Magic for Stylus [Stylus](http://learnboost.github.io/stylus/)


* * *

## Installation

```bash
$ yarn add --dev kffein-stylus
```

Then in your webpack:
```
export default {
  ...
  plugins: [
    ...
    new LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [
            rupture(),
            koutoSwiss(),
          ],
          import: [
            join(__dirname, '..', 'node_modules/kffein-stylus/lib/vars/index'),
            'HERE STYLUS FILE FOR OVERRIDING KFF VARS'
            join(__dirname, '..', 'node_modules/kffein-stylus/index'),
          ],
          preferPathResolver: 'webpack',
        },
      },
    }),
  ],
};
```

@todo: find a way to use $kff-vars that could be easily overidden


* * *

## Dev

1. Clone repo
```
git clone git@bitbucket.org:kffein/stylus-mixin.git
```

2. Npm link
```
npm link
```

3. Go to your test project and npm link kffein-stylus
```
npm link kffein-stylus
```

4. Publish package when it's ok
```
git remote add fury https://agence-kffein@git.fury.io/agence-kffein/kffein-stylus.git
git push fury
```