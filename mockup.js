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
            [{"doingmyheadin":"how to fix my broad band connection problem?"},
            {"doingmyheadin":"no dial tone or .calls for two weeks. broad band still works"},
            {"doingmyheadin":"I have had no telephone dial tone and can not receive or make calls for over two weeks. an engineer was sent to fix the problem twice and both times went to my old address (I have been in the new address over 12 months) sky told me today that i have two options the first to cancel my service and then take out a new contract so BT/open reach have my new address..I will have to have a new number & this will take up to 3wks and even tho I told them my van has my existing number pasted on the side of it not to mention my business cards, this didn't seem to make a difference to them."},
            {"doingmyheadin":"my question is this.. why cant a human person from sky communicate to a person from open reach the old fashioned way by talking to each other via telephone (providing of course they have a connection) instead of relying on the automated system that's clearly flawed to solve my issue. or are all sky employees chosen for their lack of initiative."}],

            [{"roshere":"how to increse my broadband speed?"},
            {"roshere":"This speed is always happen from 6:30 pm to midnight everyday. Usually, the testing download speed was nearly 2Mbps....Is this normal speed? Really? Now I am living with my girlfriend. Once she wants to watch Tv online, I can not use any thing on internet. I really can not put up with this low internet speed now. Can anyone help me?"},
            {"Mark39":"Which Sky Broadband product do you have? Unlimited, Lite or Connect?"},
            {"roshere":"Unlimited...SO15 area"},
            {"Mark39":"OK, that rules out the usual issues associated with Connect. Can you post your router statistics? Downstream and upstream line connection speed, line attenuation and noise margin are the figures needed. Details of how to find the stats are in the 'Please Read before Posting' message pinned to the top of the forum."},
            {"roshere":"Thanks for your reply."}],

            [{"xen-Pu":"connecting to wireless network on computer"},
            {"xen-Pu":"Connecting a device to the Wireless Network for the first time?"},
            {"julie+SH":"I have had sky broadband for years. DG834GT (white) router. 3 of our pcs are connected via cable and are fine. One of the PCs is wireless and Windows 7 - connects fine by wireless as well as cable. my work laptop (XP) connects fine. however a new HP Netbook that we have purchased just will not connect."},
            {"julie+SH":"forgot to say netbook is windows 7 starter."},
            {"xen-Pu":"It seems like yiou're using a Sky Netgear DG834GT Wireless Router, (white), and supplied with it should be a credit card size card called/labeled 'keep me handy' your user information card, that is supplied for usage with your wireless router. A Sky SSID which contains both your Sky Network Key & Password, for that Sky wireless router you use!"},
            {"dsldude":"I have changed lots of setting on netbook but it connects to friend's wireless networks no problem (both wep and wpa). I have even disable security on router as suggested on some sites but still can't connect the netbook."},
            {"dsldude":"It does sound like a compatibility issue between the router and your new pc,"},
            {"dsldude":"when you tried to reinstall the driver did you check out the what the latest driver"},
            {"dsldude":"was on the HP support site."}],

            [{"barton1277":"How do I download McAfee Internet Security Suite?"},
            {"barton1277":"i've bought a newlaptop and it won't let me download mcafee internet security suite because i think that i have reached the maximum of 3 pcs. And it says that there are no programs to download."},
            {"grfhelp":"If you have reached the 3 device limit then you wouldn't be able to add it to your new device, you would have to remove it from one of the registered devices and add it to the new one. You can contact McAfee via this link."}]
            ],

        "sky-tv": [[{"sharongall":"Hi how do i turn on my mcafee security?"},
            {"graham":"How do I locate my Sky account number?"},
            {"erine":"There may be instances where you require your Sky account number particularly in order to register for Sky's online services like Sky Go..http://helpforum.sky.com/t5/My-Account/How-do-I-locate-my-Sky-account-number/ta-p/791730"}],


            [{"dinesh":"how can i fix when sky box stucked on standby?"},
            {"richie":"@dinesh Power light on the front of the Sky box is a steady amber/red colour and does not change to green when pressing the power or Sky buttons on the remote or the power button on the box itself."},
            {"richard":"If a full power reset does not work you may also wish to try restoring the software onto the box by following the steps below:"},
            {"richard":"Power the box off at the mains power supply."},
            {"richard":"Locate the backup button on the front/top of the box."},
            {"richard":"Press and hold in the Backup button, and while doing this switch the box back on at the mains supply."},
            {"richard":"Continue to hold the Backup button after you have powered on, you should see within 60 seconds 3 more lights come on the front of the box? At this stage you can release the Backup button."},
            {"richard":"If you have 4 lights lit, it means the box is going through the forced download procedure. Leave for 15 minutes then try to see if your Issue is resolved."}],

            [{"samheck":"any one can suggest to Fix a No Satellite Signal error?"},
            {"troubleshoot":"If you're seeing the message 'No satellite signal' on your TV screen when you attempt to watch television, use our help flow to fix the problem. This provides solutions for all Sky boxes and all no satellite signal errors, whichever number is displayed on your TV screen."},
            {"troubleshoot":"Alternatively, you can also find help with your satellite signal in our No satellite signal YouTube video."}],

            [{"anime":"what is the procedure for Ordering a Sky Box Office movie or event?"},
            {"handler":"The easiest way to order Sky Box Office events is with your Sky remote. If your Sky box doesn’t have an active broadband connection, you’ll need to make sure your box is connected to a functioning phone line before ordering."},
            {"handler":"If you're a Sky Multiscreen customer, activated your viewing card after 17 December 2013 and none of your Sky boxes are connected to your home broadband network, you will need to order by phoning Sky."},
            {"nickol":"If you’re ordering an event or movie with your Sky remote on your Sky+HD box, you can choose to see a reminder when the programme starts, or record it."},
            {"jackob":"If you book an event online or by phone, a reminder won’t be added to your planner and you won’t be able to record it."},
            {"nicol":"You can also book Sky Box Office events by phoning Sky but please note that ordering by phone incurs a small administration charge."},
            {"jackob":"If you have On Demand you can rent movies instantly in the Sky Store. Movies on Sky Box Office channels start at regular intervals, but the Sky Store gives you access to a much bigger range of movies with no waiting."},
            {"jackob":"To get started with Sky Store, just press tv guide on your Sky remote. Use the arrowsbuttons to highlight Sky Store and press select to begin searching for the movie you want to rent."},
            {"anime":"what is the easiest way to do so?"},
            {"handler":"The easiest way to order Sky Box Office events is with your Sky remote. If your Sky box doesn’t have an active broadband connection, you’ll need to make sure your box is connected to a functioning phone line before ordering."},
            {"handler":"this is it"}],

            [{"buna":"How to program your Sky remote to control your TV"},
            {"merus123":"Before you get started, you’ll need to know the make and model of your TV. You’ll usually find this on the back of your TV or on the instruction manual that came with your TV set. You'll also need the version number of your Sky remote - this will be on a sticker on the inside of your battery cover."},
            {"merus124":"Once you’ve found these, look up your code online and enter the information requested, then select Get my code. Make a note of the four digit code then follow these instructions:"},
            {"merus125":"Press tv on your Sky remote, then hold down select and the red button until the red light at the top of the remote flashed twice."},
            {"thanxalways":"Enter your four digit code then press select."},
            {"thanxalways":"Still can't get your Sky remote to operate your TV?"},
            {"remunie":"how to use HDMI One-Touch-Play"},
            {"resmie":"With one touch of the sky button on your Sky remote, you’ll be able to turn on your Sky+HD box and a compatible TV directly from standby in one go and switch your TV to the correct HDMI input."},
            {"resmie":"When you press the sky, tv guide, box office, services or interactive button on your Sky remote and when your TV is on a different HDMI input such as DVD, freeview or a games console, it will switch your TV to the correct HDMI input so that you can watch Sky TV straight away."},
            {"resmie":"This feature doesn’t turn off your TV when you put your Sky+HD box into standby."},
            {"mustache":"How to use HDMI One-Touch-Play with TV?"},
            {"merus123":"The Consumer Electronics Control (CEC) capability on your TV allows HDMI devices to control each other and enables you to operate multiple devices in your home with one remote control."},
            {"merus123":"Setting up your TV varies between manufacturers. There’s no definitive list of One-Touch-Play compatible TVs however, many newer and larger TVs support this feature."},
            {"sreya":"Some TV manufacturers call this feature by different names and the setting can often be found in the TV menu under setup or settings. With others it can be found in the source selection screens. By default some TVs will have the setting OFF and you’ll need to set it to ON for it to work on your Sky+HD box."}]],


        "sky-talk":[[{"handleissue":"Heavy rain, strong winds and other issues during winter months can sometimes affect your Sky products. Getting help online is quick and easy and saves you the time and hassle of waiting on the phone."},
            {"handleissue":"Especially during the winter, bad weather can affect your satellite signal. Viewing should return to normal when the weather improves but if you still need help, watch our No satellite signal video below or check out our Fix a no satellite signal step by step guideon how to fix this problem."},
            {"ema":"how can I Cancel my subscription?"},
            {"admin":"If you’d just like to change your subscription, you may be able to do so online. Go to ourChange your Sky package article for more information."},
            {"admin":"If you’d like to cancel your Sky subscription, you’ll need to contact us."},
            {"admin":"We need to talk to you by phone or Live Chat so that we can be sure we have your correct details and begin work on your cancellation. That enables us to help you avoid any unnecessary loss of service if you’re moving to another provider."}],

            [{"richie":"how to Manage Sky bills and payments?"},
            {"handleissue":"You can view an up to date statement and 11 of your previous bills at any time on the Sky website."},
            {"handleissue":"Sign into sky.com/myaccount. If you don't have a username and password, follow theSign up link."},
            {"handleissue":"In the My Account section, go to the Bills & Payments section to see your latest bill and details of your current Sky subscriptions."},
            {"handleissue":"From the My Account section, you can also change your payment method, change your payment due date, update your paperless bill settings or make a one off payment."},
            {"dkslope":"how to View your bill on TV"},
            {"somebody":"You can also view your bill on your TV screen using our interactive billing tool. You can see a detailed breakdown of your subscription and other information about your account:"},
            {"somebody":"Press Interactive on your Sky remote control."},
            {"somebody":"From the Interactive menu, use the up/down arrows to select My Sky and press select."},
            {"somebody":"Follow the instructions on your TV screen to select View my Sky bill, entering your viewing card PIN when prompted."},
            {"iamkalam":"how toManage multiple accounts"},
            {"admin":"You can add up to nine additional users to your Sky household account so they can enjoy the same benefits and services as you."},
            {"admin":"When you're setting up an additional Sky account, it's a good idea to give each account a memorable name to help you tell them apart when using this service."}],

            [{"irish":"Do I need to tell my current provider that I'm leaving?"},
            {"seikh":"No. The Sky Switch Squad will talk to your current provider so you don't have to*, and you can even bring your phone number with you. In a small number of cases, you may need a MAC code from your current provider to bring your Broadband service over - we'll let you know if this applies to you."},
            {"seikh":"*If you're switching from Virgin Media (cable), you will need to cancel your Broadband service once your phone number has moved to Sky."},
            {"irish":"How long does it take to switch?"},
            {"seikh":"The time it takes to switch depends on your current provider."},
            {"seikh":"If you already have an active phone line in your household, the switch will take approximately two weeks from when you placed your order with us. On the day of the switch, there will be a short loss of service while the switch takes place - you should expect to have no dial tone for around five minutes, followed by 20 minutes of not being able to receive any incoming calls."},
            {"seikh":"If you are switching from Virgin Media (cable) or don't currently have an active phone line, we'll try and switch on your line remotely. If this isn't possible, we'll book an engineer appointment for a time that suits you, and remind you of the appointment closer to the date. Your wait time will depend on the availability of your engineer."},
            {"kunal":"How do I track the progress of my order?"},
            {"simi":"Once you have placed your Sky Talk order, the dedicated Sky Switch Squad will work behind the scenes to ensure your order progresses smoothly. You can track your order on our Order Tracking page. You'll need to sign in using your Sky iD username and password. If you've not used My Sky before or cannot remember your details, you can sign up or get reminders on sign in page."}],

            [{"anthony":"Can I change my installation date?"},
            {"shelter":"If we need to send an engineer to your home to install the new phone line, this will be done by an Openreach engineer on Sky's behalf. You can change your installation date up to 24 hours before your scheduled engineer visit on our Order Tracking page."},
            {"shelter":"You'll need to sign in using your Sky iD username and password. If you've not used My Sky before or cannot remember your details, you can sign up or get reminders on the sign in page."}],

            [{"stiven":"The Sky Switch Squad work behind the scenes to make sure switching from your current provider is simple and goes smoothly."},
            {"smith":" Switch Squad will talk to your current provider so you don’t have to."},
            {"smith":"About two weeks after placing the order with us, your broadband will switch from your current provider to Sky."},
            {"smith":"You will only be without broadband for a matter of minutes while the switch over to Sky takes place."},
            {"smith":"When joining from BT, Talk Talk, Plusnet, O2, Sky will handle the switch over and you don’t need to cancel with your current provider."},
            {"fork":"In the vast majority of cases, you won't need to contact your provider for a MAC (Migration Authorisation Code) as you'll already be in a Sky Network area. If you're not in the Sky Network area you will need a MAC, but don't worry - we'll tell you during the sales process if you do."},
            {"fork":"In the vast majority of cases, you won't need to contact your provider for a MAC (Migration Authorisation Code) as you'll already be in a Sky Network area. If you're not in the Sky Network area you will need a MAC, but don't worry - we'll tell you during the sales process if you do."},
            {"smith":"You can keep your phone number, re-direct your emails and bring across your email contacts*."}]],

            "create-account":[[{"raman":"how to cancel the subscription"},
            {"admin":"If you’d just like to change your subscription, you may be able to do so online. Go to ourChange your Sky package article for more information."},
            {"admin":"If you’d like to cancel your Sky subscription, you’ll need to contact us."},
            {"admin":"Start a Live Chat online. Our advisors are available 8.30am to 8pm, 7 days a week for our UK customers."},
            {"admin":"You can also write to us or send an email telling us that you'd like to cancel. We'll then call you back to verify your details and process your request. Please note, we won't be able to cancel your services unless we verify your request over the phone."},
            {"raman":"Why do we need to talk or chat to you?"},
            {"admin":"We need to talk to you by phone or Live Chat so that we can be sure we have your correct details and begin work on your cancellation."},
            {"admin":"That enables us to help you avoid any unnecessary loss of service if you’re moving to another provider."},
            {"admin":"It also means we can explain any potential issues that might come about as a result of your move, such as loss of discounts or early termination charges that could be due if you’re leaving before your minimum term contract is up."},
            {"admin":"However, we won’t need to talk to you if you’re cancelling within 31 days of your Sky services becoming active."}],

            [{"zometh":"can I Switching from Sky Broadband to another provider?"},
            {"philip":"If you're switching your broadband from Sky to another provider, you may need a MAC code from us. Find out more from our Get a MAC code to switch from Sky Broadbandarticle. It'll help you move with the minimum of fuss."},
            {"philip":"If you need a MAC or you have any questions about switching your broadband service to another provider, please contact us. Once we have received your request, we will provide you with your MAC within five working days."},
            {"semune":"A MAC is required in certain broadband switching scenarios (those listed above) and it allows you to switch broadband provider easily."}],

            [{"rosy":"How to get a MAC code to switch from Sky Broadband"},
            {"militon":"The process for switching your broadband service from Sky to another provider varies depending on a number of different factors"},
            {"henery":"s. For the majority of our broadband customers (those whose Sky Broadband and Talk services are provided on Sky’s own network, or those who are switching to Virgin Media or another provider that is on a non-BT compatible network e.g. TalkTalk), all you need to do is contact your new provider who will place an order for you."},
            {"henery":"However, in some circumstances, when none of the above applies to you, you will need to contact us and ask for a MAC (Migration Authorisation Code), which you will need to give to your new provider so that they can place their orde"},
            {"milton":"Remember, if you are transferring to Virgin Media or other provider that is on a non-BT compatible network, you will not need a MAC."},
            {"henery":"If you need a MAC or you have any questions about switching your broadband service to another provider, please contact us on 08442 410 266 or email us from your MySky account. ."},
            {"milton":"Once we have received your request, we will provide you with your MAC within five working days."},
            {"milton":"A MAC is required in certain broadband switching scenarios (those listed above) and it allows you to switch broadband provider easily. It’s used by your existing broadband provider and your new broadband provider to coordinate moving your broadband between providers with minimum disruption."},
            {"milton":"By using a MAC you should only be without internet access for between 30 minutes and two hours on the day of the switchover."},
            {"milton":"Your MAC will be 17-18 digits long and look like one of the following examples: •BBIP12345678/9AB12 •BBDS12345678/9AB12 •FTIP123456789/AB12C •LXXX1234567/AB12C"},
            {"rosy":"In exceptional, limited circumstances, we may be unable to provide you with a MAC.!"},
            {"henery":"This may be because we can’t validate your identity, your contract has already been terminated, a MAC still within its validity period has already been issued, we have already submitted a request to cease your broadband service, or we are unable to obtain a MAC for you. In the unlikely event we can’t provide you with a MAC, we will let you know why and what you need to do to transfer."},
            {"henery":"Your Sky Broadband service will end when we are notified by your new provider that your broadband service has been migrated to them, and your contract will end at the same time."},
            {"henery":"If you have not used your MAC within 30 days it will expire and you will continue to receive Sky Broadband under your contract unless you tell us otherwise."},
            {"henery":"If you are switching to another broadband provider, which can provide broadband services on your existing phone line without a MAC, your Sky Broadband service will end once we are notified by your new provider that your broadband service has been migrated to them and your contract will end at the same time"},
            {"henery":"If we do not receive any notification then you will continue to receive Sky Broadband unless you tell us otherwise."}],

            [{"natile":"How can I book my Sky Home Move?"},
            {"admin":"It's quick and easy to book your Home Move. To find out how, go to sky.com/homemove."},
            {"natile":"How much notice should I give to Sky to book my move?"},
            {"admin":"You'll need to give us at least two weeks’ notice to allow us enough time to move your services to your new address. You can book your Home Move up to 90 days in advance."},
            {"natile":"How much will it cost to book my Home Move?"},
            {"admin":"If you require a Sky engineer to install your Sky TV at your new address, there will be a up-front one-off payment required. If you need a ‘non-standard’ installation, this may cost extra."},
            {"admin":"Whether your installation is classed as standard or not is depends on how easy it is to set up your Sky TV."},
            {"natile":"Will my Sky products and services work as soon as I move into my new home?"},
            {"admin":"Your Sky TV will work as soon as the box is plugged in, switched on and connected to a Sky dish."},
            {"admin":"f you already have a Sky dish, you can choose to set up your Sky TV yourself by using the instructions on the tab above."},
            {"admin":"If not, we’ll arrange to send an engineer to your home as soon as we have one available, usually within five days of your move."},
            {"natile":"What do I need to take with me to my new home?"},
            {"admin":"Please remember to take all of your Sky equipment with you to your new property with the exception of your satellite dish and the cables running from it to your Sky box(es)."},
            {"admin":"For more information of what you need to take with you, read our article on What do to before you move."},
            {"natile":"Will I still be charged for my Sky products if my move is delayed?"},
            {"admin":"Your Sky TV service is continuous and will not be stopped when you unplug your Sky box. This means you can continue to use Sky Go throughout your Home Move journey"},
            {"admin":"Your TV billing amount will therefore not change and you will continue to be charged in the usual way."}]],


            "setup": [[{"admin":"Register your devices on Sky Go"},
            {"admin":"With Sky Go, you can watch TV on the move on up to two devices (PC, Mac, iPhone, iPad, iPod touch and/or compatible Android smartphones)."},
            {"admin":"Here's a summary of the rules applied as you attempt to download or stream Sky Go content to each of your devices:"},
            {"admin":"1st device: automatically registered for Sky Go."},
            {"admin":"2nd device: automatically registered for Sky Go."},
            {"admin":"3rd device: you need to manually remove one of the first two devices before this device can be registered."},
            {"admin":"4th device: you will not be able to register this device or any others until the start of the next calendar month."}],

            [{"selter":"Can I increase my Sky Go device limit?"},
            {"romanov":"You can double the number of devices on which you can use Sky Go by upgrading to Sky Go Extra, allowing you to download programmes to watch offline on up to four devices."},
            {"romanov":"Enjoy TV from Sky wherever you are without an internet connection"},
            {"romanov":"Sky Go Extra takes Sky Go one step further and lets you download great entertainment, movies and Box Sets depending on your Sky TV subscription, to watch truly wherever you are"},
            {"hilton":"Just download shows in the UK and Ireland via WiFi to compatible laptops, mobiles and tablets to watch later without an internet connection."},
            {"hilton":"Plus, a Sky Go Extra subscription now enables you to stream live and on demand TV from Sky with your Xbox 360, PS3 or PS4."},
            {"hilton":"You can register up to four compatible devices - all for just £5 extra a month with no annual contract."},
            {"hacker":"How do I view or change the devices registered for Sky Go?"},
            {"hilton":"If you'd like to see which devices are registered for Sky Go or make changes to your device setup, follow the steps below."},
            {"hilton":"Sign in to the Sky Go website, using your Sky iD and password."},
            {"hilton":"Select the Settings button at the top of the screen."},
            {"hilton":"Select Manage Devices button on the left of the screen."}],

            [{"mentor":"Why do I see the error 'The computer you are currently using is not registered'?"},
            {"helpdesk":"his message is displayed in the Manage Devices screen of the Sky Go website if you haven't streamed any programmes on the current device."},
            {"helpdesk":"As soon as you attempt to stream a programme, the current device will automatically be registered, as long as you haven't reached your device limit."},
            {"helpdesk":"If the error message is still displayed after your device has been registered, signing out and back in to the Sky Go website should make it go away."}],

            [{"himadri":"how to Set up my Sky Wireless Booster?"},
            {"helpdesk":"f you have an area in your home where you don’t have a wireless signal, using the Wireless Booster will boost the Wi-Fi signal and get you online in that area."},
            {"helpdesk":"The Wireless Booster works best with the routers shown in the image below."},
            {"helpdesk":"If you have a different router, we recommend you update it first as this may help you resolve your issue."},
            {"helpdesk":"You can set up your Wireless Booster in several ways. If your router has a WPS button, this is the easiest way to connect to your Wireless Booster."},
            {"helpdesk":"If not, you can connect manually using an Ethernet cable, and if you don’t have an Ethernet-compatible device, then you can connect using a wireless device."},
            {"helpdesk":"If your router has a WPS button follow these steps below. In the first instance, you’ll need to connect your Wireless Booster to your router. You’ll only need to complete this step once."},
            {"helpdesk":"It’s recommended that you set up your Wireless Booster close to where you router is located."},
            {"helpdesk":"After the connection is made, you can move your Wireless Booster to the best location in your home."},
            {"merry":"how to Set up Sky TV?"},
            {"boscos":"To get started with Sky TV on demand, follow our step by step help guide to connecting your Sky+HD box to your broadband router."}]]
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
    var grid, card, c, title;

    for (var room in roomsdata) {
        grid = new View({ type: "grid" });
        c = 0;

        grid.addHeader("Discussions");

        for (var j = 0; j < roomsdata[room].length; j++) {
            title = roomsdata[room][j][0][Object.keys(roomsdata[room][j][0])[0]];

            console.log(title.toLowerCase().replace(/[\W+]/g, "-"));

            card = new Card({
                title: title,
                id: title.toLowerCase().replace(/[\W+]/g, "-"),
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
    var $list = $(".chat-area-messages-list"),
        $chat, thread, name, text;

    for (var room in roomsdata) {
        for (var j = 0; j < roomsdata[room].length; j++) {
            thread = roomsdata[room][j][0][Object.keys(roomsdata[room][j][0])[0]];

            for (var k = 0; k < roomsdata[room][j].length; k++) {
                name = Object.keys(roomsdata[room][j][k])[0];
                text = roomsdata[room][j][k][name];

                $chat = $('<div class="chat-item">').append(
                                $('<div class="chat-item-nick">').text(name),
                                $('<div class="chat-item-message">').text(text)
                             ).attr("data-container-thread", thread.toLowerCase().replace(/[\W+]/g, "-"));

                $list.append($chat);
            }
        }
    }
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

        if (state.discussionId) {
            $("[data-container-thread]").hide();
            $("[data-container-thread=" + state.discussionId.toLowerCase().replace(/[\W+]/g, "-") + "]").show();
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
