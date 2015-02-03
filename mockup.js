/* jshint browser: true */
/* global $ */

"use strict";

var config = require("./client-config-defaults.js"),
    core = new (require("ebus"))(config.appPriorities),
    libsb = require('./interface/interface-client')(core),
    generate = require('./lib/generate.js'),
    View = require("./mockup/view.js"),
    Card = require("./mockup/card.js"),
    Roomcard = require("./mockup/roomcard.js"),
    roomsdata = {
        "broadband": [
            [
                { doingmyheadin: "how to fix my broad band connection problem?" },
                { doingmyheadin: "no dial tone or .calls for two weeks. broad band still works" },
                { doingmyheadin: "I have had no telephone dial tone and can not receive or make calls for over two weeks. an engineer was sent to fix the problem twice and both times went to my old address (I have been in the new address over 12 months) sky told me today that i have two options the first to cancel my service and then take out a new contract so BT/open reach have my new address..I will have to have a new number & this will take up to 3wks and even tho I told them my van has my existing number pasted on the side of it not to mention my business cards, this didn't seem to make a difference to them." },
                { doingmyheadin: "my question is this.. why cant a human person from sky communicate to a person from open reach the old fashioned way by talking to each other via telephone (providing of course they have a connection) instead of relying on the automated system that's clearly flawed to solve my issue. or are all sky employees chosen for their lack of initiative." }
            ],

            [
                { roshere: "how to increse my broadband speed?" },
                { roshere: "This speed is always happen from 6:30 pm to midnight everyday. Usually, the testing download speed was nearly 2Mbps....Is this normal speed? Really? Now I am living with my girlfriend. Once she wants to watch Tv online, I can not use any thing on internet. I really can not put up with this low internet speed now. Can anyone help me?" },
                { Mark39: "Which Sky Broadband product do you have? Unlimited, Lite or Connect?" },
                { roshere: "Unlimited...SO15 area" },
                { Mark39: "OK, that rules out the usual issues associated with Connect. Can you post your router statistics? Downstream and upstream line connection speed, line attenuation and noise margin are the figures needed. Details of how to find the stats are in the 'Please Read before Posting' message pinned to the top of the forum." },
                { roshere: " Thanks for your reply." },
            ],

            [
                { "xen-Pu": "connecting to wireless network on computer" },
                { "xen-Pu": "Connecting a device to the Wireless Network for the first time?" },
                { "julieSH": "I have had sky broadband for years. DG834GT (white) router. 3 of our pcs are connected via cable and are fine. One of the PCs is wireless and Windows 7 - connects fine by wireless as well as cable. my work laptop (XP) connects fine. however a new HP Netbook that we have purchased just will not connect." },
                { "julieSH": "forgot to say netbook is windows 7 starter." },
                { "xen-Pu": "It seems like yiou're using a Sky Netgear DG834GT Wireless Router, (white), and supplied with it should be a credit card size card called/labeled 'keep me handy' your user information card, that is supplied for usage with your wireless router. A Sky SSID which contains both your Sky Network Key & Password, for that Sky wireless router you use!" },
                { dsldude: "I have changed lots of setting on netbook but it connects to friend's wireless networks no problem (both wep and wpa). I have even disable security on router as suggested on some sites but still can't connect the netbook." },
                { dsldude: "It does sound like a compatibility issue between the router and your new pc" },
                { dsldude: "when you tried to reinstall the driver did you check out the what the latest driver" },
                { dsldude: "was on the HP support site" }
            ],

            [
                { barton1277: "How do I download McAfee Internet Security Suite?" },
                { barton1277: "i've bought a newlaptop and it won't let me download mcafee internet security suite because i think that i have reached the maximum of 3 pcs. And it says that there are no programs to download." },
                { grfhelp: "If you have reached the 3 device limit then you wouldn't be able to add it to your new device, you would have to remove it from one of the registered devices and add it to the new one. You can contact McAfee via this link." },
            ]
        ]
    },

    covers = [
        "https://unsplash.imgix.net/photo-1418226970361-9f1f7227d638?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/reserve/eBJIgrh3TCeHf7unLQ5e_sailing-5.jpg?fit=crop&fm=jpg&h=800&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1415033523948-6c31d010530d?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1417962798089-0c93ceaed88a?fit=crop&fm=jpg&h=1575&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1416184008836-5486f3e2cf58?fit=crop&fm=jpg&q=75&w=1050",
        "https://ununsplash.imgix.net/reserve/unsplash_5288cc8f3571d_1.JPG?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1414924347000-9823c338079b?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1419332563740-42322047ff09?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/photo-1413913619092-816734eed3a7?fit=crop&fm=jpg&h=600&q=75&w=1050",
        "https://ununsplash.imgix.net/uploads/14132599381062b4d4ede/3b6f33f2?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/reserve/URG2BbWQQ9SAcqLuTOLp_BP7A9947.jpg?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/uploads/141319062591093cefc09/ad50c1f0?fit=crop&fm=jpg&h=725&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1416838375725-e834a83f62b7?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/uploads/1413386993023a925afb4/4e769802?fit=crop&fm=jpg&q=75&w=1050",
        "https://unsplash.imgix.net/reserve/O7A9fAvYSXC7NTdz8gLQ_IMGP1039.jpg?fit=crop&fm=jpg&h=700&q=75&w=1050"
    ],
    avatars = [
        "https://unsplash.imgix.net/reserve/URG2BbWQQ9SAcqLuTOLp_BP7A9947.jpg?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/photo-1413913619092-816734eed3a7?fit=crop&fm=jpg&h=600&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1419332563740-42322047ff09?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/uploads/141319062591093cefc09/ad50c1f0?fit=crop&fm=jpg&h=725&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1417962798089-0c93ceaed88a?fit=crop&fm=jpg&h=1575&q=75&w=1050",
        "https://ununsplash.imgix.net/reserve/eBJIgrh3TCeHf7unLQ5e_sailing-5.jpg?fit=crop&fm=jpg&h=800&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1416184008836-5486f3e2cf58?fit=crop&fm=jpg&q=75&w=1050",
        "https://ununsplash.imgix.net/uploads/14132599381062b4d4ede/3b6f33f2?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1416838375725-e834a83f62b7?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1414924347000-9823c338079b?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/uploads/1413386993023a925afb4/4e769802?fit=crop&fm=jpg&q=75&w=1050",
        "https://unsplash.imgix.net/reserve/O7A9fAvYSXC7NTdz8gLQ_IMGP1039.jpg?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://ununsplash.imgix.net/reserve/unsplash_5288cc8f3571d_1.JPG?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1418226970361-9f1f7227d638?fit=crop&fm=jpg&h=700&q=75&w=1050",
        "https://unsplash.imgix.net/photo-1415033523948-6c31d010530d?fit=crop&fm=jpg&h=700&q=75&w=1050"
    ];

function addRooms() {
    var grid = new View({ type: "grid" }),
        list = new View({ type: "list" }),
        headers = [ "My rooms", "Following", "Featured" ],
        card1, card2, c  = 0;

    grid.addHeader(headers[0]);
    list.addHeader(headers[0]);

    for (var room in roomsdata) {
        card1 = new Roomcard({
            id: room,
            color: Math.floor(Math.random() * 10),
            cover: covers[c],
            avatar: avatars[c]
        });

        c += 1;

        card2 = new Card({ id: room }, "room");

        for (var k = 0; k < 2; k++) {
            card1.addMessage({
                count: Math.round((Math.random() * 10) + 1),
                from: Object.keys(roomsdata[room][k][0])[0],
                text: roomsdata[room][k][0][Object.keys(roomsdata[room][k][0])[0]]
            });
        }

        if (Math.random() < 0.5) {
            card1.setCount("mention", Math.round(Math.random() * 100)).setCount("message", Math.round(Math.random() * 100));
            card2.setCount("mention", Math.round(Math.random() * 100));
        }

        grid.addItem(card1.element);
        list.addItem(card2.element);
    }

    grid.element.appendTo(".main-content-rooms");
    list.element.appendTo(".room-list");
}

function addDiscussions() {
    var grid, card, c;

    for (var room in roomsdata) {
        grid = new View({ type: "grid" });
        c = 0;

        grid.addHeader("Discussions");

        for (var j = 0; j < roomsdata[room].length; j++) {
            card = new Card({
                title: roomsdata[room][j][0][Object.keys(roomsdata[room][j][0])[0]],
                id: generate.names(Math.floor(Math.random() * 7) + 3),
                color: c
            }, "discussion");

            c = (c < 9) ? (c + 1) : 0;

            for (var k = 0; k < roomsdata[room][j].length; k++) {
                card.addMessage({
                    from: Object.keys(roomsdata[room][j][k])[0],
                    text: roomsdata[room][j][k][Object.keys(roomsdata[room][j][k])[0]]
                });
            }

            card.setCount("mention", Math.round(Math.random() * 100));

            card.element.append($('<div class="card-quick-reply js-quick-reply">').append(
                                    $('<div class="card-quick-reply-content">').append(
                                        $('<div class="card-button card-button-reply">Quick reply</div>'),
                                        $('<input type="text" class="card-entry card-entry-reply js-quick-reply-entry">')
                                )));

            grid.addItem(card.element);
        }

        grid.element.attr("data-container-room", room);
        grid.element.appendTo(".main-content-discussions");
    }
}

function addPeople() {
    var list, name, people = {},
        getPerson = function(name) {
            return $('<div class="people-list-item">').append(
                            $('<img class="people-list-item-avatar">').attr("src", "https://secure.gravatar.com/avatar/" + (generate.names(Math.floor(Math.random() * 30) + 3)) + "?d=identicon&s=48"),
                            $('<span class="people-list-item-nick">').text(name)
                         );
        };

    for (var room in roomsdata) {
        list = new View({ type: "list" });

        list.addHeader("Online");

        people[room] = [];

        for (var j = 0; j < roomsdata[room].length; j++) {
            for (var k = 0; k < roomsdata[room][j].length; k++) {
                name = Object.keys(roomsdata[room][j][k])[0];

                if (people[room].indexOf(name) === -1) {
                    people[room].push(name);
                }
            }
        }

        for (var x = 0; x < people[room].length; x++) {
            list.addItem(getPerson(people[room][x]));
        }

        list.addHeader("Offline");

        for (var l = 0; l < 3; l++) {
            list.addItem(getPerson(generate.names(Math.floor(Math.random() * 7) + 3)));
        }

        list.element.attr("data-container-room", room);
        list.element.appendTo(".people-list");
    }
}

function addChat() {
    var $list = $(".chat-area-messages-list");

    setInterval(function() {
        setTimeout(function() {
            var $chat = $('<div class="chat-item">').append(
                            $('<div class="chat-item-nick">').text(generate.names(Math.floor(Math.random() * 7) + 3)),
                            $('<div class="chat-item-message">').text(generate.sentence(Math.floor(Math.random() * 17) + 3))
                         );

            $list.append($chat);

            $chat.get(0).scrollIntoView(true);
        }, 1000 * Math.random());
    }, 1000);
}

$(function() {
    var keys = [ "view", "mode", "color" ],
        oldState = {}, currentState = {},
        $title = $(".js-appbar-title"),
        $discussion = $(".js-discussion-title");

    // Listen to navigate and add class names
    libsb.on("navigate", function(state, next) {
        var classList;

        oldState = $.extend({}, currentState);

        for (var s in state) {
            if (state[s] !== null) {
                currentState[s] = state[s];
            } else {
                delete currentState[s];
            }
        }

        classList = $("body").attr("class") || "";

        for (var i = 0, l = keys.length; i < l; i++) {
            if (currentState[keys[i]] !== oldState[keys[i]]) {
                classList = classList.replace(new RegExp("\\b" + keys[i] + "-" + "\\S+", "g"), "");

                if (keys[i] in currentState) {
                    classList += " " + keys[i] + "-" + (currentState[keys[i]] || "");
                }
            }
        }

        classList = classList.replace(/^\s+|\s+$/g, "");

        $("body").attr("class", classList);

        next();
    }, 1000);

    libsb.on("navigate", function(state, next) {
        var classList = $("body").attr("class").trim() || "";

        classList = classList.replace(/\bcolor-\S+/g, "");

        if (state && oldState && state.mode !== oldState.mode) {
            switch (state.mode) {
            case "room":
                $title.text(state.roomName);
                break;
            case "chat":
                classList += " color-" + state.color;
                $title.text(state.roomName);
                $discussion.text(state.discussionId);
                break;
            case "home":
                $title.text("My feed");
                break;
            }
        }

        if (state.roomName) {
            $("[data-container-room]").hide();
            $("[data-container-room=" + state.roomName + "]").show();
        }

        $("body").attr("class", classList);

        next();
    }, 500);

    // Send initial navigate
    libsb.emit("navigate", { mode: "home" });

    // Generate room names
    addRooms();
    addDiscussions();
    addPeople();
    addChat();

    $(".js-sidebar-left-open").on("click", function() {
        libsb.emit("navigate", { view: "sidebar-left" });
    });

    $(".js-sidebar-right-open").on("click", function() {
        libsb.emit("navigate", { view: "sidebar-right" });
    });

    $(".js-sidebar-close").on("click", function() {
        libsb.emit("navigate", { view: null });
    });

    $(".js-goto-room").on("click", function() {
        libsb.emit("navigate", {
            mode: "room",
            view: null
        });
    });

    $(".js-goto-home").on("click", function() {
        libsb.emit("navigate", {
            mode: "home",
            view: null
        });
    });

    $(".js-follow-room").on("click", function() {
        $("body").toggleClass("role-follower");
    });

    $(document).on("click", ".js-room-card", function(e) {
        if ($(e.target).closest(".js-room-more").length) {
            return;
        }

        libsb.emit("navigate", {
            mode: "room",
            roomName: $(this).attr("data-room"),
            view: null
        });
    });

    $(document).on("click", ".js-discussion-card", function(e) {
        var $target = $(e.target),
            $quickreply;

        if ($target.closest(".js-discussion-more").length) {
            return;
        }

        $quickreply = $target.closest(".js-quick-reply");

        if ($quickreply.length) {
            $quickreply.addClass("active");

            setTimeout(function() {
                $quickreply.find(".js-quick-reply-entry").focus();
            }, 200);

            return;
        }

        libsb.emit("navigate", {
            mode: "chat",
            discussionId: $(this).attr("data-discussion"),
            color: $(this).attr("data-color"),
            view: null
        });
    });

    $(document).on("blur", ".js-quick-reply-entry", function() {
        $(this).closest(".js-quick-reply").removeClass("active");
    });
});
