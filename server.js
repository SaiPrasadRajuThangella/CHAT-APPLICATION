    const express = require("express")

    const app =express();
    const http = require('http');
    const { Server }  = require("socket.io") 
    const PORT = 9000;

    const server = http.createServer(app);  
    const io = new Server(server)
    // console.log(io)

    io.on("connection",(socket)=>{
        // console.log("new commection hapopped",socket.id)
        socket.on("messageSent",(data)=>{
            io.emit("messageSent",data)
        })

        socket.on("joined",(data)=>{
            io.emit("joined",data)
        })
    })
    app.use(express.static("public"))

    server.listen(PORT,()=>{
        console.log(`server has been running on http://localhost:${PORT} `)

    }) 



