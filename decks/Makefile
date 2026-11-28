# One kit for every deck. Each folder with an index.html is a deck.
#   make dev            serve all decks at http://127.0.0.1:47320/
#   make pdf            every deck to pdf/<deck>.pdf (or make pdf DECK=story)
#   make check          vendor files, pins, no purple, embeds, notes, maths
#   make new NAME=x     start a deck from the starter (TEMPLATE=maths for maths)
#   make build          refresh vendor/ (reveal, KaTeX, crisptex, tokens, valley)
DECKS := $(patsubst %/index.html,%,$(wildcard */index.html))
DECK ?= $(DECKS)
TEMPLATE ?= starter

.PHONY: dev pdf check build vendor sync world new
dev:
	node scripts/serve.mjs

pdf:
	@for d in $(DECK); do node scripts/pdf.mjs $$d || exit 1; done

check:
	node scripts/check.mjs

build: vendor sync world

vendor:
	node scripts/vendor.mjs

sync:
	node scripts/sync.mjs

world:
	node scripts/world.mjs

new:
	@test -n "$(NAME)" || { echo "usage: make new NAME=week-3"; exit 1; }
	@test ! -e "$(NAME)" || { echo "$(NAME) already exists"; exit 1; }
	@test -f "$(TEMPLATE)/index.html" || { echo "no template $(TEMPLATE): use starter or maths"; exit 1; }
	cp -r "$(TEMPLATE)" "$(NAME)"
	@echo "Made $(NAME)/. Edit $(NAME)/index.html, then make dev."
