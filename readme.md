# Genesis Theme Claim

> Rename the Genesis Sample theme with a quick cli walk-through.

[![Version][version-badge]][npm]

[version-badge]: https://img.shields.io/npm/v/theme-claim.svg?style=flat-square
[npm]: https://npmjs.com/package/genesis-theme-claim

## Install

```shell
$ npm install genesis-theme-claim --save-dev
```

## Usage

### In a terminal

```shell
$ genesis-theme-claim --help

  Usage
    $ genesis-theme-claim

  Options
    --config=<path>  Path to config [Default: ./themeclaim.json]
    --ignore=<path>  Specify an additional file or glob to ignore

  Examples
    $ genesis-theme-claim --config='/build/conf.json' --ignore='**/*.ignore'
```

### Or in a `package.json` `script`

```json
"scripts": {
	"rename": "genesis-theme-claim",
}
```

Run the `"script"`

```shell
$ npm run rename
```

By default, the config is set up for use with the [Genesis Sample Theme](https://github.com/studiopress/genesis-sample).

To rename any other theme, create a `themeclaim.json` and place it in the root of your theme with the following contents.
Change the data to match your current theme data exactly _(this is the data you're wanting to change)_.

```json
{
	"from": {
    		"Name": "Genesis Sample",
    		"Description": "This is the sample theme created for the Genesis Framework.",
    		"Namespace": "Genesis Sample",
    		"Uri": "https://demo.studiopress.com/",
    		"Author": "StudioPress",
    		"AuthorUri": "https://www.studiopress.com/"
    	}
}
```
