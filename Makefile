live-server:
	@~/.cargo/bin/live-server -h localhost ./client-one 2>&1 | \
	xargs -I {} echo -e '\033[31m [ Live-Server] {} \033[0m'

web-socket-server:
	@poetry run ./serve.py | \
	xargs -I {} echo -e '\033[32m [ Web-Socket-Server ] {} \033[0m'

dev: web-socket-server live-server

kill:
	pkill live-server || true
	pkill -n python3 || true
