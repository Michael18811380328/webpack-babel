PROJECT=Michale

dist: clean transpile postdist

clean:
	@echo '--> Cleaning dist'
	rm -rf dist/*
	@echo "\033[32;36m clean dist success \033[0m"

transpile:
	@echo "--> Compile dist"
	export NODE_ENV=production && webpack
	@echo "\033[32;36m compile dist success \033[0m"

postdist:
	@echo "--> Copy css and remove settings.js"
	cp -r css dist/css
	@echo "\033[32;36m post dist success \033[0m"

.PHONY: transpile postdist clean