# Panel • [TodoMVC](http://todomvc.com)

> Panel makes [Web Components](https://webcomponents.org/) suitable for constructing full web UIs, not just low-level building blocks. It does so by providing an easy-to-use state management and rendering layer built on Virtual DOM (the basis of the core rendering technology of React). Through use of the Snabbdom Virtual DOM library and first-class support for multiple templating formats, Panel offers simple yet powerful APIs for rendering, animation, styling, and DOM lifecycle.


## Resources

- [Website](https://github.com/mixpanel/panel)
- [Documentation](https://mixpanel.github.io/panel/)
- [Used by](https://mixpanel.com)


## Implementation

The main architectural decisions of this TodoMVC implementation center around how to decompose the UI effectively into a component hierarchy. The approach taken here avoids breaking out components purely for the sake of organization - e.g., the UI header is inlined in the main app component rather than a separate `<todo-header>`, because there's no functional benefit - but instead simply divides the app into the main UI (`<todo-app>`) and the individual items (`<todo-item>`). Individual `<todo-item>`s share a single central state store with the main app, making state updates seamless and easy across the app. As TodoMVC is a pretty simple app with a tiny state structure (list of todos, current view, todo currently being edited), the example doesn't integrate Redux or any other dedicated state management solution; straightforward `update()` calls to change the state object and re-render are sufficient for this case.


## Credit

Created by [Ted Dumitrescu](http://cmme.org/tdumitrescu/who/)
