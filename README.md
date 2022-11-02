Tech Challenge for Frequenz - REFERENCE: KFA95ZAS4AZ482G7

## To Run

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
