Tech Challenge for Frequenz - REFERENCE: KFA95ZAS4AZ482G7

## To Run

Copy the `.env.example` file and rename to `.env`. \
Fill in with your GitHub Personal Access Token (env variable `GH_PAT`). Instructions to create a key are [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

Use command `yarn start`. This will install dependencies and run the app in `localhost:3000`. \
A browser window should open automatically.

## Packages

### Create React App

Just a super simple way to get started, so I bootstrapped using this.

### Material-UI

Feature rich, themeable UI library. I chose this as I have used it in the past so I am familiar, it's fairly feature complete, and stable.
It is also built on emotion, so it is easy to extend to custom styling where appropriate.

## Other Decisions

### Box component vs styled `div`

MUI provides a [Box Component](https://mui.com/material-ui/react-box/), which is essentially a `div` which provides styling through props. \
You might notice I opt for using a styled `div` instead. There are two reasons for this. \

1. It removes noise from the markup by not including a bunch of props that can be in a style file.
2. It allows me to show how easy styling is using emotion. This can also be used to display updating styles easily if requested.

In general I would actually use a mix. Box is nice if you have a couple of positioning or sizing styles to define, but as mentioned, they can pollute the markup if using too many, in which case I would opt for a styled `div` instead.

### Pages Directory

The components in the `pages` directory aren't really pages, so much as page states. \
I decided to call it pages to illustrate a `normal` directory structure (although there are many ways to do this), and for simplicity's sake.

## Challenges

### Organization vs Organisation

U.S. English is killing me :/. Sorry if this is a bit inconsistent in places.

### The GitHub API

The GitHub API was surprisingly difficult to work with in some cases. I've learned to use the search API if you want to filter results in any way, however I could not find any parameters for issues, through their documentation, by googling, or even by experimenting myself. \
As a result, I have changed the filters to filter by star count instead, as this -is- a mechanism provided by the API. This seems really weird to me, so if you had a mechanism in mind for filtering by issue count, I would love to hear it. \

I also found that the Octokit library would eat the error responses returned by the API or the client, and throw something else which wasn't a true error. \
This was annoying for typing, but also for detecting error response types (in particular network issues). I found a property on the window called `online` which could be used to detect network problems, however stackoverflow suggests that this is unreliable, mechanically, but also due to browser support. I felt it best just to provide a generic message along with a retry mechanism.

**Special Mention: Error handling** /
Using the octokit client provides a lot of functionality out of the box. However, it appears that it swallows regular errors thrown by the API (or the client), and exposes what -it- thinks you need. This has made handling network errors in particular more difficult that it should be. Typing the errors correctly was also made impossible by this.

### Pagination

MUI provides a table pagination component, however it doesn't work well with the GitHub API. After spending some time exploring how I can make it work, I had to fall back to their regular pagination component. I should have done this sooner, but I would have preferred to use a more familiar pagination pattern for tabular data. \
Still, I think the results aren't bad.

## Future Improvements

### Routing

Currently the project is a single page with 0 routing. Ideally if this was to be used by users moving forward, there would be routes set up based on organization selected, and the filters defined.
This would allow users to use bookmarks and history to easily return to particular searches, and share searches with peers.

### Autocomplete Infinite Scroll / Pagination

Currently the Autocomplete returns 30 results, and to get further results the user will need to keep typing to further specify the name of the organization they are looking for. \
In the future I would want to implement an infinite scroll within the Autocomplete results, to load in more relevant results if the user reaches the end of the options.

### State Management

Adding state management such as context or redux at this scale would only serve to introduce complexity. However, in the case where we are using multiple page routes, etc. it would make sense to introduce something to handle state on an app wide level. \
To be honest, towards the end of this project, better state management was becoming a consideration (especially while introducing request retry mechanisms), but I still felt it was on the line regarding whether or not it made sense to implement.

### Path Aliases

It is possible to set up the project to use aliases for common paths in the project. This avoids the use of relative paths for imports. Rather than using `../../../components/*` you can instead set the project up to use `@components/*`. \
This would have been super nice to set up, but ultimately I felt it wasn't worth the time. If this was a project that I intended to maintain, it would be a priority for reasons of ease of maintanence, and speed of development.

### Form Handling

Like most things, I felt that proper form handling was not worth the time to implement for the size and lifespan of this project. It would be a very early improvement to implement proper form handling to improve maintainability over a longer period of time.
