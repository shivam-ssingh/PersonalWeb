---
title: "QuickLink"
description: "A personal read-it-later tool that uses AI to auto-generate descriptions for saved links, so you can actually find them again."
tags: [ASP.NET Core, Angular 18, Postgres, Docker, AI APIs]
githubUrl: "https://github.com/shivam-ssingh/QuickLink"
date: "2025-04"
featured: true
---

## The problem

I read a lot. Articles, blog posts, documentation, random things that end up being useful six months later. Browser bookmarks pile up fast and the URL alone, something like `somewebsite.com/p/a3f9c2...` tells you nothing about what's actually in it.

My solution for a long time was copy the URL into the notes app and type a description myself. That works, until your notes app becomes its own unsearchable graveyard.

QuickLink is the tool I actually wanted: paste a link, get a meaningful description generated automatically, file it under a topic, and find it again later.

## What it does

- Paste any URL and QuickLink fetches the page metadata
- An AI API generates a concise, readable description of the content
- Links are organised into user-defined topics (think folders, but less rigid)

## Technical decisions

### Clean architecture on the backend

I had read about the CQRS approach in .NET for a time now and I decided, why not follow it while working on this project. The .backend is structured across four layers that are Domain, Application, Infrastructure, and the API project itself. It's a deliberate choice: keeping business logic out of controllers makes the codebase significantly easier to test and reason about as it grows.

### Docker from day one

The whole stack runs via `docker-compose`, for local development.

## What's next

- **Embedded search** — semantic search across saved links so you can query by concept rather than keyword.
- **Browser extension** — save links directly from the browser without opening the app.
- **Bulk import** — migrate existing bookmarks or notes in one go.
- **Export** - a feature that would allow users to export the links together in a PDF format.
