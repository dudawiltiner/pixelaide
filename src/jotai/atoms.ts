import { SpotlightActionData } from "@mantine/spotlight";
import { atom } from "jotai";

export const selectedModelsAtom = atom<string[]>([
  "gemini-1.5-pro",
  "gemini-1.5-flash",
]);

export const promptBaseAtom = atom<string>("");

export const spotlightActionsAtom = atom<SpotlightActionData[]>([]);
export const templateAtom = atom<string>();
export const templateOptionsAtom = atom<
  { title: string; description: string }[]
>([
  {
    title: "Create a React Component",
    description: `Hi, Pixel! 😊 
I want to create a React component, but I don't know where to start. 
Here's what I've tried so far:
  
\`\`\`jsx
// Add your code here
\`\`\`
  
Can you help me improve or correct this?  Could you also give me some best practices to follow?  What should I consider for styling?  Thanks!`,
  },
  {
    title: "Integrate a REST API",
    description: `Hi, Pixel! 👋
I need to integrate a REST API into my project, but I'm having some trouble. 
Here's the code I've written:

\`\`\`javascript
// Add your code here
\`\`\`

Could you help me adjust it or point out what's missing?  What are the best methods for fetching data (e.g., fetch, Axios, etc.)?  How should I handle errors and loading states? 🙏`,
  },
  {
    title: "Style a Component with CSS Modules",
    description: `Hi, Pixel! How's it going? 😄
I'm styling a component with CSS Modules, but the styles aren't being applied correctly. 
This is my component code:

\`\`\`jsx
// Add your component here
\`\`\`

And here are the styles:

\`\`\`css
/* Add your CSS here */
\`\`\`

Can you check if I'm doing something wrong? Are there any common pitfalls with CSS Modules I should be aware of?  Are there alternative styling solutions you recommend?`,
  },
  {
    title: "Debug a Console Error",
    description: `Hi, Pixel! 🛠️
I'm trying to resolve an error that appeared in the browser console. Here's the code that seems to be related:

\`\`\`javascript
// Add your code here
\`\`\`

And this is the error that appears:

\`\`\`
[Insert the error here]
\`\`\`

Can you help me understand what's happening and how to fix it?  Are there any debugging tools or techniques you recommend?`,
  },
  {
    title: "Add Validation to a Form",
    description: `Hi, Pixel! ✨
I'm working on a form and would like to add validation to it. 
Here's the basic form I've created:

\`\`\`html
<!-- Add your form here -->
\`\`\`

And this is the JavaScript code I've used so far:

\`\`\`javascript
// Add your validation code here
\`\`\`

Can you suggest an approach to improve the validations?  Should I use built-in HTML validation attributes, a JavaScript library, or a custom solution?  How can I provide helpful error messages to the user?`,
  },
  {
    title: "Refactor a Code Snippet",
    description: `Hi, Pixel! 👩‍💻
I need to refactor this code snippet to make it more readable and efficient. Here's the current code:

\`\`\`javascript
// Add your code here
\`\`\`

What would you suggest to improve this code?  Are there any performance considerations I should be aware of?  What best practices should I follow for clean and maintainable code? Thanks! 😊`,
  },
]);
