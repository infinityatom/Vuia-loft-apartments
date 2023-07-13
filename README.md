# Vuia-loft-apartments
![Logo](https://vuialoftapartments.ro/logo.svg)

A website for selling apartments\
[Go to the website](https://vuialoftapartments.ro)
## Installation

Install the project with npm

```zsh
gh repo clone infinityatom/Vuia-loft-apartments
cd Vuia-loft-apartments
npm install
```
Start the server localy with Vite for quick reload

```zsh
npm run dev
```

Or simulate a firebase envirement

```zsh
npm run build
firebase emulators:start
```
Then for the deployment to the Firebase servers you need to build the app first and then deploy it

```zsh
npm install
npm run build
firebase deploy
```


## Tech Stack

- **Client:** React, Vite
- **Server:** Firebase (hosting and server functions)

### Frameworks:
- BlurHash ( image processing )
- SendGrid ( emailing )
- Material UI ( components, fonts, icons )
- react spring ( animation )
- react-router-dom
- Radix (nice looking components)

### Other services
- **Domain:** RoTLD
- **CDN provider:** CloudFlare
- **SVG editor / animation:** Figma, Rive

### Helpers
- [Easings](https://easings.net) for curve animation
- [Http codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

> I might want to use this tools but still figuring out \
> This section will be deleted after finishing the project
>- Framer Motion (animation tool kit)
>- Blueprintjs (must use)
>- React Spectrum (adobe hooks)
>- Prime react (complex components)
>- react select (select component)
>- UnDraw (SVG images)
>- rxjs (async / await manipulation)
>- react helmet (metadata)
>- lodash (function, array, object, ... , manipulation)

All backed up on my personal [GiHub repo](https://github.com/infinityatom/Vuia-loft-apartments)


## 🤔💬 About Me
I'm a full stack developer... and that's about it.

For more information about me and my work you can find my github repository here: [![Git](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/infinityatom) or send me an email at infinityatom42@gmail.com

PS: I might use Spline for 3D in my next real estate project