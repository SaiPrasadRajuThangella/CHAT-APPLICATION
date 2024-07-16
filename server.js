    const express = require("express")

    const app =express();
    const http = require('http');
    const { Server }  = require("socket.io") 
    const PORT = process.env.PORT || 9000;

    const path = require("path")

    const server = http.createServer(app);  
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:9000", // Update with your frontend domain
            methods: ["GET", "POST"]
          }
    })
    // console.log(io)

    console.log(__dirname)

    io.on("connection",(socket)=>{
        // console.log("new commection hapopped",socket.id)
        socket.on("messageSent",(data)=>{
            io.emit("messageSent",data)
        })

        socket.on("joined",(data)=>{
            io.emit("joined",data)
        })
    })
    app.use(express.static(path.join(__dirname,"public")))

    server.listen(PORT,()=>{
        // console.log(`server has been running on http://localhost:${PORT} `)

    }) 



