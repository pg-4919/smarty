Smarty was originally written as a Discord bot to annoy my friends. Eventually I added enough utilities onto it that it became really quite crucial to the server's daily functions. However, as we have all grown up and began touching grass, there has been no need of Smarty for some time, so I've decided to stop maintaining him and let him die peacefully. He remains one of my greatest achievements in programming.

## Features ##
Smarty's biggest purpose was to control a dedicated announcement channel. To keep things looking clean, it would purge all messages that weren't announcements (indicated by a mention of @everyone or @here). Most impressively, it would clone the message to the chat channel to allow everyone to discuss and reply to the announcement.

Smarty's cloning behavior was by far the most impressive and singularly most complicated part of its programming. It would read in the user's avatar and username, dynamically update the first free webhook to that information, and send the message, along with attachments, using that webhook, creating a perfect clone of the user. In addition, to handle and display messages that were replies to other messages, it could use specially designed emojis in another server. It would also include a button or link to jump to the original message. To my knowledge, this was the most advanced cloning utility of any Discord bot at the time.

Smarty also handled a pin channel to get around Discord's native pin limits. Using the same cloning behavior, it would listen for the pin emoji reaction event and clone any messages to the dedicated channel.

Smarty was also able to handle role customization, which was an immense headache necessitating the creation of several "milestone" roles which Smarty could use as a basis for measurement. It was able to rename and recolor roles, as well as grant and revoke admin permissions.

Smarty could also annoy people ...

<img width="277" height="322" alt="image" src="https://github.com/user-attachments/assets/6878a671-bf74-48e1-b4ed-5945cca82ceb" />

Or strike them down with unlimited power ...

<img width="401" height="336" alt="image" src="https://github.com/user-attachments/assets/1a4b1ae8-124d-4ca8-a9bc-719145f8b314" />

_That last one is meant to be a GIF of the user's avatar getting blown up by lightning, but it doesn't really show well on Github._

## Architecture ##
Smarty's architecture remains one of the cleanest I have ever designed. Designed in a modular fashion, it makes use of NodeJS's require system to split functionality into several dedicated files.

## Config ##
```
{
    "token": "<token>",
    "guild": "<guild>",
    "channels": {
        "news": "<news>",
        "chat": "<chat>",
        "starred": "<starred>"
    },
    "admins": [
        "<admin1>",
        "<admin2>",
        .
        .
        .
    ],
    "emojis": {
        "curved": "<curved>",
        "straight": "<straight>"
    }
}
```
The bot must be added to an auxiliary server in which the curved and straight emojis are present in order to use replies while cloning
