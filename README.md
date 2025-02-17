# Overview

This project displays financial transactions individually in the first table and grouped by type and currency in the
second.  
It was initiated with a **React + Vite + TypeScript** starter and also uses the **React Query** framework along with *
*TailwindCSS** and a table component from the **ShadCN** library.

## Base Assumptions

In order to quickly bootstrap this lightweight application, I chose to use **React** with **React Query**.

- I assumed that the user would be accessing the site on a **computer screen**.
- I treated the statuses provided by the endpoints as **exhaustive** and used them in **enumerations**.
- However, I made the currencies returned by the various endpoints **dynamic** to allow for adaptability to new objects.

Additionally, I isolated the logic of the two tables so they can be used independently in different contexts in the
future.

## Possible Pitfalls

The main risk, in my opinion, comes from the API that sends transactions. If the volume of returned data becomes too
large, it could lead to **performance issues** and impact **data rendering**.

To mitigate this:

- Implementing **pagination** with **virtual scrolling** could help manage large datasets display efficiently.
- Alternatively, handling some of the processing **on the server side** could reduce the load on the client.

Moreover, the current layout is **not responsive**. Supporting various **screen sizes** would be essential to ensure the
application functions properly across different devices.

## Getting Started

### Prerequisites

- Node.js (tested with v23.1.0)
- pnpm (tested with v10.2.1)
- Mock data server provided at : https://github.com/SwissBorg/web-challenge

### Installation & Usage

```sh
pnpm install  # Install dependencies  
pnpm run dev    # Start the server
