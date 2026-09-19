---
title: "Infrastructure-Aware Optimization of Open-Weight LLM Serving for Latency and Throughput"
description: "Research on addressing the suboptimal latency and throughput in served open-weight LLMs."
pubDate: "Sep 20 2026"
heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200"
badge: "Ongoing Research"
tags: ["Research", "LLM", "Optimization"]
---

# Infrastructure-Aware Optimization of Open-Weight LLM Serving for Latency and Throughput

## 1. Background
Serving Large Language Models (LLMs) in a real-world production environment is fundamentally a systems and infrastructure problem, not just a question of whether the AI model is "smart" enough. Even highly capable open-source models often run far below their hardware's true potential.

Why does this happen? The core issue lies in how standard LLMs generate text. They use a process called autoregressive decoding, which is a strict, step-by-step process. The model cannot predict word #3 until it has completely finished generating word #2.

Because it operates one word at a time, the server faces two heavy, repetitive tasks:
- **Fetching the Rulebook (Model Weights)**: To figure out word #3, the computer must load the model's entire "brain" (billions of parameters) from its storage into its active processor. To figure out word #4, it has to load that entire brain all over again.
- **Fetching the Memory (KV Cache)**: Word #3 needs to relate to words #1 and #2. The model saves the context of past words in a running memory bank called the Key-Value (KV) cache. For every single new word, the computer must fetch this entire, constantly growing memory bank to ensure the sentence still makes sense. 

The RetNet paper perfectly illustrates this theoretical problem, motivating the need for low-cost inference because standard Transformers are fundamentally constrained by this repetitive fetching process. In short, the computer spends most of its time acting as a delivery truck, constantly hauling the giant rulebook and the entire conversation history into the processor just to write a single word.

## 2. Problem Statement
The core problem this project addresses is the suboptimal latency and throughput in served open-weight LLMs. Specifically, attempting to fix the massive hardware bottlenecks of text generation introduces complex, conflicting interactions between different software-level optimizations.
