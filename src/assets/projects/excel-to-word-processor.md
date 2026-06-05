---
title: "ExcelToWordProcessor"
description: "A self-contained Windows CLI tool that reads an Excel file and populates Word document content controls using OpenXML SDK built from a real problem at work."
tags: [C#, .NET, OpenXML SDK, CLI]
githubUrl: "https://github.com/shivam-ssingh/ExcelToWordProcessor"
date: "2024-03"
featured: false
---

## Background

At GEP, one of the core features I worked on was an OpenXML SDK-based API for generating Word documents dynamically used by 20+ clients. Working deep in that problem space, I built this CLI tool as a focused exploration of the OpenXML document model outside of a production codebase, where I could experiment freely.The idea came to me when I saw my brother who is professor, creating report cards one at a time for his students.

## What it does

Takes an Excel file as a command-line argument, reads the data, and populates the content controls of a Word document template accordingly.

```bash
WordExcel.exe C:\Users\Shivam\Documents\Setup.xlsx
```

It's self-contained, published as a single Windows executable with `--self-contained true`, so it runs without requiring a .NET runtime installed on the target machine.

```bash
dotnet publish -r win-x64 -c Release --self-contained true
```

## A bug worth documenting

The most interesting problem I hit: when text was inserted before a content control in the Word document, the OpenXML SDK would restructure the XML, the `SdtBlock` (block-level content control) would get wrapped inside a paragraph and effectively become an `SdtRun` (inline content control).

Accessing it as an `SdtBlock` directly would then fail silently or throw at runtime.

**The fix:** instead of casting directly to `SdtBlock`, access the element as `SdtElement` which is the common base class that both `SdtBlock` and `SdtRun` derive from. This handles both cases regardless of how the surrounding XML is structured.

```csharp
// Fragile breaks when SdtBlock is wrapped in a paragraph
var block = body.Descendants<SdtBlock>().FirstOrDefault();

// Robust  works regardless of nesting
var element = body.Descendants<SdtElement>().FirstOrDefault();
```

It's a small thing, but it's the kind of detail that only surfaces when you're actually working with the OpenXML object model at depth — and it's exactly the sort of thing that's useful to leave documented.
