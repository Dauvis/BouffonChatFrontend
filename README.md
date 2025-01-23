# Bouffon Chat Frontend
The motivation behind this learning project is two-fold. The first reason is to learn the fundamentals of JavaScript, as I find that other technologies, such as PowerApps, utilize it to extend functionality. The second reason is to provide user interface for the rewrite of the MyChat desktop application as a web application. The status of this project is that I have completed what I have determined to be the core functionality described below.

## Core functionality
The first step is to replicate the core features of the MyChat project, which include the following:

* Basic chat functionality using OpenAI's chat completion API.
* Support for GPT-4o and GPT-4o Mini models.
* Enable customization of conversations by model, tone (such as professional, casual, technical, etc.), instructions, and notes.
* Provide the option to create conversations using templates, which are predefined combinations of model, tone, instructions, and notes.

## Technologies
In the implementation of this frontend, the following technologies were utilized:

* The frontend is built with the React framework, using Vite as the build tool and development server.
* Google authentication is managed using the @react-oauth/google module.
* Bootstrap and Bootstrap Icons are employed to create the UI and ensure responsive behavior.
* Markdown translation is implemented with the react-markdown and remark-gfm modules.

## Future Plans
I am considering the following enhancements for the future of this backend:

* Add support for GPT o1 models and the upcoming GPT o3 models.
* Add support for models from additional AI agents.
* Incorporate support for image analysis using the vision capabilities of chat completions.
* Integrate support for image generation using DALL-E 3.
* Explore the possibility of incorporating speech capabilities using audio functionalities or the real-time API.

See also...
* [Original MyChat project](https://github.com/Dauvis/MyChat)
* [Sister backend project](https://github.com/Dauvis/BouffonChatBackend)
