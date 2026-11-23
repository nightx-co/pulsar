# Contributing to Pulsar

Thanks for your interest in contributing to Pulsar.

Pulsar is a beta stage pooler engine built around PostgreSQL, PGMQ and a unified storage layer. A lot of mental effort has gone into designing it and we want it to keep growing through thoughtful contributions from people who care about how it works.

## Follow the existing code

Contributing to Pulsar means following the intent and code style already in the codebase. We plan to document the code structure in more detail in the near future. Until then, read the existing code before you write new code.

Not every part of Pulsar is perfect and we will keep improving the structure over time. In the meantime please use the tools that are already built in rather than reinventing them. In particular use the **event bus** and the **FSMs** introduced in recent changes. They make it easier for the internal system to navigate and track state changes, and they keep new code consistent with the rest of the engine.

## Where code goes

Database scripts live in the scripts directory:

- Lua scripts go in the `lua` folder.
- SQL functions and queries go in the `sql` folder.

## Keep code clean and concise

Do not overwhelm a file, and do not write everything in one place. Split logic into helper functions and helper classes.

- Aim for **150 lines or fewer** per file.
- Treat **200 lines** as the maximum we will tolerate. Past that we will ask you to split the file.
- Exceptions: a file may run longer if it fully finishes its job within that size, or if it is a utility-type class. The configuration store and the Pulsar base class are examples of files that can be a little larger.
- Core execution modules such as the tick module and other classes that play an important role in running the engine should stay concise and modular. clear, small pieces make the engine easier to understand.

## AI usage

Over 70 to 80 percent of Pulsar was written by hand. The exceptions are the SQL and Lua code, which were written with AI along with a few other parts. All of it has been reviewed multiple times.

We encourage you to write code yourself. If you use AI that is fine as long as you understand what you are submitting, you have reviewed it and you have tested that it works. Do not copy and paste AI output without reviewing and testing it.

We do not want vibe coded or agentic code throughout this repository. Pulsar was built with real mental effort, and we want it to be shaped by innovators and not by sloppy AI generated code.

By contributing you agree that your contributions will be licensed under the project's Apache License 2.0.
Thank you for helping build Pulsar.