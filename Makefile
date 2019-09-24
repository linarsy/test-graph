install:
	npm install

develop:
	npx webpack-dev-server

build:
	npm run-script build

lint:
	npx eslint .

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
