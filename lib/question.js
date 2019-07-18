"use strict";

const fs = require("fs-extra");
const inquirer = require("inquirer");

const askQuestions = config => {
	let conf = require(config);
	const questions = [
		{
			type: "input",
			name: "theme_name",
			message: "Theme Name:",
			default: conf.from.Name
		},
		{
			type: "input",
			name: "theme_description",
			message: "Short theme description:",
			default: conf.from.Description
		},
		{
			type: "input",
			name: "theme_uri",
			message: "URL to the theme (must end with trailing slash \"\/\"):",
			default: conf.from.Uri
		},
		{
			type: "input",
			name: "theme_author",
			message: "Theme Author:",
			default: conf.from.Author
		},
		{
			type: "input",
			name: "theme_author_uri",
			message: "Website of theme author (must end with trailing slash \"\/\"):",
			default: conf.from.AuthorUri
		}
	];
	return inquirer.prompt(questions);
};

module.exports = async config => {
	const answers = await askQuestions(config);
	const {
		theme_name,
		theme_description,
		theme_uri,
		theme_author,
		theme_author_uri
	} = answers;

	let conf = require(config);
	const toConf = JSON.stringify(
		{
			from: {
				Name: conf.from.Name,
				Description: conf.from.Description,
				Uri: conf.from.Uri,
				Author: conf.from.Author,
				AuthorUri: conf.from.AuthorUri
			},
			to: {
				Name: theme_name,
				Description: theme_description,
				Uri: theme_uri,
				Author: theme_author,
				AuthorUri: theme_author_uri
			}
		},
		null,
		2
	);

	try {
		await fs.writeFile(config, toConf);
	} catch (err) {
		console.error(err);
	}
};
