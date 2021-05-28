# About Vue Components inside Humany Portals
- You can use Vue by importing it using the script injection features in the admin interface.

### Using custom Vue components in Humany guide templates
- If you need to pass props to the component, be aware that the Humany editor will transform camelCase to lowercase. For example, if your component prop is "isDark", then you need to type the attribute like this:
```
<custom-component is-dark="true"></custom-component>
```