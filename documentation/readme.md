# Discord.js Bot Framework
> Version `0.1.1`
> Started on `Jan 11th 2021`
> Last updated on `Jan 27th 2021`

---
## Acknowledgements

> ### Head-Developer
> - Richard Condra \[[repl.it](https://repl.it/@aRandomSomeone)\] \[[website](https://arandomsomeone.repl.co)\]



> ### Developers
> - Johan Boshoff \[[repl.it](https://repl.it/@Gnomebyte)\]
> - Evan Cavalier \[[repl.it](https://repl.it/@EvanCavalier)\]
> - Taylor Sorrells \[[repl.it](https://repl.it/@TaylorSorrells)\]



> ### Testers

---

## Foreword
> Welcome to the general purpose Discord bot framework made in [discord.js@12.5.1](https://discord.js.org/#/docs/main/12.5.1/general/welcome). As the primary author of this project and the documentation, I would like to thank you for considering using this framework for your discord bot. We have tried to make this as open-ended as we could. This is so you, as a user, can make all the actions and decisions you should need to.

---

## Updates
> ### Version `0.1.1` | First working model 
> #### Pushed to `development` branch on Jan 27th 2021
> - Added resource monitor for `express` webpage. Currently under `client/tests/client/`.
>   - Will later be moved to `client/monitor/`
>   - Will later include extended information on each monitor using an internal modal window
> - Added `enmap`
>   - `client.guildTracker`
>     - Tracks each guild's settings such as prefix, roles, messages, and logging preferences
>   - `client.userTracker`
>     - Tracks each user's internal level, xp, highest role, highest permission, and other cool stats
> - Fixed `index.js` issues
> - Removed `cache/modules.js`