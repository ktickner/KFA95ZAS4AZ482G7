Tech Challenge for Frequenz - REFERENCE: KFA95ZAS4AZ482G7

- Note on commit messages

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

MUI provides a [Box Component](http://www.google.com), which is essentially a `div` which provides styling through props. \
You might notice I opt for using a styled `div` instead. There are two reasons for this. \

1. It removes noise from the markup by not including a bunch of props that can be in a style file.
2. It allows me to show how easy styling is using emotion. This can also be used to display updating styles easily if requested.

In general I would actually use a mix. Box is nice if you have a couple of positioning or sizing styles to define, but as mentioned, they can pollute the markup if using too many, in which case I would opt for a styled `div` instead.

### Pages Directory

The components in the `pages` directory aren't really pages, so much as page states. \
I decided to call it pages to illustrate a `normal` directory structure (although there are many ways to do this), and for simplicity's sake.

## Challenges

### Tendonitis

### Pagination

MUI provides a table pagination component, however it doesn't work well with the GitHub API. After spending some time exploring how I can make it work, I had to fall back to their regular pagination component. I should have done this sooner, but I would have preferred to use a more familiar pagination pattern for tabular data. \
Still, I think the results aren't bad.

## Future Improvement

### Routing

### Autocomplete Infinite Scroll / Pagination

### State Management

Adding state management such as context or redux at this scale would only serve to introduce complexity. However, in the case where we are using multiple page routes, etc. it would make sense to introduce something to handle state on an app wide level.

### Path Aliases
