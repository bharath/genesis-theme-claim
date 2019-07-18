"use strict";

const casex = require("casex");
const chalk = require("chalk");
const replace = require("replace-in-file");
const {themeRoot} = require("./configPath");

const doReplacePhp = async (conf, ignoreFile) => {
	return {
		allowEmptyPaths: true,
		ignore: [
			"vendor/**/*",
			"node_modules/**/*",
			".git/**/*",
			`${themeRoot}/vendor/**/*`,
			`${themeRoot}/node_modules/**/*`,
			`${themeRoot}/.git/**/*`,
			ignoreFile
		],
		files: [`${themeRoot}/**/*.php`],
		from: [
			new RegExp(`${casex(conf.from.Name, 'CaSe')}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g"),
			new RegExp(`(@package\\s+)${casex(conf.from.Name, 'CaSe')}`, "g"),
			new RegExp(`${casex(conf.from.Name.toLowerCase(), 'ca_se')}`, "g"),
			new RegExp(`${casex(conf.from.Name.toLowerCase(), 'ca-se')}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g"),
			new RegExp(conf.from.Name, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(conf.from.AuthorUri, "g"),
			new RegExp(conf.from.Author, "g"),
			new RegExp(`${conf.from.Name} `, "g"),
            new RegExp(`${casex(conf.from.Author.toLowerCase(), 'ca-se')}`, "g"),
            new RegExp(`\ \*\ \@since[\\ ](?:.*)[\n]`, "g")
		],
		to: [
			`${casex(conf.to.Name, 'CaSe')}`,
			`${casex(conf.to.Name, 'CaSe')}\\`,
			`@package   ${casex(conf.to.Name, 'CaSe')}`,
			`${casex(conf.to.Name.toLowerCase(), 'ca_se')}`,
			`${casex(conf.to.Name.toLowerCase(), 'ca-se')}`,
			`${casex(conf.to.Name, 'CaSe')}\\`,
			conf.to.Name,
			conf.to.Uri,
			conf.to.AuthorUri,
			conf.to.Author,
			`${conf.to.Name} `,
            `${casex(conf.to.Author.toLowerCase(), 'case')}`,
            ` @since 1.0.0\n`
		]
	};
};

const doReplaceAssets = async (conf, ignoreFile) => {
	return {
		allowEmptyPaths: true,
		ignore: [
			"vendor/**/*",
			"node_modules/**/*",
			".git/**/*",
			`${themeRoot}/vendor/**/*`,
			`${themeRoot}/node_modules/**/*`,
			`${themeRoot}/.git/**/*`,
			ignoreFile
		],
		files: [`${themeRoot}/**/*.js`, `${themeRoot}/.scripts/*.js`, `${themeRoot}/**/*.css`],
		from: [
			new RegExp(conf.from.Author, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(casex(conf.from.Name, 'CaSe'), "g"),
			new RegExp(`${casex(conf.from.Name, 'ca-se')}`, "g"),
            new RegExp(`${casex(conf.from.Author.toLowerCase(), 'ca-se')}`, "g"),
            new RegExp(`Version\:[\\ ](?:.*)[\n]`, "g")
		],
		to: [
			conf.to.Author,
			conf.to.Uri,
			casex(conf.to.Name, 'CaSe'),
			`${casex(conf.to.Name.toLowerCase(), 'ca-se')}`,
            `${casex(conf.to.Author.toLowerCase(), 'case')}`,
            `Version\:\ 1.0.0\n`
		]
	};
};

const doReplaceConfigs = async (conf) => {

	return {
		allowEmptyPaths: true,
		files: [
			`${themeRoot}/package.json`,
			`${themeRoot}/package-lock.json`,
			`${themeRoot}/composer.json`,
			`${themeRoot}/phpcs.xml.dist`,
			`${themeRoot}/phpcs.xml`,
			`${themeRoot}/.phpcs.xml.dist`,
			`${themeRoot}/.phpcs.xml`,
			`${themeRoot}/style.css`,
			`${themeRoot}/README.md`,
			`${themeRoot}/CHANGELOG.md`,
			`${themeRoot}/CONTRIBUTING.md`,
			`${themeRoot}/languages/genesis-sample.pot`
		],
		from: [
			new RegExp(`${casex(conf.from.Author, 'case')}/${casex(conf.from.Name, 'case')}`, "g"),
			new RegExp(conf.from.Description, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(conf.from.AuthorUri, "g"),
			new RegExp(conf.from.Author, "g"),
			new RegExp(`${conf.from.Name}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'ca-se')}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'ca_se')}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g"),
            new RegExp(`${casex(conf.from.Author.toLowerCase(), 'ca-se')}`, "g"),
            new RegExp(`\"version\"\:[\\ ](?:.*)[\n]`, "g")
		],
		to: [
			`${casex(conf.to.Author, 'case')}/${casex(conf.to.Name, 'case')}`,
			conf.to.Description,
			conf.to.Uri,
			conf.to.AuthorUri,
			conf.to.Author,
			`${conf.to.Name}`,
			`${casex(conf.to.Name.toLowerCase(), 'ca-se')}`,
			`${casex(conf.to.Name.toLowerCase(), 'ca_se')}`,
			`${casex(conf.to.Name, 'CaSe')}\\`,
            `${casex(conf.to.Author.toLowerCase(), 'case')}`,
            `\"version\"\: \"1.0.0\"\,\n`
		]
	};
};

module.exports = async (config, ignoreFile) => {
	const replacePhp = await doReplacePhp(config, ignoreFile);
	try {
		const changes = await replace(replacePhp);
		console.log(
			chalk.blue(`\nModified ${chalk.bold("PHP")} files:\n`),
			chalk.yellow(changes.join(",\n"))
		);
	} catch (err) {
		console.error(err);
	}

	const replaceAssets = await doReplaceAssets(config, ignoreFile);
	try {
		const changes = await replace(replaceAssets);
		console.log(
			chalk.blue(`\nModified ${chalk.bold("Style and Script")} files:\n`),
			chalk.yellow(changes.join(",\n"))
		);
	} catch (err) {
		console.error(err);
	}

	const replaceConfigs = await doReplaceConfigs(config);
	try {
		const changes = await replace(replaceConfigs);
		console.log(
			chalk.blue(`\nModified ${chalk.bold("Config")} files:\n`),
			chalk.yellow(changes.join(",\n"))
		);
	} catch (err) {
		console.error(err);
	}
};
