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
		files: [`${themeRoot}/**/**/*.php`],
		from: [
			new RegExp(`${casex(conf.from.Name, 'CaSe')}`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g"),
			new RegExp(`(@package\\s+)${casex(conf.from.Name, 'CaSe')}`, "g"),
			new RegExp(`\\$${casex(conf.from.Name.toLowerCase(), 'ca_se')}`, "g"),
			new RegExp(`${casex(conf.from.Name.toLowerCase(), 'ca_se')}/`, "g"),
			new RegExp(`'${casex(conf.from.Name.toLowerCase(), 'ca-se')}'`, "g"),
			new RegExp(`'${casex(conf.from.Name.toLowerCase(), 'ca-se')}-`, "g"),
			new RegExp(` ${casex(conf.from.Name.toLowerCase(), 'ca-se')}-`, "g"),
			new RegExp(`'${casex(conf.from.Name.toLowerCase(), 'ca_se')}_`, "g"),
			new RegExp(` ${casex(conf.from.Name.toLowerCase(), 'ca_se')}_`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g"),
			new RegExp(conf.from.Name, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(conf.from.AuthorUri, "g"),
			new RegExp(conf.from.Author, "g"),
			new RegExp(`${conf.from.Name} `, "g"),
            new RegExp(`${casex(conf.from.Name.toLowerCase(), 'ca-se')}`, "g")
		],
		to: [
			`${casex(conf.to.Name, 'CaSe')}`,
			`${casex(conf.to.Name, 'CaSe')}\\`,
			`@package   ${casex(conf.to.Name, 'CaSe')}`,
			`\$${casex(conf.to.Name.toLowerCase(), 'ca_se')}`,
			`${casex(conf.to.Name.toLowerCase(), 'ca_se')}/`,
			`'${casex(conf.to.Name.toLowerCase(), 'ca-se')}'`,
			`'${casex(conf.to.Name.toLowerCase(), 'ca-se')}-`,
			` ${casex(conf.to.Name.toLowerCase(), 'ca-se')}-`,
			`'${casex(conf.to.Name.toLowerCase(), 'ca_se')}_`,
			` ${casex(conf.to.Name.toLowerCase(), 'ca_se')}_`,
			`${casex(conf.to.Name, 'CaSe')}\\`,
			conf.to.Name,
			conf.to.Uri,
			conf.to.AuthorUri,
			conf.to.Author,
			`${conf.to.Name} `,
            `${casex(conf.to.Name.toLowerCase(), 'ca-se')}`
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
		files: [`${themeRoot}/**/**/**/*.js`, `${themeRoot}/**/**/**/*.css`],
		from: [
			new RegExp(conf.from.Author, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(casex(conf.from.Name, 'CaSe'), "g"),
			new RegExp(`'${casex(conf.from.Name, 'ca-se')}'`, "g")
		],
		to: [
			conf.to.Author,
			conf.to.Uri,
			casex(conf.to.Name, 'CaSe'),
			`'${casex(conf.to.Name.toLowerCase(), 'ca-se')}'`
		]
	};
};

const doReplaceConfigs = async (conf) => {

	return {
		allowEmptyPaths: true,
		files: [
			`${themeRoot}/package.json`,
			`${themeRoot}/composer.json`,
			`${themeRoot}/phpcs.xml.dist`,
			`${themeRoot}/phpcs.xml`,
			`${themeRoot}/.phpcs.xml.dist`,
			`${themeRoot}/.phpcs.xml`,
			`${themeRoot}/style.css`,
			`${themeRoot}/README.md`,
			`${themeRoot}/CHANGELOG.md`,
			`${themeRoot}/CONTRIBUTING.md`
		],
		from: [
			new RegExp(`text_domain" type="array" value="${casex(conf.from.Name, 'ca-se')}"`, "g"),
			new RegExp(`prefixes" type="array" value="${casex(conf.from.Name, 'ca_se')}"`, "g"),
			`<element name="${casex(conf.from.Name, 'ca-se')}"`,
			`<element name="${casex(conf.from.Name, 'ca_se')}"`,
			new RegExp(`${casex(conf.from.Author, 'case')}/${casex(conf.from.Name, 'case')}`, "g"),
			new RegExp(conf.from.Description, "g"),
			new RegExp(conf.from.Uri, "g"),
			new RegExp(conf.from.AuthorUri, "g"),
			new RegExp(conf.from.Author, "g"),
			new RegExp(`"${conf.from.Name}"`, "g"),
			new RegExp(`(Theme Name:\\s+)${conf.from.Name}`, "g"),
			new RegExp(`(Text Domain:\\s+)${casex(conf.from.Name.toLowerCase(), 'ca-se')}`, "g"),
			new RegExp(`"${casex(conf.from.Name, 'ca-se')}"`, "g"),
			new RegExp(`"${casex(conf.from.Name, 'ca_se')}"`, "g"),
			new RegExp(`${casex(conf.from.Name, 'CaSe')}\\\\`, "g")
		],
		to: [
			`text_domain" type="array" value="${casex(conf.to.Name, 'ca-se')}"`,
			`prefixes" type="array" value="${casex(conf.to.Name, 'ca_se')}"`,
			`<element name="${casex(conf.to.Name.toLowerCase(), 'ca-se')}"`,
			`<element name="${casex(conf.to.Name.toLowerCase(), 'ca_se')}"`,
			`${casex(conf.to.Author, 'case')}/${casex(conf.to.Name, 'case')}`,
			conf.to.Description,
			conf.to.Uri,
			conf.to.AuthorUri,
			conf.to.Author,
			`"${conf.to.Name}"`,
			`Theme Name: ${conf.to.Name}`,
			`Text Domain: ${casex(conf.to.Name.toLowerCase(), 'ca-se')}`,
			`"${casex(conf.to.Name.toLowerCase(), 'ca-se')}"`,
			`"${casex(conf.to.Name.toLowerCase(), 'ca_se')}"`,
			`${casex(conf.to.Name, 'CaSe')}\\`
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
