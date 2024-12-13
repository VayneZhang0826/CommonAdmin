const generateMenuConfig = (routes) => {
    return routes.map((item) => {
        const { path, name, meta = {}, children } = item
        const menuConfig = { key: path, title: meta.title, icon: meta.icon || '' }
        if (item.children) {
            const children = generateMenuConfig(item.children)
            menuConfig.children = children
        }
        return menuConfig
    })
}

export { generateMenuConfig }
