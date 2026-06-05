---
title: "Deep Comparing Objects in C#"
description: "A practical walkthrough of the Compare-Net-Objects NuGet package for deep equality checks in .NET."
category: tech
date: "2020-12-16"
readTime: "2 min read"
tags: [C#, .NET, NuGet]
externalUrl: "https://shivamss17-98.medium.com/deep-comparing-objects-in-c-c4ac0b77bed6"
---

Deep object comparison in C# comes up more often than you'd think audit logging, duplicate detection, change tracking. The default `==` operator won't cut it for anything beyond primitive types, and rolling your own recursive comparison is tedious and error-prone.

This was one of the first technical things I wrote about a walkthrough of the **Compare-Net-Objects** NuGet package from Kellerman Software, which uses reflection to do the heavy lifting. The key insight is setting `MaxDifferences` on the `ComparisonConfig` to capture every difference rather than stopping at the first one.

I published this on Medium in December 2020. It covers the full step-by-step implementation with code examples.

**[Read the full article on Medium](https://shivamss17-98.medium.com/deep-comparing-objects-in-c-c4ac0b77bed6)**
