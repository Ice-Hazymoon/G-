/*
 * Project: mock
 * File Created: Tuesday, 17th July 2018 10:57:18 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 7th August 2018 9:49:29 am
 */
const Mock = require("mockjs");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.disable("x-powered-by");

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/ else next();
});

app.get("/", function(req, res) {
    res.send("hello, world");
});

// router

// 获取全部文章

app.get("/posts", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            count: "@natural(2, 100)",
            likeNum: "@natural(1000, 9999)",
            "data|5": [
                {
                    id: "@natural(6)",
                    type: "article",
                    cover: "@image(200x150, @color, @word())",
                    avatar: "@image(100x100, @color)",
                    summary: "@cparagraph()",
                    date: "@datetime()",
                    path: "@datetime(yyyy/MM/dd/)@integer(1000, 9999).html",
                    url:
                        "http://127.0.0.1/@datetime(yyyy/MM/dd/)@integer(1000, 9999).html",
                    className: "@csentence(3, 5)",
                    author: "@csentence(3, 5)",
                    status: "管理员",
                    title: "@sentence(3, 5)",
                    commentsNum: "@natural(10, 99)",
                    isLike: "@boolean()",
                    like: "@natural(1, 99)",
                    "comments|0-10": [
                        {
                            id: "@natural(6)",
                            date: "@datetime()",
                            name: "@csentence(3, 5)",
                            content:
                                '@cparagraph(1, 4)<img src="@image(100x100, @color)"/>',
                            reply: "@csentence(3, 5)",
                            avatar: "@image(100x100, @color)"
                        }
                    ]
                }
            ],
            msg: "成功"
        })
    );
});

app.get("/posts/:id", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            data: {
                id: "@natural(6)",
                type: "article",
                cover: "@image(200x150, @color, @word())",
                avatar: "@image(100x100, @color)",
                summary: "@cparagraph()",
                date: "@datetime()",
                path: "@datetime(yyyy/MM/dd/)@integer(1000, 9999).html",
                url:
                    "http://127.0.0.1/@datetime(yyyy/MM/dd/)@integer(1000, 9999).html",
                className: "@csentence(3, 5)",
                author: "@csentence(3, 5)",
                status: "管理员",
                title: "@sentence(3, 5)",
                commentsNum: "@natural(10, 99)",
                like: "@natural(1, 99)",
                isLike: "@boolean()",
                "comments|0-10": [
                    {
                        id: "@natural(6)",
                        date: "@datetime()",
                        name: "@csentence(3, 5)",
                        content:
                            '@cparagraph(1, 4)<img src="@image(100x100, @color)"/>',
                        reply: "@csentence(3, 5)",
                        avatar: "@image(100x100, @color)"
                    }
                ]
            },
            msg: "成功"
        })
    );
});

app.post("/comment/:id", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            data: {
                id: "@natural(6)",
                date: "@datetime()",
                name: "@csentence(3, 5)",
                content:
                    '@cparagraph(1, 4)<img src="@image(100x100, @color)"/>',
                reply: "@csentence(3, 5)",
                avatar: "@image(100x100, @color)"
            }
        })
    );
});

app.get("/like", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            likeNum: "@natural(1000, 9999)"
        })
    );
});
app.post("/like", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            likeNum: "@natural(1000, 9999)"
        })
    );
});

app.get("/owojson", (req, res) => {
    let json = JSON.parse(fs.readFileSync("./owo.json"));
    res.json({
        code: 200,
        data: json
    });
});
app.listen(8090);
