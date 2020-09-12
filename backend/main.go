package main

import (
	"fmt"
	"github.com/ngonzalez/chat/websockets"
	"net/http"
)

func serveWs(pool *websockets.Pool, w http.ResponseWriter, r *http.Request) {
	conn, err := websockets.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	client := &websockets.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websockets.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		serveWs(pool, writer, request)
	})
}
func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
