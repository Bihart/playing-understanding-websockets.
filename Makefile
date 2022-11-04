live-server:
	@echo "### $(date)" > /dev/null 2> ./log/server.erro.log
	@firefox "http://localhost:8000/" &
	@~/.cargo/bin/live-server -h localhost ./client-one > /dev/null 2> ./log/server.erro.log
	@echo "Luaching Live-Server."

web-socket-server:
	@echo "### $(date)" > /dev/null 2> ./log/web-socket-server.error.log
	@poetry run ./serve.py > /dev/null 2> ./log/web-socket-server.erro.log
	@echo "Luaching web-socket-server."

dev: live-server web-socket-server

kill:
	pkill live-server || true
	pkill -n python3 || true
