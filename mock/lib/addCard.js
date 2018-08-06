/*
 * Project: mock
 * File Created: Wednesday, 18th July 2018 4:37:26 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Wednesday, 18th July 2018 6:07:16 pm
 */
const express = require("express");
const router = express.Router();
const Mock = require("mockjs");

router.get("/", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            msg: "成功",
            number: 362,
            "data|15": [
                {
                    id: "@natural(1000, 9999)",
                    name: "@word() 卡",
                    price: "@natural(1000, 9999) 元",
                    offer: "@natural(1000, 9999) 元"
                }
            ]
        })
    );
});

router.post("/", (req, res) => {
    res.json({
        code: 200,
        msg: "成功"
    });
});

router.get("/search", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            msg: "成功",
            number: 5,
            "data|5": [
                {
                    id: "@natural(1000, 9999)",
                    name: "@word() 卡",
                    price: "@natural(1000, 9999) 元",
                    offer: "@natural(1000, 9999) 元"
                }
            ]
        })
    );
});

router.post("/delete", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            msg: "成功"
        })
    );
});

router.post("/add", (req, res) => {
    res.json(
        Mock.mock({
            code: 200,
            msg: "成功"
        })
    );
});

router.get("/:id", (req, res) => {
    res.json(
        Mock.mock({
            id: "@natural(1000, 9999)",
            code: 200,
            msg: "成功",
            data: {
                title: "@word()",
                price: "@natural(1000, 9999)",
                offer: "@natural(1000, 9999)",
                remarks: "@cparagraph()",
                "content|0-5": [
                    {
                        name: "@word()",
                        number: "@natural(1000, 9999)",
                        price: "@natural(1000, 9999)"
                    }
                ],
                "gift|0-5": [
                    {
                        name: "@word()",
                        number: "@natural(1000, 9999)",
                        price: "@natural(1000, 9999)"
                    }
                ]
            }
        })
    );
});

module.exports = router;
