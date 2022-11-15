var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000;

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end();
    }
}

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<div style='text-align: center; text-shadow: 0px 2px 4px red;'><p style='font-size: 32px;'>Anda Mencari : <b>" + keyword + "</b></p></div>");
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>About Me</title>
                    <link rel="stylesheet" href="./style.css">
                </head>
                <body>
                    <div class="forms">
                        <h2 style="font-size: 36px;">Maaf Web Masih Dalam Masa Pengembangan.</h2>
                        <form action="/">
                            <button type="submit">Kembali Ke Homepage</button>
                        </form>
                        </div>
                    </div>
                </body>
                </html>
            `);
            response.end();
            
            }
        else{
            fs.readFile("index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }

    
 
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("./form_login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }

    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "M. Muqtasidul Umam" && formData.password === "1121101990"){
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>About Me</title>
                        <link rel="stylesheet" href="./style.css">
                        <style>
                            p{
                                font-size: 18px;
                            }
                        </style>
                    </head>
                    <body>
                        <ul class="navi">
                            <li><a class="active" href="/">Homepage</a></li>
                            <li><a href="/login">Form Login</a></li>
                            <li><a href="/daftar">Form Pendaftaran</a></li>
                            <li style="float: right;">
                                <form action="/" method="GET"
                                style="text-align: center; margin-top: 10px; margin-right: 10px; box-shadow: 0px 0px 5px var(--black);">
                                    <input type="text" name="keyword" placeholder="Masukkan Kata Kunci..." style="border-radius: 2px 0px 0px 2px;"><span class="hover"><input type="submit" value="Search" style="border-radius: 0px 2px 2px 0px;"></span>
                                </form>
                            </li>
                        </ul>
                        <div class="forms">
                            <h2 style="font-size: 36px;">Login Berhasil</h2>
                            <p>Nama Lengkap :</p>
                            <p>Muhammad Muqtasidul Umam</p></br>
                            <p>NIM :</p>
                            <p>1121101990</p></br>
                            <p>Class :</p>
                            <p>Sp 3.2</p></br>
                            <p>Email :</p>
                            <p>ooemam@gmail.com</p></br>
                            <form action="/">
                                <button type="submit">Kembali Ke Homepage</button>
                            </form>
                            </div>
                        </div>
                    </body>
                    </html>
                `);
                response.end();
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>About Me</title>
                        <link rel="stylesheet" href="./style.css">
                    </head>
                    <body>
                        <div class="forms">
                            <h2 style="font-size: 36px;">Aduh Login Gagal!</h2>
                            <a href="/login" style="text-decoration: none;">
                                <button type="submit">Kembali Ke Login</button>
                            </a>
                            </div>
                        </div>
                    </body>
                    </html>
                `);
                response.end();
            }
        });
    }
    else if (request.url==="/daftar" && request.method === "GET"){
        fs.readFile("./form_daftar.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }

    else if (request.url==="/daftar" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<div style='padding-top: 50px; padding-bottom: 50px; padding-left: 250px; padding-right: 250px;'><div style='border-radius: 5px;text-align: center;margin-top: 15px;box-shadow: 0px 2px 10px black;padding-top: 25px;padding-bottom: 50px;text-shadow: 0px 0px 2px gray;'>")
                response.write("<h2>Pendaftaran Berhasil</h2>");
                response.write("<p>Nama Lengkap : "+formData.nama+"</p>");
                response.write("<p>Alamat : "+formData.alamat+"</p>");
                response.write("<p>No. Telepon : "+formData.telepon+"</p>");
                response.write("<p>Email : "+formData.email+"</p>");
                response.write("<p>Username : "+formData.username+"</p>");
                response.write("<p>Password : "+formData.password+"</p>");
                response.write("<a style='text-decoration: none; text-align: center; font-size: 18px;' href='/'><button style='box-shadow: 0px 1px 3px black; width: 60px; height: 24px;'>Home</button></a>");       
                response.write("</div></div>")
        });
    }
});

server.listen(port);
console.log("server Berjalan");
