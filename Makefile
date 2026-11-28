.PHONY: check build test lint dev

# Everything CI runs: a clean install, then npm run validate.
check:
	npm ci
	npm run validate

build:
	npm run build

# The shell's unit tests and its types.
test:
	npm run test:shell

lint:
	npm run format:check
	npm run lint:shell
	npm run check

dev:
	npm run dev
