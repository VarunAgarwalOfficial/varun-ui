.PHONY: check lint

check:
	npm ci
	npm run validate

lint:
	npm run format:check
	npm run check
